import AutomicEtlExecutionModel from "@/store/models/Etl/AutomicEtlExecutionModel";
import EtlDefinitionModel from "@/store/models/Etl/EtlDefinitionModel";
import EtlDefinitionDependsonPivotModel from "@/store/models/Etl/Pivot/EtlDefinitionDependsonPivotModel";

export default class AutomicEtlDefinitionModel extends EtlDefinitionModel {
    static name = 'AutomicEtlDefinition'
    static entity = 'automic_etl_definitions'
    static package = 'etl'
    static menu = false

    static route = {
        title: 'ETL'
    }

    static fields () {
        return {
            ...super.fields(),

            depends_on: this.belongsToMany(AutomicEtlDefinitionModel, EtlDefinitionDependsonPivotModel, 'etl_definition_id', 'dependson_etl_definition_id'),
            executions: this.hasMany(AutomicEtlExecutionModel, 'etl_id', 'etl_id')
        }
    }
}
