import Model from "@/store/models/Model";

export default class EtlDefinitionDependsonPivotModel extends Model {

    static name = 'EtlDefinitionDependsonPivot'
    static entity = 'etl_definition_dependson_pivot'
    static package = 'etl'
    static menu = false

    static fields () {
        return {
            id: this.attr(null),
            etl_definition_id: this.attr(null),
            dependson_etl_definition_id: this.attr(null)
        }
    }
}
