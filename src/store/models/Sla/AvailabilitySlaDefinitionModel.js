import SlaDefinitionModel from "./SlaDefinitionModel";
import AvailabilitySlaModel from "@/store/models/Sla/AvailabilitySlaModel";

export default class AvailabilitySlaDefinitionModel extends SlaDefinitionModel {
    static name = 'AvailabilitySlaDefinition'
    static entity = 'availability_sla_definitions'
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

            slas: this.hasMany(AvailabilitySlaModel, 'definition_id'),
        }
    }
}
