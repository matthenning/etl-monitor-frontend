import Model from "../Model"
import SlaAchievementConditionModel from "@/store/models/Sla/SlaAchievementConditionModel";
import DailyTimerangeModel from "@/store/models/Sla/DailyTimerangeModel";
import WeeklyTimerangeModel from "@/store/models/Sla/WeeklyTimerangeModel";

export default class SlaModel extends Model {
    static name = 'Sla'
    static entity = 'slas'
    static package = 'sla'
    static menu = false

    static getRelationNames () {
        return [
            'definition', 'progress', 'statistic', 'achievement_conditions'
        ]
    }

    static apiConfig = {
        actions: {
            ...Model.apiConfig.actions,
            inRange: {
                method: 'get',
                url: Model.baseUrl,
                postfix: 'in_range'
            }
        }
    }

    static childModelNames = [ 'DeliverableSlaModel', 'AvailabilitySlaModel' ]

    static fields () {
        return {
            ...super.fields(),
            sla_definition_id: this.attr(null),
            timerange_id: this.attr(null),
            type: this.attr(null),
            timerange_type: this.attr(null),
            range_start: this.attr(null),
            range_end: this.attr(null),
            error_margin_minutes: this.attr(null),
            is_open: this.attr(null),
            status: this.attr(null),
            target_percent: this.attr(null),
            achieved_progress_percent: this.attr(null),
            last_progress_percent: this.attr(null),
            progress_last_intime_id: this.attr(null),
            progress_first_intime_achieved_id: this.attr(null),
            progress_last_late_id: this.attr(null),
            progress_first_late_achieved_id: this.attr(null),
            rules: this.attr(null),

            achievement_conditions: this.hasMany(SlaAchievementConditionModel, 'sla_id')
        }
    }
}
