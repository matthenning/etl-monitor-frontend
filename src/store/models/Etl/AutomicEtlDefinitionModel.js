import AutomicEtlExecutionModel from "@/store/models/Etl/AutomicEtlExecutionModel";
import EtlDefinitionModel from "@/store/models/Etl/EtlDefinitionModel";
import EtlDefinitionDependsonPivotModel from "@/store/models/Etl/Pivot/EtlDefinitionDependsonPivotModel";
import EtlDefinitionAffectedSlaPivotModel from "@/store/models/Etl/Pivot/EtlDefinitionAffectedSlaPivotModel";
import DeliverableSlaDefinitionModel from "@/store/models/Sla/DeliverableSlaDefinitionModel";
import AvailabilitySlaDefinitionModel from "@/store/models/Sla/AvailabilitySlaDefinitionModel";

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

            affected_deliverable_slas: this.belongsToMany(DeliverableSlaDefinitionModel, EtlDefinitionAffectedSlaPivotModel, 'etl_definition_id', 'sla_definition_id'),
            affected_availability_slas: this.belongsToMany(AvailabilitySlaDefinitionModel, EtlDefinitionAffectedSlaPivotModel, 'etl_definition_id', 'sla_definition_id'),
            depends_on: this.belongsToMany(AutomicEtlDefinitionModel, EtlDefinitionDependsonPivotModel, 'etl_definition_id', 'dependson_etl_definition_id'),
            executions: this.hasMany(AutomicEtlExecutionModel, 'etl_id', 'etl_id')
        }
    }

    get affected_slas () {
        return this.affected_deliverable_slas.concat(this.affected_availability_slas)
    }
}
