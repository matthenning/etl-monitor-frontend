import Model from "../Model"
import SlaDefinitionStatusModel from "@/store/models/Sla/SlaDefinitionStatusModel"
import DeliverableSlaModel from "@/store/models/Sla/DeliverableSlaModel";
import SlaDefinitionStatisticModel from "@/store/models/Sla/SlaDefinitionStatisticModel";

export default class SlaDefinitionModel extends Model {
    static name = 'SlaDefinition'
    static entity = 'sla_definitions'
    static package = 'sla'
    static menu = false

    static getRelationNames () {
        return [
            'slas', 'status'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            status_id: this.attr(null),
            name: this.attr(''),
            email: this.attr(null),

            status: this.belongsTo(SlaDefinitionStatusModel, 'status_id'),
            slas: this.hasMany(DeliverableSlaModel, 'definition_id'),

            statistic: this.hasOne(SlaDefinitionStatisticModel, 'sla_definition_id')
        }
    }
}
