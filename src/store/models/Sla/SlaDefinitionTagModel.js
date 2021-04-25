import Model from "../Model"

export default class SlaDefinitionTagModel extends Model {
    static name = 'SlaDefinitionTag'
    static entity = 'sla_definition_tags'
    static package = 'sla'
    static menu = false

    static getRelationNames () {
        return [
            'sla_definition'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(null),
            hide_name: this.attr(false),
            icon: this.attr(null),
            color: this.attr(null)
        }
    }
}
