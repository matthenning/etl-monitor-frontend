<template>
    <svg version="1.2" :height="dimensions.height" :width="dimensions.width">
        <text x="0" y="45" class="caption" :fill="color.text">{{ textStart }}</text>
        <rect :x="dimensions.textBoxStart" y="40" :width="dimensions.rangeWidth" height="2" :fill="color.light1.stroke" />
        <rect :x="dimensions.textBoxStart" y="35" :width="dimensions.startEndLineWidth" height="12" :fill="color.light1.stroke" />
        <rect :x="dimensions.rangeWidth + 33" y="35" :width="dimensions.startEndLineWidth" height="12" :fill="color.light1.stroke" />
        <text :x="dimensions.rangeWidth + 40" y="45" class="caption" :fill="color.text">{{ textEnd }}</text>

        <svg v-if="nowIsInRange" :x="positionNow" y="4">
            <line :x1="0" y1="0" :x2="0" :y2="dimensions.height - 2" opacity="50%" :stroke="colorNowMarker" stroke-width="2" stroke-dasharray="4 1" />
        </svg>

        <svg :x="positionSlaTarget" y="55" height="20" width="60" v-if="sla.target">
            <rect x="0" y="0" width="100%" height="100%" :fill="color.light2.fill" :stroke="color.light2.stroke" rx="3" ry="3" />
            <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" class="caption font-weight-bold text--secondary">{{ textTarget }}</text>
        </svg>

        <svg :x="positionSlaTarget" y="45" width="60" height="30" v-if="sla.target">
            <rect x="30" y="3" width="1" height="7" :fill="colorNowMarker" />
            <line x1="27" :y1="6" x2="31" :y2="3" :stroke="colorNowMarker" stroke-width="2" />
            <line x1="30" :y1="3" x2="34" :y2="6" :stroke="colorNowMarker" stroke-width="2" />
        </svg>

        <rect v-if="sla.average" :x="positionAverageStart" y="30" :width="widthAverage" height="10" :fill="color.light1.fill" />

        <rect x="37" y="42" :width="widthSuccess" height="3" :fill="this.color.success.fill" opacity="50%" />
        <rect :x="positionWarning" y="42" :width="widthWarning" height="3" :fill="color.warning.fill" opacity="50%" />

        <svg :x="positionSlaAchieved" y="5" height="20" width="70" v-if="sla.achieved">
            <rect x="0" y="0" width="100%" height="100%" :fill="colorFillAchievement" :stroke="colorStrokeAchievement" rx="3" ry="3" />
            <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" class="caption font-weight-bold text--secondary">{{ textAchieved }}</text>
        </svg>

        <svg :x="positionSlaAchieved" y="20" height="36" width="70" v-if="sla.achieved">
            <rect x="35" y="4" width="1" height="15" :fill="colorStrokeAchievement" />
            <line x1="32" :y1="16" x2="36" :y2="19" :stroke="colorStrokeAchievement" stroke-width="2" />
            <line x1="35" :y1="19" x2="39" :y2="16" :stroke="colorStrokeAchievement" stroke-width="2" />
        </svg>
    </svg>
</template>

<script>

import moment from "moment";
import Svg from "@/svg/Svg";

