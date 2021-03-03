import SlaModel from "./SlaModel";
import DeliverableSlaDefinitionModel from "@/store/models/Sla/DeliverableSlaDefinitionModel";

export default class DeliverableSlaModel extends SlaModel {
    static name = 'DeliverableSla'
    static entity = 'deliverable_slas'
    static package = 'sla'
    static menu = false

    static getRelationNames () {
        return [
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            sla_definition_id: this.attr(null),
            type: this.attr(null),
            range_start: this.attr(null),
            range_end: this.attr(null),
            is_open: this.attr(null),
            status: this.attr(null),
            target_percent: this.attr(null),
            achieved_progress_percent: this.attr(null),
            last_progress_percent: this.attr(null),
            progress_last_intime_id: this.attr(null),
            progress_first_intime_achieved_id: this.attr(null),
            progress_last_late_id: this.attr(null),
            progress_first_late_achieved_id: this.attr(null),

            definition: this.belongsTo(DeliverableSlaDefinitionModel, 'sla_definition_id'),
        }
    }
}
