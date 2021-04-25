<template>
    <div>
        <v-tooltip v-model="mouseoverbox" bottom :position-x="tooltipX" :position-y="tooltipY">
            <span v-if="mouseoverday && mouseoverday.day">{{ mouseoverday.day.format('YYYY-MM-DD') }}</span>
        </v-tooltip>

        <svg version="1.2" :height="dimensions.height" :width="dimensions.width">

            <svg v-for="(day, index) in history" :key="id(index)" :width="widthBox(day)" :x="positionBoxX(index)" :height="dimensions.height" y="0">

                <rect v-if="isStartOfWeek(day) && index > 0" :x="4" :y="5" width="2" :height="dimensions.box_size + 2" :fill="color.default.stroke"></rect>

                <svg @mouseenter="mouseenter(index, day)" @mouseleave="mouseleave(index, day)">
                    <rect :x="boxOffsetX(day, index)" :y="6" :height="dimensions.box_size" :width="dimensions.box_size" :id="id(index)"
                          :fill="fillBox(day)" :stroke="strokeBox(day)" rx="2" ry="2" />

                    <rect v-if="isCurrentDay(day)" :x="1" :y="3" :height="dimensions.box_size + 6" :width="dimensions.box_size + 6"
                          fill="transparent" :stroke="strokeBox(day)" rx="3" ry="3" stroke-width="2" />
                </svg>
            </svg>
        </svg>
    </div>
</template>

<script>
import moment from "moment";
import Svg from "@/svg/Svg";

export default {
    extends: Svg,

    props: {
        definition: Object,
        history: Array,
        dimensions: {
            type: Object,
            default: () => {
                return {
                    height: 32,
                    width: 600,
                    box_size: 12,
                }
            }
        }
    },

    data () {
        return {
            mouseoverday: null,
            mouseoverbox: false,
            tooltipX: null,
            tooltipY: null
        }
    },

    methods: {
        id (index) {
            return 'sla-history-rect-' + this.definition.id + '--' + index
        },
        isCurrentDay (day) {
            return moment(day.day).isSame(moment(), 'day')
        },
        getMondays (index) {
            let mondays = this.history.slice(0, index).filter((d) => moment(d.day).weekday() === 1).length
            if (this.isStartOfWeek(this.history[0])) mondays--

            return mondays
        },
        isInErrorMargin (day) {
            return day.achieved_at &&
                day.achieved_at.isAfter(day.target) &&
                moment(day.achieved_at).subtract(day.error_margin_minutes, 'minute').isBefore(day.target)
        },
        isStartOfWeek (day) {
            return moment(day.day).weekday() === 1 //0 = sunday, 1 = monday
        },
        positionBoxX (index) {
            if (index === 0) return 0
            return index * (this.dimensions.box_size + 6) + this.getMondays(index) * 8
        },
        widthBox (day) {
            let add = this.isStartOfWeek(day) ? 8 : 0
            return this.dimensions.box_size + 9 + add
        },
        boxOffsetX (day, index) {
            return this.isStartOfWeek(day) && index > 0 ? 12 : 4
        },
        
        fillBox (day) {
            if (this.isInErrorMargin(day)) return this.color.warning.hint
            if (day.status === 'achieved') return this.color.success.hint
            if (day.status === 'failed') return this.color.critical.hint
            return this.color.default.hint
        },
        strokeBox (day) {
            if (this.isInErrorMargin(day)) return this.color.warning.stroke
            if (day.status === 'achieved') return this.color.success.stroke
            if (day.status === 'failed') return this.color.critical.stroke
            return this.color.default.stroke
        },

        mouseenter (index, day) {
            let r = document.getElementById(this.id(index)).getBoundingClientRect()
            this.tooltipX = r.left + (r.right - r.left) / 2
            this.tooltipY = r.bottom
            this.mouseoverday = day
            this.mouseoverbox = true
        },
        mouseleave () {
            this.mouseoverbox = false
        }
    }

}
</script>