export default {

    extends: Svg,

    props: {
        sla: Object,
        dimensions: {
            type: Object,
            default: () => {
                return {
                    height: 76,
                    width: 270,
                    rangeWidth: 150,
                    startEndLineWidth: 2,
                    textBoxStart: 35
                }
            }
        }
    },

    computed: {
        nowIsInRange () {
            return moment().isBefore(this.slaEnd)
        },
        textStart () {
            return this.sla.start.format('HH:mm')
        },
        textEnd () {
            if (!this.slaEnd.diff(this.sla.start, 'hour') > 24) {
                let dd = this.slaEnd.diff(this.sla.start, 'day')
                let dh = this.slaEnd.diff(this.sla.start, 'hour') % 24

                return dd + 'd ' + dh + 'h'
            }

            return this.slaEnd.format('HH:mm')
        },
        textAchieved () {
            if (!this.sla.achieved) return
            return this.getDurationString(this.sla.achieved.diff(this.sla.start, 'minute'))
        },
        textTarget () {
            if (!this.sla.target) return

            if (!this.sla.target.diff(this.sla.start, 'hour') > 24) {
                let dd = this.sla.target.diff(this.sla.start, 'day')
                let dh = this.sla.target.diff(this.sla.start, 'hour') % 24

                return dd + 'd ' + dh + 'h'
            }

            return this.sla.target.format('HH:mm')
        },

        durationSla () {
            return this.slaEnd.diff(this.sla.start, 'minute')
        },

        widthRangeEffective () {
            return this.dimensions.rangeWidth - this.dimensions.startEndLineWidth * 2
        },

        widthSuccess () {
            if (!this.sla.target) return
            let pctTarget = this.sla.target.diff(this.sla.start, 'minute') / this.durationSla * 100
            return this.widthRangeEffective / 100 * pctTarget + this.dimensions.textBoxStart - 30 - 3
        },

        positionWarning () {
            return this.widthSuccess + 37
        },

        widthWarning () {
            if (!this.sla.target || !this.sla.error_margin_minutes) return
            let t = moment(this.sla.target).add(this.sla.error_margin_minutes, 'minute')
            let pctWarning = t.diff(this.sla.target, 'minute') / this.durationSla * 100
            return this.widthRangeEffective / 100 * pctWarning
        },

        positionNow () {
            let pctNow = Math.abs(moment().diff(this.sla.start, 'minute')) / this.durationSla * 100
            let pos = this.dimensions.rangeWidth / 100 * pctNow + this.dimensions.textBoxStart

            return pos
        },

        positionSlaTarget () {
            if (!this.sla.target) return
            let pctTarget = this.sla.target.diff(this.sla.start, 'minute') / this.durationSla * 100
            let pos = this.dimensions.rangeWidth / 100 * pctTarget + this.dimensions.textBoxStart - 30

            return pos
        },

        positionSlaAchieved () {
            if (!this.sla.achieved) return
            let pctTarget = this.sla.achieved.diff(this.sla.start, 'minute') / this.durationSla * 100
            return this.dimensions.rangeWidth / 100 * pctTarget + this.dimensions.textBoxStart - 33
        },

        positionAverageStart () {
            if (!this.sla.average) return
            let pctStartLower = this.sla.average.lower / this.durationSla * 100
            return this.widthRangeEffective / 100 * pctStartLower + this.dimensions.textBoxStart
        },
        positionAverageEnd () {
            if (!this.sla.average) return
            let pctEndUpper = this.sla.average.upper / this.durationSla * 100
            let end = this.widthRangeEffective / 100 * pctEndUpper + this.dimensions.textBoxStart
            if (end > this.widthRangeEffective) return this.widthRangeEffective
            return end
        },
        widthAverage () {
            return this.positionAverageEnd - this.positionAverageStart
        },

        colorFillAchievement () {
            let achieved = this.sla.achieved
            if (!achieved) return
            if (achieved.isBefore(this.sla.target)) return this.color.success.fill
            if (this.sla.error_margin_minutes && moment(achieved).add(this.sla.error_margin_minutes, 'minute').isBefore(this.sla.target)) return this.color.warning.fill
            return this.color.critical.fill
        },
        colorStrokeAchievement () {
            let achieved = this.sla.achieved
            if (!achieved) return
            if (achieved.isBefore(this.sla.target)) return this.color.success.stroke
            if (this.sla.error_margin_minutes && moment(achieved).add(this.sla.error_margin_minutes, 'minute').isBefore(this.sla.target)) return this.color.warning.stroke
            return this.color.critical.stroke
        },
        colorNowMarker () {
            if (this.sla.achieved) {
                if (this.sla.achieved.isBefore(this.sla.target)) return this.color.success.stroke
                return this.color.critical.stroke
            }

            return this.color.default.stroke
        },

        slaEnd () {
            let dates = [ this.sla.start, this.sla.target ]
            if (this.sla.average) {
                dates.push(moment(this.sla.start).add(this.sla.average.lower, 'minute'))
                dates.push(moment(this.sla.start).add(this.sla.average.upper, 'minute'))
            }
            if (this.sla.achieved) {
                dates.push(this.sla.achieved)
            }

            if (this.sla.target && this.sla.error_margin_minutes) {
                let end = moment(this.sla.target)
                end.add(this.sla.error_margin_minutes, 'minute')
                dates.push(end)
            }

            dates.sort((a, b) => a.valueOf() - b.valueOf())
            let highest = dates[dates.length - 1]
            return moment(highest).add(2, 'hour').startOf('hour')
        }

    },

    methods: {
        getDurationString (diff_min) {
            if (diff_min < 60) {
                return diff_min + 'm'
            }
            if (diff_min < 1440) {
                let m = diff_min % 60
                let h = Math.round(diff_min / 60)

                return h + 'h ' + m + 'm'
            }

            let h = (diff_min/60) % 24
            let d = Math.round(diff_min / 1440)

            return d + 'd ' + h + 'h'
        }
    }

}
</script>