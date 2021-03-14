import EtlExecutionModel from "@/store/models/Etl/EtlExecutionModel";

export default class AutomicEtlExecutionModel extends EtlExecutionModel {
    static name = 'AutomicEtlExecution'
    static entity = 'automic_etl_executions'
    static package = 'etl'
    static menu = false

    static fields () {
        return {
            ...super.fields(),

            definition: this.hasMany(AutomicEtlExecutionModel, 'etl_id', 'etl_id')
        }
    }
}
