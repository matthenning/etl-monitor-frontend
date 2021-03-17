import SlaModel from "./SlaModel";
import AvailabilitySlaDefinitionModel from "@/store/models/Sla/AvailabilitySlaDefinitionModel";
import AvailabilitySlaStatisticModel from "@/store/models/Sla/AvailabilitySlaStatisticModel";
import Link from "@/util/Link";
import moment from "moment";

export default class AvailabilitySlaModel extends SlaModel {
    static name = 'AvailabilitySla'
    static entity = 'availability_slas'
    static package = 'sla'
    static menu = false

    static fields () {
        return {
            ...super.fields(),

            definition: this.belongsTo(AvailabilitySlaDefinitionModel, 'sla_definition_id'),
            statistic: this.hasOne(AvailabilitySlaStatisticModel, 'sla_id')
        }
    }

    get sla_history () {
        return this.statistic?.achievement_history.map((h) => {
            return {
                sla_id: h.sla_id,
                day: moment(h.day),
                status: h.status,
                target_percent: h.target_percent,
                achieved_percent: h.achieved_percent
            }
        })
    }

    get sla_landing () {
        return {
            start: moment(this.range_start),
            end: moment(this.range_end),
            progress: this.statistic?.progress_history,
            target_percent: this.target_percent
        }
    }
}
