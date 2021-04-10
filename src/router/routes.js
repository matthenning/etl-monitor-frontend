import config from "../config";
import models from "../store/models"


let route = (model, path, name, title, icon, menu, component, breadcrumbs = []) => {
    if (!Array.isArray(breadcrumbs)) breadcrumbs = [breadcrumbs]
    return {
        model: model,
        path: '/' + config.web.prefix + path,
        name: name,
        icon: icon,
        menu: menu,
        component: component,
        meta: {
            breadcrumbs: breadcrumbs,
            title: title
        }
    }
}

let routes = [
    route(null, '/', 'home', 'Home', 'mdi-monitor-dashboard', true, () => import('../views/Home')),
    route(null, 'login', 'login', 'Login', 'mdi-help', false, () => import('../views/Login')),
    route(null, 'etl/dashboard', 'etl_dashboard', 'ETL Dashboard', 'mdi-chart-gantt', true, () => import('../views/etl/Dashboard')),
    route(null, 'sla/dashboard/feed', 'sla_dashboard', 'SLA Dashboard', 'mdi-timetable', false, () => import('../views/index/dashboards/FeedSlaDashboard')),
    route(null, 'sla/dashboard/daily', 'sla_dashboard', 'SLA Dashboard', 'mdi-timetable', true, () => import('../views/index/dashboards/DailySlaDashboard')),
    route(null, 'sla/dashboard/weekly', 'sla_dashboard', 'SLA Dashboard', 'mdi-timetable', false, () => import('../views/index/dashboards/WeeklySlaDashboard'))
]

Object.keys(models).forEach((k) => {
    let m = models[k]
    routes.push(
        route(
            m,
            m.package + '/' + m.entity,
            'index_' + m.entity,
            m.route.title,
            m.icon,
            m.menu,
            () => import('../views/index/' + m.name)
        )
    )

    routes.push(
        route(
            m,
            m.package + '/' + m.entity + '/create',
            'create_' + m.entity,
            m.route.title,
            m.icon,
            false,
            () => import('../views/create/' + m.name),
            'index_' + m.entity
        )
    )

    routes.push(
        route(
            m,
            m.package + '/' + m.entity + '/:id',
            'show_' + m.entity,
            null,
            m.icon,
            false,
            () => import('../views/show/' + m.name),
            'index_' + m.entity
        )
    )

    routes.push(
        route(
            m,
            m.package + '/' + m.entity + '/:id/edit',
            'edit_' + m.entity,
            null,
            m.icon,
            false,
            () => import('../views/edit/' + m.name),
            ['index_' + m.entity, 'show_' + m.entity ]
        )
    )

    routes.push(
        route(
            m,
            m.package + '/' + m.entity + '/:id/delete',
            'delete_' + m.entity,
            null,
            m.icon,
            false,
            () => import('../views/delete/' + m.name),
            ['index_' + m.entity, 'show_' + m.entity ]
        )
    )
})

export default routes
