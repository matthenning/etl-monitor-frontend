import Model from "@/store/models/Model";

export default class EtlDefinitionAffectedSlaPivotModel extends Model {

    static name = 'EtlDefinitionAffectedSlaPivot'
    static entity = 'etl_definition_affected_sla_pivot'
    static package = 'etl'
    static menu = false

    static fields () {
        return {
            id: this.attr(null),
            etl_definition_id: this.attr(null),
            sla_definition_id: this.attr(null)
        }
    }
}
