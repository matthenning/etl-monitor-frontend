import Model from "../Model"

export default class EtlDefinitionStatisticModel extends Model {
    static name = 'EtlDefinitionStatistic'
    static entity = 'etl_definition_statistics'
    static package = 'etl'
    static menu = false

    static fields () {
        return {
            ...super.fields(),
            etl_definition_id: this.attr(null),
            execution_history: this.attr(null)
        }
    }
}
