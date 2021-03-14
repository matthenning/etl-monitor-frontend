import DeliverableSlaModel from "./DeliverableSlaModel";
import SlaDefinitionModel from "./SlaDefinitionModel";

export default class DeliverableSlaDefinitionModel extends SlaDefinitionModel {
    static name = 'DeliverableSlaDefinition'
    static entity = 'deliverable_sla_definitions'
    static package = 'sla'
    static menu = false

    static getRelationNames () {
        return [
            'slas'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(null),

            slas: this.hasMany(DeliverableSlaModel, 'definition_id'),
        }
    }
}
