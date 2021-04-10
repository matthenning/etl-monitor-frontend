import AutomicEtlExecutionModel from "@/store/models/Etl/AutomicEtlExecutionModel";
import EtlDefinitionModel from "@/store/models/Etl/EtlDefinitionModel";

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

            executions: this.hasMany(AutomicEtlExecutionModel, 'etl_id', 'etl_id')
        }
    }
}
