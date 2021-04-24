import Model from "../Model"
import SlaDefinitionTagPivotModel from "@/store/models/Sla/Pivot/SlaDefinitionTagPivotModel";
import SlaDefinitionModel from "@/store/models/Sla/SlaDefinitionModel";

export default class SlaDefinitionTagModel extends Model {
    static name = 'SlaDefinitionTag'
    static entity = 'sla_definition_tags'
    static package = 'sla'
    static menu = false

    static getRelationNames () {
        return [
            'definition'
        ]
    }

    static fields () {
        return {
            name: this.attr(null),
            hide_name: this.attr(false),
            icon: this.attr(null),
            color: this.attr(null),

            definition: this.belongsToMany(SlaDefinitionModel, SlaDefinitionTagPivotModel, 'tag_id', 'sla_definition_id')
        }
    }
}
