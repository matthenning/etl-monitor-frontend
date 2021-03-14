<template>

    <v-container fluid>
        <v-data-table v-if="objects"
                      class="sla-dashboard-data-table"
                      :loading="loading"
                      loading-text="Loading..."
                      :headers="headers"
                      :items="Object.keys(objects)"
                      :items-per-page.sync="pagination.per_page"
                      :footer-props="{itemsPerPageOptions:[5, 10, 20, 50, 100]}">
            <template v-slot:header.week="{ item }">
                <span class="body-2">Week</span>
            </template>
            <template v-slot:header.monday="{ item }">
                <span class="body-2">Monday</span>
            </template>
            <template v-slot:header.tuesday="{ item }">
                <span class="body-2">Tuesday</span>
            </template>
            <template v-slot:header.wednesday="{ item }">
                <span class="body-2">Wednesday</span>
            </template>
            <template v-slot:header.thursday="{ item }">
                <span class="body-2">Thursday</span>
            </template>
            <template v-slot:header.friday="{ item }">
                <span class="body-2">Friday</span>
            </template>
            <template v-slot:header.saturday="{ item }">
                <span class="body-2">Saturday</span>
            </template>
            <template v-slot:header.sunday="{ item }">
                <span class="body-2">Sunday</span>
            </template>
            <template v-slot:header.responsible="{ item }">
                <span class="body-2">Responsible</span>
            </template>
            <template v-slot:header.actions="{ item }">
                <span class="body-2">Actions</span>
            </template>

            <template v-slot:item.week="{ item }">
                {{ item }}
            </template>

            <template v-slot:item.monday="{ item }">
                <achievement-pie v-if="objects[item][1]" :sla="getAchievementPieObject(objects[item][1])"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(objects[item], 1)"></timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(objects[item], 1)">E</timerange-weekly-exists>
            </template>
            <template v-slot:item.tuesday="{ item }">
                <achievement-pie v-if="objects[item][2]" :sla="getAchievementPieObject(objects[item][2])"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(objects[item], 2)">S</timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(objects[item], 2)">E</timerange-weekly-exists>
            </template>
            <template v-slot:item.wednesday="{ item }">
                <achievement-pie v-if="objects[item][3]" :sla="getAchievementPieObject(objects[item][3])"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(objects[item], 3)">S</timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(objects[item], 3)">E</timerange-weekly-exists>
            </template>
            <template v-slot:item.thursday="{ item }">
                <achievement-pie v-if="objects[item][4]" :sla="getAchievementPieObject(objects[item][4])"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(objects[item], 4)">S</timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(objects[item], 4)">E</timerange-weekly-exists>
            </template>
            <template v-slot:item.friday="{ item }">
                <achievement-pie v-if="objects[item][5]" :sla="getAchievementPieObject(objects[item][5])"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(objects[item], 5)">S</timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(objects[item], 5)">E</timerange-weekly-exists>
            </template>
            <template v-slot:item.saturday="{ item }">
                <achievement-pie v-if="objects[item][6]" :sla="getAchievementPieObject(objects[item][6])"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(objects[item], 6)">S</timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(objects[item], 6)">E</timerange-weekly-exists>
            </template>
            <template v-slot:item.sunday="{ item }">
                <achievement-pie v-if="objects[item][7]" :sla="getAchievementPieObject(objects[item][7])"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(objects[item], 7)">S</timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(objects[item], 7)">E</timerange-weekly-exists>
            </template>

            <template v-slot:item.responsible="{ item }">
                <span class="font-weight-bold">John Doe</span>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn class="ma-2" icon elevation="0">
                    <v-icon>mdi-bell-ring-outline</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-container>

</template>

<script>
import moment from "moment";
import DeliverableSlaModel from "@/store/models/Sla/DeliverableSlaModel";
import TimerangeWeeklyExists from "@/svg/TimerangeWeeklyExists";
import TimerangeWeeklyStart from "@/svg/TimerangeWeeklyStart";
import AchievementPie from "@/svg/AchievementPie";
import AvailabilitySlaSummarySvg from "@/svg/AvailabilitySlaSummarySvg";
import DeliverableSlaHistorySvg from "@/svg/DeliverableSlaHistorySvg";
import DeliverableSlaSummarySvg from "@/svg/DeliverableSlaSummarySvg";
import AvailabilitySlaHistorySvg from "@/svg/AvailabilitySlaHistorySvg";
import PaginatedComponent from "@/components/PaginatedComponent";
import ModelFactory from "@/store/models/ModelFactory";
import SlaModel from "@/store/models/Sla/SlaModel";

