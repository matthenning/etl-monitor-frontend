import Model from "../Model"

export default class SlaProgressModel extends Model {
    static name = 'SlaProgress'
    static entity = 'sla_progress'
    static package = 'sla'
    static menu = false

    static getRelationNames () {
        return [
            'sla'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            id: this.attr(null),
            sla_id: this.attr(null),
            type: this.attr(null),
            time: this.attr(null),
            progress_percent: this.attr(null),
            source: this.attr(null),
            is_override: this.attr(null)
        }
    }
}
