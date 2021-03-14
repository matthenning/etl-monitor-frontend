import SlaModel from "./SlaModel";
import AvailabilitySlaDefinitionModel from "@/store/models/Sla/AvailabilitySlaDefinitionModel";
import AvailabilitySlaStatisticModel from "@/store/models/Sla/AvailabilitySlaStatisticModel";
import Link from "@/util/Link";

export default class AvailabilitySlaModel extends SlaModel {
    static name = 'AvailabilitySla'
    static entity = 'availability_slas'
    static package = 'sla'
    static menu = false

    static fields () {
        return {
            ...super.fields(),

            definition: this.belongsTo(AvailabilitySlaDefinitionModel, 'sla_definition_id'),
            statistic: this.hasOne(AvailabilitySlaStatisticModel, 'sla_id')
        }
    }
}
