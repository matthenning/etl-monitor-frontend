<template>
    <div>
        <v-tooltip v-model="mouseoverbar" bottom :position-x="tooltipX" :position-y="tooltipY">
            <span v-if="mouseoverday">{{ mouseoverday.target.format('YYYY-MM-DD') }}</span>
        </v-tooltip>

        <svg version="1.2" :height="dimensions.height" :width="dimensions.width">
            <svg v-for="(day, index) in historyDesc" :key="day.sla_id" :width="colWidth" :x="positionBarX(index)" :height="heightMaxBar" y="5"
                 @mouseenter="mouseenter(day)" @mouseleave="mouseleave(day)">
                <rect :x="barOffsetX" :y="positionBarY(day)" :height="heightBar(day)" :width="dimensions.bar_width" :id="'sla-bar-' + day.sla_id"
                      :fill="fillBar(day)" :stroke="strokeBar(day)" />

                <rect :x="barOffsetX" :y="positionTargetBarY(day)" :height="heightTargetBar(day)" :width="dimensions.bar_width"
                      :fill="'url(#diagonal-hatch-' + hatchType(day) + ')'" :stroke="strokeTargetBar(day)" />

                <svg :x="0" :y="targetMarkerPositionY(day) - 2" height="10" :width="colWidth">
                    <!--<line :x1="barOffsetX" :y1="3" :x2="barOffsetX+dimensions.bar_width" :y2="3" :stroke="strokeTargetBar(day)"></line>-->

                    <line :x1="barOffsetX-5" :y1="0" :x2="barOffsetX-2" :y2="3" :stroke="color.success.stroke" stroke-width="2" />
                    <line :x1="barOffsetX-5" :y1="5" :x2="barOffsetX-2" :y2="2" :stroke="color.success.stroke" stroke-width="2" />

                    <line :x1="barOffsetX+dimensions.bar_width + 2" :y1="3" :x2="barOffsetX+dimensions.bar_width + 5" :y2="0" :stroke="color.success.stroke" stroke-width="2" />
                    <line :x1="barOffsetX+dimensions.bar_width + 2" :y1="2" :x2="barOffsetX+dimensions.bar_width + 5" :y2="5" :stroke="color.success.stroke" stroke-width="2" />
                </svg>
            </svg>

            <diagonal-hatch></diagonal-hatch>
        </svg>
    </div>
</template>

<script>
import moment from "moment";
import Svg from "@/svg/Svg";
import DiagonalHatch from "@/svg/DiagonalHatch";

