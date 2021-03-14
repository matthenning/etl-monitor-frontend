import Model from "@/store/models/Model";

export default class SlaDefinitionLifecycleModel extends Model {
    static name = 'SlaDefinitionLifecycle'
    static entity = 'slas_definition_lifecycles'
    static package = 'sla'
    static menu = false

    static getRelationNames () {
        return [
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(null)
        }
    }
}
