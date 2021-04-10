import axios from "axios"
import JSONBigInt from "json-bigint"
import models from "../models"
import config from "../../config";

export default class ModelFactory {

    static getRelationUrlArtifact (model, relations = null) {
        let url = ''

        if (relations) {
            relations.forEach((r) => url += '&with[]=' + r)
        } else {
            model.getRelationNames().forEach((relation) => {
                url += '&with[]=' + relation
            })
        }

        return url
    }

    static getFilterUrlArtifact (filter) {
        let url = ''
        Object.keys(filter).forEach((key) => {
            url += '&filter[' + key + ']='
            if (typeof filter[key] === 'object') {
                if (filter[key].comp) url += filter[key].comp + ':'
                else if (!filter[key].exact) url += 'like:*'
                url += filter[key].value
                if (!filter[key].exact) url += '*'
            } else {
                url += filter[key]
            }
        })

        return url
    }

    static getWhereInUrlArtifact (field, ids) {
        let filter = '&all&filter[' + field + ']=in:';
        if (!Array.isArray(ids)) ids = [ids]
        filter += ids.join(',')

        return filter
    }

    static getOrderUrlArtifact (sort_by, sort_direction) {
        if (!Array.isArray(sort_by)) sort_by = [ sort_by ]
        if (!Array.isArray(sort_direction)) sort_direction = [ sort_direction ]

        let str = ''
        for (let i = 0; i < sort_by.length; i++) {
            str += '&order[' + sort_by[i] + ']=' + (sort_direction[i] ? sort_direction[i] : 'asc')
        }

        return str
    }

    static getDebugUrlArtifact () {
        if (config.api.xDebug) return '&XDEBUG_SESSION_START=PHPSTORM'
        return ''
    }

    static getFetchUrl (model, id, relations = [], endpoint = 'fetch', endpoint_params = []) {
        let epp = endpoint_params.slice(0)
        epp.unshift(id)
        return model.endpoint(endpoint, epp) + '?relations=separate'
            + this.getDebugUrlArtifact()
            + this.getRelationUrlArtifact(model, relations)
    }

    static getFetchMultipleUrl (model, ids, relations = [], endpoint = 'fetch', endpoint_params = []) {
        return model.endpoint(endpoint, endpoint_params) + '?relations=separate'
            + this.getWhereInUrlArtifact(model.id_field, ids)
            + this.getDebugUrlArtifact()
            + this.getRelationUrlArtifact(model, relations)
    }

    static getPaginatedFetchUrl (model, pagination, relations = null, endpoint = 'fetch', endpoint_params = []) {
        let url = model.endpoint(endpoint, endpoint_params) + '?relations=separate'
            + this.getDebugUrlArtifact()

        if (pagination.paginate) {
            url += '&page=' + pagination.current_page + '&per_page=' + pagination.per_page
        } else {
            url += '&all'
        }

        if (pagination.filter) url += this.getFilterUrlArtifact(pagination.filter)
        if (pagination.sort_by) url += this.getOrderUrlArtifact(pagination.sort_by, pagination.sort_direction)
        url += this.getRelationUrlArtifact(model, relations)

        return url
    }

    static fetchIfNecessary (model, id, callback = null, error_callback = null, endpoint = 'fetch', endpoint_params = []) {
        if (model.find(id) == null) {
            this.fetch(model, id, callback, error_callback)
        }
    }

    static fetch (model, id, callback = null, error_callback = null, relations = [], endpoint = 'fetch', endpoint_params = []) {
        axios.get(this.getFetchUrl(model, id, relations, endpoint, endpoint_params), {
            transformResponse: [data => data]
        }).then((response) => {
            this.ingestApiResponse(JSONBigInt.parse(response.data), model, callback)
        }, (error) => {
            if (error_callback) error_callback(error)
            window.console.log(error)
        })
    }

    static fetchMultiple (model, ids, callback = null, error_callback = null, relations = [], endpoint = 'fetch', endpoint_params = []) {
        axios.get(this.getFetchMultipleUrl(model, ids, relations, endpoint, endpoint_params), {
            transformResponse: [data => data]
        }).then((response) => {
            this.ingestApiResponse(JSONBigInt.parse(response.data), model, callback)
        }, (error) => {
            if (error_callback) error_callback(error)
            window.console.log(error)
        })
    }

    static fetchWithPagination (model, pagination, callback = null, error_callback = null, relations = [], endpoint = 'fetch', endpoint_params = []) {
        axios.get(this.getPaginatedFetchUrl(model, pagination, relations, endpoint, endpoint_params), {
                transformResponse: [data => data]
            }).then((response) => {
                this.ingestApiResponse(JSONBigInt.parse(response.data), model, callback)
            }, (error) => {
                if (error_callback) error_callback(error)
                window.console.log(error)
            })
    }

    static ingestApiResponse (response, requested_model, callback = null) {
        let ids = [], model_name = ''
        response.data.forEach((model) => {
            model_name = model._model + 'Model'
            models[model_name].insert({ data: [model] })
            models[model_name].announce(model.id)
            let isChildModel = requested_model.childModelNames?.indexOf(model_name) !== -1
            if (model._model === requested_model.name || isChildModel) {
                ids.push(model.id)
                models[model_name].enableListener(model.id)
            }
        })

        if (callback) callback(response, ids)
    }

    static refresh (model, id, relations, recursive = false) {
        if (model.find(id) == null) return

        model.fetchById(id)

        if (relations != null && recursive) {
            let m = model.find(id)
            if (m != null) {
                if (!Array.isArray(relations)) relations = [relations]

                let query = model.query()
                relations.forEach((r) => {
                    query = query.with(r)
                })
                let object = query.find(id)

                relations.forEach((r) => {
                    if (object[r] != null) {
                        if (Array.isArray(object[r])) {
                            object[r].forEach((ro) => {
                                this.refresh(models[ro._model + 'Model'], ro.id)
                            })
                        }
                        else {
                            this.refresh(models[object[r]._model + 'Model'], object[r].id)
                        }
                    }
                })
            }
        }
    }

    static refreshFromListener (model, id) {
        if (model.find(id) && model.find(id)._listen) {
            this.refresh(model, id)
        }
    }


    static disableAllListeners() {
        Object.keys(models).forEach((name) => {
            models[name].query().where('_listen', true).get().forEach((model) => {
                models[name].disableListener(model.id)
            })
        })
    }

}
