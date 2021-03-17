import Model from "../Model"
import AutomicEtlExecutionModel from "@/store/models/Etl/AutomicEtlExecutionModel";

export default class EtlExecutionModel extends Model {
    static name = 'EtlExecution'
    static entity = 'etl_excutions'
    static package = 'etl'
    static menu = false

    static apiConfig = {
        actions: {
            ...Model.apiConfig.actions,
            inRange: {
                method: 'get',
                url: Model.baseUrl,
                postfix: 'in_range'
            }
        }
    }

    static getRelationNames () {
        return [
            'definition'
        ]
    }

    static childModelNames = [ 'AutomicEtlExecutionModel' ]

    static fields () {
        return {
            ...super.fields(),
            etl_definition_id: this.attr(null),
            etl_id: this.attr(null),
            predecessor_id: this.attr(null),
            date_activation: this.attr(null),
            date_start: this.attr(null),
            date_end: this.attr(null),
            date_end_pp: this.attr(null),
            status: this.attr(null),
            status_text: this.attr(null)
        }
    }
}
