import Model from "@/store/models/Model";

export default class SlaDefinitionTagPivotModel extends Model {

    static name = 'SlaDefinitionTagPivot'
    static entity = 'sla_definition_tag_pivot'
    static package = 'sla'
    static menu = false

    static fields () {
        return {
            id: this.attr(null),
            sla_definition_id: this.attr(null),
            tag_id: this.attr(null)
        }
    }
}
