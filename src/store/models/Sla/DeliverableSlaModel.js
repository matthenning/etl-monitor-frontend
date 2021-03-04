import SlaModel from "./SlaModel";
import DeliverableSlaDefinitionModel from "@/store/models/Sla/DeliverableSlaDefinitionModel";

export default class DeliverableSlaModel extends SlaModel {
    static name = 'DeliverableSla'
    static entity = 'deliverable_slas'
    static package = 'sla'
    static menu = false

    static fields () {
        return {
            ...super.fields(),

            definition: this.belongsTo(DeliverableSlaDefinitionModel, 'sla_definition_id')
        }
    }
}
