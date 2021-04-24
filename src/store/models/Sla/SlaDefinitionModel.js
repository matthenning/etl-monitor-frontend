import Model from "../Model"
import SlaDefinitionLifecycleModel from "@/store/models/Sla/SlaDefinitionLifecycleModel"
import DeliverableSlaModel from "@/store/models/Sla/DeliverableSlaModel";
import SlaDefinitionStatisticModel from "@/store/models/Sla/SlaDefinitionStatisticModel";
import DailyTimerangeModel from "@/store/models/Sla/DailyTimerangeModel";
import WeeklyTimerangeModel from "@/store/models/Sla/WeeklyTimerangeModel";

export default class SlaDefinitionModel extends Model {
    static name = 'SlaDefinition'
    static entity = 'sla_definitions'
    static package = 'sla'
    static menu = false

    static getRelationNames () {
        return [
            'slas', 'lifecycle',
            'daily_timeranges', 'weekly_timeranges'
        ]
    }

    static apiConfig = {
        actions: {
            ...Model.apiConfig.actions,
            inRange: {
                method: 'get',
                url: Model.baseUrl,
                postfix: 'in_range'
            }
        }
    }

    static fields () {
        return {
            ...super.fields(),
            lifecycle_id: this.attr(null),
            name: this.attr(''),
            email: this.attr(null),
            target_percent: this.attr(null),
            rules: this.attr(null),

            daily_timeranges: this.hasMany(DailyTimerangeModel, 'sla_definition_id'),
            weekly_timeranges: this.hasMany(WeeklyTimerangeModel, 'sla_definition_id'),
            lifecycle: this.belongsTo(SlaDefinitionLifecycleModel, 'lifecycle_id'),
            statistic: this.hasOne(SlaDefinitionStatisticModel, 'sla_definition_id')
        }
    }
}