export default {
    components: {DiagonalHatch},
    extends: Svg,

    props: {
        history: {
            type: Array,
            default: () => {
                return [
                    {
                        target: moment('2020-02-26T20:00:00+02:00'),
                        achieved: moment('2020-02-26T21:00:00+02:00'),
                        error_margin_minutes: 60
                    },
                    {
                        target: moment('2020-02-27T18:00:00+02:00'),
                        achieved: moment('2020-02-27T16:00:00+02:00'),
                        error_margin_minutes: 60
                    },
                    {
                        target: moment('2020-02-28T20:00:00+02:00'),
                        achieved: moment('2020-02-28T21:00:00+02:00'),
                        error_margin_minutes: 60
                    },
                    {
                        target: moment('2020-03-01T20:00:00+02:00'),
                        achieved: moment('2020-03-01T21:00:00+02:00'),
                        error_margin_minutes: 60
                    },
                    {
                        target: moment('2020-03-02T20:00:00+02:00'),
                        achieved: moment('2020-03-02T05:00:00+02:00'),
                        error_margin_minutes: 60
                    },
                    {
                        target: moment('2020-03-03T20:00:00+02:00'),
                        achieved: moment('2020-03-03T19:00:00+02:00'),
                        error_margin_minutes: 60
                    }
                ]
            }
        },
        dimensions: {
            type: Object,
            default: () => {
                return {
                    height: 76,
                    width: 247,
                    bar_width: 10,
                    bar_l_padding: 4,
                    bar_r_padding: 4,
                    bar_l_margin: 1
                }
            }
        }
    },

    data () {
        return {
            mouseoverday: null,
            mouseoverbar: false,
            tooltipX: null,
            tooltipY: null
        }
    },

    computed: {
        heightMaxBar () {
            return this.dimensions.height - 6
        },
        slaLongest () {
            let dates = []
            this.history.forEach((h) => {
                dates.push([h.start, h.target, h.achieved_at])
            })

            dates.forEach(function (d) {
                d.sort((a, b) => a.valueOf() - b.valueOf())
            });

            let ranges = dates.map(function (d) {
                return d[d.length-1].diff(d[0], 'minute')
            })

            return ranges.sort((a, b) => a - b)[ranges.length-1]
        },
        colWidth () {
            return this.dimensions.bar_width + this.dimensions.bar_l_padding + this.dimensions.bar_r_padding
        },
        barOffsetX () {
            return this.dimensions.bar_l_padding
        },
        historyDesc () {
            return this.history.sort((a, b) => {
                return moment(a.start).isAfter(moment(b.start)) ? -1 : 1
            })
        }
    },

    methods: {
        isInErrorMargin (day) {
            return day.achieved_at &&
                day.achieved_at.isAfter(day.target) &&
                moment(day.achieved_at).subtract(day.error_margin_minutes, 'minute').isBefore(day.target)
        },
        targetMarkerPositionY (day) {
            let hPct = day.target.diff(day.start, 'minute') / this.slaLongest * 100
            return this.heightMaxBar - this.heightMaxBar / 100 * hPct
        },
        positionBarX (index) {
            index++
            return this.dimensions.width - index * (this.colWidth + this.dimensions.bar_l_margin)
        },
        positionBarY (day) {
            return this.heightMaxBar - this.heightBar(day)
        },
        positionTargetBarY (day) {
            let y = this.positionBarY(day) - this.heightTargetBar(day)
            if (y < 0) return 0
            return y
        },
        heightBar (day) {
            let hPct;
            if (day.status === 'achieved') {
                hPct = day.achieved_at.diff(day.start, 'minute') / this.slaLongest * 100
            } else {
                hPct = day.target.diff(day.start, 'minute') / this.slaLongest * 100
            }
            return this.heightMaxBar / 100 * hPct
        },
        heightTargetBar (day) {
            let hPct;
            if (day.status === 'achieved') {
                hPct = day.achieved_at.diff(day.target, 'minute') / this.slaLongest * 100
            } else {
                hPct = day.achieved_at.diff(day.target, 'minute') / this.slaLongest * 100
            }
            return Math.abs(this.heightMaxBar / 100 * hPct)
        },
        fillBar (day) {
            if (this.isInErrorMargin(day)) return this.color.warning.fill
            if (day.status === 'achieved') return this.color.success.fill
            if (day.status === 'failed') return this.color.critical.fill
            return this.color.default.fill
        },
        strokeBar (day) {
            if (this.isInErrorMargin(day)) return this.color.warning.stroke
            if (day.status === 'achieved') return this.color.success.stroke
            if (day.status === 'failed') return this.color.critical.stroke
            return this.color.default.stroke
        },
        strokeTargetBar (day) {
            if (this.isInErrorMargin(day)) return this.color.warning.stroke
            if (day.status === 'achieved') return this.color.success.stroke
            if (day.status === 'failed') return this.color.critical.stroke
            return '#FFFFFF'
        },
        hatchType (day) {
            if (this.isInErrorMargin(day)) return 'warning'
            if (day.status === 'achieved') return 'success'
            if (day.status === 'failed') return 'critical'
            return 'default'
        },

        mouseenter (day) {
            let r = document.getElementById('sla-bar-' + day.sla_id).getBoundingClientRect()
            this.tooltipX = r.left + (r.right - r.left) / 2
            this.tooltipY = r.bottom
            this.mouseoverday = day
            this.mouseoverbar = true
        },
        mouseleave () {
            this.mouseoverbar = false
        }
    }

}
</script>