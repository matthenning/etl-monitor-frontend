import Model from "../Model"
import SlaDefinitionLifecycleModel from "@/store/models/Sla/SlaDefinitionLifecycleModel"
import DeliverableSlaModel from "@/store/models/Sla/DeliverableSlaModel";
import SlaDefinitionStatisticModel from "@/store/models/Sla/SlaDefinitionStatisticModel";

export default class SlaDefinitionModel extends Model {
    static name = 'SlaDefinition'
    static entity = 'sla_definitions'
    static package = 'sla'
    static menu = false

    static getRelationNames () {
        return [
            'slas', 'lifecycle'
        ]
    }

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

    static fields () {
        return {
            ...super.fields(),
            lifecycle_id: this.attr(null),
            name: this.attr(''),
            email: this.attr(null),
            target_percent: this.attr(null),

            lifecycle: this.belongsTo(SlaDefinitionLifecycleModel, 'lifecycle_id'),
            statistic: this.hasOne(SlaDefinitionStatisticModel, 'sla_definition_id')
        }
    }
}