export default {

    extends: PaginatedComponent,

    components: {
        TimerangeWeeklyExists,
        TimerangeWeeklyStart,
        AchievementPie,
        AvailabilitySlaSummarySvg,
        DeliverableSlaHistorySvg,
        DeliverableSlaSummarySvg,
        AvailabilitySlaHistorySvg
    },

    props: {
        definitionId: Number
    },

    data () {
        return {
            pagination: {
                current_page: 1,
                last_page: null,
                per_page: 100,
                items: 0,
                total_items: null,
                current_page_item_ids: [],
                sort_by: null,
                sort_direction: 'asc',
                filter: {}
            },
            model: SlaModel,
            models: [ DeliverableSlaModel ],
            relations: [],
            endpoint: 'inRange',
            endpoint_params: [],
            headers: [
                {
                    text: 'Week',
                    align: 'start',
                    sortable: true,
                    value: 'week'
                },
                {
                    text: 'Monday',
                    align: 'center',
                    cellClass: 'pr-0',
                    sortable: false,
                    value: 'monday',
                    width: 120
                },
                {
                    text: 'Tuesday',
                    align: 'center',
                    cellClass: 'pr-0',
                    sortable: false,
                    value: 'tuesday',
                    width: 120
                },
                {
                    text: 'Wednesday',
                    align: 'center',
                    cellClass: 'pr-0',
                    sortable: false,
                    value: 'wednesday',
                    width: 120
                },
                {
                    text: 'Thursday',
                    align: 'center',
                    cellClass: 'pr-0',
                    sortable: false,
                    value: 'thursday',
                    width: 120
                },
                {
                    text: 'Friday',
                    align: 'center',
                    cellClass: 'pr-0',
                    sortable: false,
                    value: 'friday',
                    width: 120
                },
                {
                    text: 'Saturday',
                    align: 'center',
                    cellClass: 'pr-0',
                    sortable: false,
                    value: 'saturday',
                    width: 120
                },
                {
                    text: 'Sunday',
                    align: 'center',
                    sortable: false,
                    value: 'sunday',
                    width: 120
                },
                {
                    text: 'Responsible',
                    sortable: true,
                    value: 'responsible'
                },
                {
                    text: 'Actions',
                    sortable: false,
                    value: 'actions',
                    width: 50
                }
            ]
        }
    },

    computed: {
        objects () {
            if (this.loading) return []
            if (!this.ready_to_load) return null
            let results = {}
            this.models.forEach((m) => {
                m.query().whereIdIn(this.pagination.current_page_item_ids).get().forEach((o) => {
                    let year_week = moment(o.range_end).isoWeekYear() + '/' + moment(o.range_end).isoWeek() +
                        ' - ' + moment(o.range_end).startOf('isoWeek').format('YYYY-MM-DD')

                    if (!results[year_week]) {
                        results[year_week] = {
                            meta: {}
                        }
                        results[year_week].meta.weekStart = moment(o.range_end).startOf('isoWeek')
                    }

                    results[year_week][moment(o.range_end).isoWeekday()] = o
                })
            })

            return results
        },
        completed () {
            return Math.round(Math.random() * 100)
        },
        success () {
            return Math.round(Math.random() * 100)
        },
        rangeStart () {
            return moment(this.$parent.$refs.selector.selectedDates[0]).startOf('isoWeek').format()
        },
        rangeEnd () {
            return moment(this.$parent.$refs.selector.selectedDates[1]).endOf('isoWeek').format()
        }
    },

    watch: {
        rangeStart () {
            this.updateEndpointParams()
        },
        rangeEnd () {
            this.updateEndpointParams()
        }
    },

    methods: {
        updateEndpointParams () {
            this.endpoint_params = [
                this.rangeStart,
                this.rangeEnd
            ]
        },
        getTime (ts) {
            return moment(ts).format('HH:mm')
        },
        diffInDays (ts) {
            return moment(ts).diff(moment(), 'day')
        },
        getAchievementPieObject (sla) {
            return {
                status: sla.status,
                start: sla.range_start,
                target: sla.target_percent,
                achieved_progress_percent: sla.achieved_progress_percent,
                achieved_at: sla.achieved_at
            }
        },
        weeklyStartsOnDay (week, dayOfWeek) {
            let sla_k = Object.keys(week).filter((k) => k !== 'meta')[0],
                sla = week[sla_k]
            if (sla.timerange_type !== 'weekly') return
            let day = moment(week.meta.weekStart).add(dayOfWeek - 1, 'day')
            return moment(sla.range_start).isSame(day, 'day')
        },
        weeklyExistsOnDay (week, dayOfWeek) {
            let sla_k = Object.keys(week).filter((k) => k !== 'meta')[0],
                sla = week[sla_k]
            if (sla.timerange_type !== 'weekly') return
            let day = moment(week.meta.weekStart).add(dayOfWeek - 1, 'day')
            return day.isBetween(moment(sla.range_start).startOf('day'), moment(sla.range_end).endOf('day'))
        }
    },

    created () {
        this.pagination.filter = {
            sla_definition_id: this.definitionId
        }
        this.updateEndpointParams()
    },

}
</script>