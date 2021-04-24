import Model from "../Model"

export default class TimerangeModel extends Model {
    static name = 'Timerange'
    static entity = 'timeranges'
    static package = 'sla'
    static menu = false

    static childModelNames = [ 'DailyTimerangeModel', 'WeeklyTimerangeModel' ]

    static fields () {
        return {
            ...super.fields(),
            sla_definition_id: this.attr(null),
            type: this.attr(null),
            anchor: this.attr(null),
            range_start: this.attr(null),
            range_end: this.attr(null),
            error_margin_minutes: this.attr(null)
        }
    }
}
