<template>
    <div>
        <svg version="1.2" :height="dimensions.height" :width="dimensions.width" v-if="sla && sla.progress.filter((p) => p).length > 0">
            <svg :x="dimensions.textBoxStart + 3" :y="positionGraphY + dimensions.graphHeight + 4" :width="widthGraph - 1">
                <rect v-for="(p, i) in sla.progress" :v-key="p" :x="positionPointX(i) - 5" :y="0" :width="widthStatus"  height="5" :fill="fillStatus(p)" />
            </svg>

            <rect :x="dimensions.textBoxStart - 3" :y="positionGraphY - 2" height="2" width="5" :fill="color.default.fill" />
            <text :x="dimensions.textBoxStart - 35" :y="positionGraphY + 3" class="caption text--secondary">100%</text>

            <rect :x="dimensions.textBoxStart - 3" :y="positionGraphY + dimensions.graphHeight + 1" height="2" width="5" :fill="color.default.fill" />
            <text :x="dimensions.textBoxStart - 28" :y="positionGraphY + dimensions.graphHeight + 6" class="caption text--secondary">{{ graphMin }}%</text>

            <text :x="dimensions.textBoxStart - 14" :y="positionGraphY + dimensions.graphHeight + 25" class="caption text--secondary">{{ sla.start.format('HH:mm') }}</text>

            <rect :x="dimensions.textBoxStart" :y="positionGraphY" :height="dimensions.graphHeight + 10" width="2" :fill="color.default.fill" />

            <svg :x="positionGraphX" :y="positionGraphY" :width="widthGraph" :height="dimensions.graphHeight">
                <path :d="graphPath" :stroke="color.success.stroke" :fill="color.success.fill" />
            </svg>

            <rect :x="positionGraphX" :y="positionGraphY + dimensions.graphHeight + 1" height="2" :width="widthGraph + 1" :fill="color.default.fill" />

            <rect :x="positionTextEndX" :y="positionGraphY" :height="dimensions.graphHeight + 10" width="2" :fill="color.default.fill" />
            <rect :x="positionTextEndX" :y="positionTargetY - 2" height="2" width="5" :fill="color.default.fill" />
            <text :x="positionTextEndX + 8" :y="positionTargetY + 2" class="caption text--secondary">{{ sla.target_percent }}%</text>

            <text :x="positionTextEndX - 15" :y="positionGraphY + dimensions.graphHeight + 25" class="caption text--secondary">{{ textTarget }}</text>
        </svg>
    </div>
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
                    graphHeight: 35,
                    graphWidth: 144,
                    textBoxStart: 35
                }
            }
        }
    },

    computed: {
        textStart () {
            return this.sla.start.format('HH:mm')
        },
        textEnd () {
            if (!this.sla.start.diff(this.sla.end, 'hour') > 24) {
                let dd = this.sla.start.diff(this.sla.end, 'day')
                let dh = this.sla.start.diff(this.sla.end, 'hour') % 24

                return dd + 'd ' + dh + 'h'
            }

            return this.sla.start.format('HH:mm')
        },
        positionGraphX () {
            return this.dimensions.textBoxStart + 2
        },
        positionGraphY () {
            return 15
        },
        widthGraph () {
            return this.dimensions.graphWidth
        },
        heightGraph () {
            return this.dimensions.graphHeight
        },
        positionTextEndX () {
            return this.positionGraphX + this.widthGraph + 1
        },
        positionTargetY () {
            return this.positionPointY(this.sla.target_percent) + this.positionGraphY //this.positionGraphY + this.dimensions.graphHeight - this.dimensions.graphHeight / 100 * this.sla.target_percent
        },
        graphMin () {
            let m = this.sla.progress.filter((p) => p).min()
            if (m > this.sla.target_percent - 10) return this.sla.target_percent - 10
            return m
        },
        graphMax () {
            return 100
        },
        graphRange () {
            return this.graphMax - this.graphMin
        },
        graphPath () {
            if (this.sla.progress.length < 1) return
            let p = '', first = true, last = 0
            this.sla.progress.forEach((progress, i) => {
                if (!progress) return
                if (first) {
                    p += this.svgCmd('M', this.graphMin, i)
                    first = false
                }
                p += this.svgCmd('L', progress, i)
                last = i
            })

            p += this.svgCmd('L', this.graphMin, last)
            p += ' Z'

            return p
        },
        widthStatus () {
            return Math.round(this.widthGraph / 100 * (1 / (this.sla.progress.length - 1) * 100))
        },
        textTarget () {
            if (!this.sla.end) return

            if (!this.sla.end.diff(this.sla.start, 'hour') > 24) {
                let dd = this.sla.end.diff(this.sla.start, 'day')
                let dh = this.sla.end.diff(this.sla.start, 'hour') % 24

                return dd + 'd ' + dh + 'h'
            }

            return this.sla.end.format('HH:mm')
        },
    },

    methods: {
        svgCmd (cmd, progress, index) {
            return ' ' + cmd + ' ' + this.positionPointX(index) + ',' + this.positionPointY(progress)
        },
        positionPointX (index) {
            let iPct = index / (this.sla.progress.length - 1) * 100
            return Math.round(this.widthGraph / 100 * iPct)
        },
        positionPointY (value) {
            let pctV = 100 - (value - this.graphMin) / (100 - this.graphMin) * 100
            return Math.round(this.heightGraph / 100 * pctV)
        },
        fillStatus (p) {
            if (!p) return 'transparent';
            if (p >= this.sla.target_percent) return this.color.success.fill
            return this.color.critical.fill
        },
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
