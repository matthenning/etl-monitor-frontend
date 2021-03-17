import SlaModel from "./SlaModel";
import DeliverableSlaDefinitionModel from "@/store/models/Sla/DeliverableSlaDefinitionModel";
import DeliverableSlaStatisticModel from "@/store/models/Sla/DeliverableSlaStatisticModel";
import moment from "moment";

export default class DeliverableSlaModel extends SlaModel {
    static name = 'DeliverableSla'
    static entity = 'deliverable_slas'
    static package = 'sla'
    static menu = false

    static fields () {
        return {
            ...super.fields(),
            achieved_at: this.attr(null),

            definition: this.belongsTo(DeliverableSlaDefinitionModel, 'sla_definition_id'),
            statistic: this.hasOne(DeliverableSlaStatisticModel, 'sla_id')
        }
    }

    get sla_history () {
        return this.statistic?.achievement_history.map((h) => {
            return {
                sla_id: h.sla_id,
                status: h.status,
                start: moment(h.start),
                target: moment(h.end),
                achieved_at: moment(h.achieved_at),
                achieved: h.achieved_percent,
                error_margin_minutes: h.error_margin_minutes
            }
        })
    }

    get sla_landing () {
        return {
            start: moment(this.range_start),
            target: moment(this.range_end),
            average: this.statistic ? {
                lower: this.statistic.average_lower,
                upper: this.statistic.average_upper
            } : null,
            achieved: this.achieved_at ? moment(this.achieved_at) : null,
            error_margin_minutes: this.error_margin_minutes
        }
    }
}
