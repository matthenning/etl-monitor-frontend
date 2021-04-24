import TimerangeModel from "@/store/models/Sla/TimerangeModel";

export default class WeeklyTimerangeModel extends TimerangeModel {
    static name = 'WeeklyTimerange'
    static entity = 'weekly_timeranges'
    static package = 'sla'
    static menu = false

    static fields () {
        return {
            ...super.fields(),
        }
    }
}
