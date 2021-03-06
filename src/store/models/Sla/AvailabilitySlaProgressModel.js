import SlaProgressModel from "@/store/models/Sla/SlaProgressModel";
import AvailabilitySlaModel from "@/store/models/Sla/AvailabilitySlaModel";

export default class AvailabilitySlaProgressModel extends SlaProgressModel {
    static name = 'AvailabilitySlaProgress'
    static entity = 'availability_sla_progress'
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

            sla: this.belongsTo(AvailabilitySlaModel, 'sla_id'),
        }
    }
}
