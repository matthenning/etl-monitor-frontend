import SlaStatisticModel from "@/store/models/Sla/SlaStatisticModel";

export default class DeliverableSlaStatisticModel extends SlaStatisticModel {
    static name = 'DeliverableSlaStatistic'
    static entity = 'deliverable_sla_statistics'
    static package = 'sla'
    static menu = false

    static fields () {
        return {
            ...super.fields(),
            sla_id: this.attr(null),

            average_duration_minutes_lower: this.attr(null),
            average_duration_minutes_upper: this.attr(null),
            achievement_history: this.attr([])
        }
    }
}
