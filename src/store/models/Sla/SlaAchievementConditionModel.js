import Model from "@/store/models/Model";

export default class SlaAchievementConditionModel extends Model {
    static name = 'SlaAchievementCondition'
    static entity = 'sla_achievement_conditions'
    static package = 'sla'
    static menu = false

    static route = {
        title: 'SLA'
    }

    static fields () {
        return {
            ...super.fields(),
            sla_id: this.attr(null),
            condition_model: this.attr(null),
            condition_id: this.attr(null),
            condition_status: this.attr(null)
        }
    }
}
