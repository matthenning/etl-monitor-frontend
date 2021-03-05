import Model from "../Model"
import UserSettingModel from "./UserSettingModel"
import PermissionModel from "./PermissionModel"

export default class SlaStatisticModel extends Model {
    static name = 'SlaStatistic'
    static entity = 'sla_statistics'
    static package = 'sla'
    static menu = false

    static fields () {
        return {
            ...super.fields(),
            sla_id: this.attr(null),
            type: this.attr(null),

            average_duration_minutes_lower: this.attr(null),
            average_duration_minutes_upper: this.attr(null),
            achievement_history: this.attr([])
        }
    }
}
