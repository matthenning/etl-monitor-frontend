import Model from "../Model"
import EtlDefinitionStatisticModel from "@/store/models/Etl/EtlDefinitionStatisticModel";

export default class EtlDefinitionModel extends Model {
    static name = 'EtlDefinition'
    static entity = 'etl_definitions'
    static package = 'etl'
    static menu = false

    static getRelationNames () {
        return [
            'statistic'
        ]
    }

    static childModelNames = [ 'AutomicEtlDefinitionModel' ]

    static fields () {
        return {
            ...super.fields(),
            etl_definition_id: this.attr(null),
            type: this.attr(null),
            etl_id: this.attr(null),
            name: this.attr(null),

            statistic: this.hasOne(EtlDefinitionStatisticModel, 'etl_definition_id')
        }
    }
}