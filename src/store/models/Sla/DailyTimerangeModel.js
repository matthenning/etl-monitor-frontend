import TimerangeModel from "@/store/models/Sla/TimerangeModel";

export default class DailyTimerangeModel extends TimerangeModel {
    static name = 'DailyTimerange'
    static entity = 'daily_timeranges'
    static package = 'sla'
    static menu = false

    static fields () {
        return {
            ...super.fields(),
        }
    }
}
