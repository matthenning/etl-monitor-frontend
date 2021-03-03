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
            name: this.attr('')
        }
    }
}
