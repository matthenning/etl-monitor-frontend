import Model from "@/store/models/Model";

export default class EtlDefinitionDependsonPivotModel extends Model {

    static name = 'EtlDefinitionDependsonPivot'
    static entity = 'etl_definition_dependson_pivot'
    static package = 'etl'
    static menu = false

    static primaryKey = [ 'etl_definition_id', 'dependson_etl_definition_id' ]

    static fields () {
        return {
            etl_definition_id: this.attr(null),
            dependson_etl_definition_id: this.attr(null)
        }
    }
}
