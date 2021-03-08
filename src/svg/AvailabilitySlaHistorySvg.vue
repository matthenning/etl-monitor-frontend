<template>
    <div>
        <v-tooltip v-model="mouseoverbar" bottom :position-x="tooltipX" :position-y="tooltipY">
            <span v-if="mouseoverday">{{ mouseoverday.day.format('YYYY-MM-DD') }}</span>
        </v-tooltip>

        <svg version="1.2" :height="dimensions.height" :width="dimensions.width">
            <svg v-for="(day, index) in history" :key="day.sla_id" :width="colWidth" :x="positionBarX(index)" :height="heightMaxBar" y="5"
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
        history: Array,
        dimensions: {
            type: Object,
            default: () => {
                return {
                    height: 76,
                    width: 270,
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
        colWidth () {
            return this.dimensions.bar_width + this.dimensions.bar_l_padding + this.dimensions.bar_r_padding
        },
        barOffsetX () {
            return this.dimensions.bar_l_padding
        }
    },

    methods: {
        targetMarkerPositionY (day) {
            return this.heightMaxBar - this.heightMaxBar / 100 * day.target_percent
        },
        positionBarX (index) {
            if (index === 0) return 0
            return index * (this.colWidth + this.dimensions.bar_l_margin)
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
            return this.heightMaxBar / 100 * day.achieved_percent
        },
        heightTargetBar (day) {
            return Math.abs(this.heightMaxBar / 100 * (100 - day.achieved_percent))
        },
        fillBar (day) {
            if (day.status === 'achieved') return this.color.success.fill
            if (day.status === 'failed') return this.color.critical.fill
            return this.color.default.fill
        },
        strokeBar (day) {
            if (day.status === 'achieved') return this.color.success.stroke
            if (day.status === 'failed') return this.color.critical.stroke
            return this.color.default.stroke
        },
        strokeTargetBar (day) {
            if (day.status === 'achieved') return this.color.success.stroke
            if (day.status === 'failed') return this.color.critical.stroke
            return '#FFFFFF'
        },
        hatchType (day) {
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