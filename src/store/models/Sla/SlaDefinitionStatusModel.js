import SlaModel from "./SlaModel";
import DeliverableSlaDefinitionModel from "@/store/models/Sla/DeliverableSlaDefinitionModel";

export default class SlaDefinitionStatusModel extends SlaModel {
    static name = 'SlaDefinitionStatus'
    static entity = 'slas_definition_stati'
    static package = 'sla'
    static menu = false

    static getRelationNames () {
        return [
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(null)
        }
    }
}
