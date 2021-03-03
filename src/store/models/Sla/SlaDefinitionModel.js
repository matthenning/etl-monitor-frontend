import Model from "../Model"
import SlaModel from "./SlaModel";

export default class SlaDefinitionModel extends Model {
    static name = 'SlaDefinition'
    static entity = 'sla_definitions'
    static package = 'sla'
    static menu = false

    static getRelationNames () {
        return [
            'slas'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),
            email: this.attr(null)
        }
    }
}
