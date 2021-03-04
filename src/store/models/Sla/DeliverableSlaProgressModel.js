import DeliverableSlaModel from "@/store/models/Sla/DeliverableSlaModel";
import SlaProgressModel from "@/store/models/Sla/SlaProgressModel";

export default class DeliverableSlaProgressModel extends SlaProgressModel {
    static name = 'DeliverableSlaProgress'
    static entity = 'deliverable_sla_progress'
    static package = 'sla'
    static menu = false

    static getRelationNames () {
        return [
            'sla'
        ]
    }

    static fields () {
        return {
            ...super.fields(),

            sla: this.belongsTo(DeliverableSlaModel, 'sla_id'),
        }
    }
}
