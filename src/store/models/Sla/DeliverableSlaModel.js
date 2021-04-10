import SlaModel from "./SlaModel";
import DeliverableSlaDefinitionModel from "@/store/models/Sla/DeliverableSlaDefinitionModel";
import DeliverableSlaStatisticModel from "@/store/models/Sla/DeliverableSlaStatisticModel";
import moment from "moment";

export default class DeliverableSlaModel extends SlaModel {
    static name = 'DeliverableSla'
    static entity = 'deliverable_slas'
    static package = 'sla'
    static menu = false

    static route = {
        title: 'SLA'
    }

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
                end: moment(h.end),
                achieved_at: h.achieved_at ? moment(h.achieved_at) : null,
                achieved_percent: h.achieved_percent,
                error_margin_minutes: h.error_margin_minutes
            }
        })
    }

    get sla_landing () {
        return {
            start: moment(this.range_start),
            end: moment(this.range_end),
            average: this.statistic ? {
                lower: this.statistic.average_lower,
                upper: this.statistic.average_upper
            } : null,
            achieved_at: this.achieved_at ? moment(this.achieved_at) : null,
            error_margin_minutes: this.error_margin_minutes
        }
    }
}
