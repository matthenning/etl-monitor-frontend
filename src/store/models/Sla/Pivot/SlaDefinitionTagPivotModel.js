import Model from "@/store/models/Model";

export default class SlaDefinitionTagPivotModel extends Model {

    static name = 'SlaDefinitionTagsPivot'
    static entity = 'sla_definition_tags_pivot'
    static package = 'etl'
    static menu = false

    static primaryKey = [ 'sla_definition_id', 'tag_id' ]

    static fields () {
        return {
            sla_definition_id: this.attr(null),
            tag_id: this.attr(null)
        }
    }
}
