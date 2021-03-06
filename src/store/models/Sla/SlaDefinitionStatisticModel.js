import Model from "../Model"
import UserSettingModel from "./UserSettingModel"
import PermissionModel from "./PermissionModel"

export default class SlaDefinitionStatisticModel extends Model {
    static name = 'SlaDefinitionStatistic'
    static entity = 'sla_definition_statistics'
    static package = 'sla'
    static menu = false

    static fields () {
        return {
            ...super.fields(),
            sla_definition_id: this.attr(null),
            type: this.attr(null),

            achievement_history: this.attr([])
        }
    }
}
