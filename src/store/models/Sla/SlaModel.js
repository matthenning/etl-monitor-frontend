import Model from "../Model"
import UserSettingModel from "./UserSettingModel"
import PermissionModel from "./PermissionModel"

export default class SlaModel extends Model {
    static name = 'Sla'
    static entity = 'slas'
    static package = 'sla'
    static menu = false

    static getRelationNames () {
        return [
            'definition', 'progress'
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

    static fields () {
        return {
            ...super.fields(),
            sla_definition_id: this.attr(null),
            type: this.attr(null),
            range_start: this.attr(null),
            range_end: this.attr(null),
            achieved_at: this.attr(null),
            error_margin_minutes: this.attr(null),
            statistics_average_duration_minutes_lower: this.attr(null),
            statistics_average_duration_minutes_upper: this.attr(null),
            is_open: this.attr(null),
            status: this.attr(null),
            target_percent: this.attr(null),
            achieved_progress_percent: this.attr(null),
            last_progress_percent: this.attr(null),
            progress_last_intime_id: this.attr(null),
            progress_first_intime_achieved_id: this.attr(null),
            progress_last_late_id: this.attr(null),
            progress_first_late_achieved_id: this.attr(null),
        }
    }
}
