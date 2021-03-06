import SlaStatisticModel from "@/store/models/Sla/SlaStatisticModel";

export default class AvailabilitySlaStatisticModel extends SlaStatisticModel {
    static name = 'AvailabilitySlaStatistic'
    static entity = 'availability_sla_statistics'
    static package = 'sla'
    static menu = false

    static fields () {
        return {
            ...super.fields(),
            sla_id: this.attr(null),

            progress_history: this.attr([])
        }
    }
}
