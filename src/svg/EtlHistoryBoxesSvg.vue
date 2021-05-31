<template>
    <div>
        <v-tooltip v-model="mouseoverbox" bottom :position-x="tooltipX" :position-y="tooltipY">
            <span v-if="mouseoverday && mouseoverday.day">{{ mouseoverday.day.format('YYYY-MM-DD') }}</span>
        </v-tooltip>

        <svg version="1.2" :height="dimensions.height" :width="dimensions.width">

            <svg v-for="(exec, index) in history" :key="id(index)" :width="widthBox(exec)" :x="positionBoxX(index)" :height="dimensions.height" y="0">

                <rect v-if="isStartOfWeek(exec) && index > 0" :x="4" :y="5" width="2" :height="dimensions.box_size + 2" :fill="color.default.stroke" />

                <svg @mouseenter="mouseenter(index, exec)" @mouseleave="mouseleave(index, exec)">
                    <rect :x="boxOffsetX(exec, index)" :y="6" :height="dimensions.box_size" :width="dimensions.box_size" :id="id(index)"
                          :fill="fillBox(exec)" :stroke="strokeBox(exec)" rx="2" ry="2" />

                    <rect v-if="isCurrentDay(exec)" :x="boxOffsetX(exec, index) - 3" :y="3" :height="dimensions.box_size + 6" :width="dimensions.box_size + 6"
                          fill="transparent" :stroke="strokeBox(exec)" rx="3" ry="3" stroke-width="2" />

                    <circle v-if="exec.anomaly && exec.anomaly.length > 0"
                            :cx="boxOffsetX(exec, index) + dimensions.box_size / 2" :cy="dimensions.box_size + 14"
                            :r="1" :stroke="color.anomaly.stroke" :fill="color.anomaly.fill" />
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
                    box_size: 12
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
            return 'etl-history-rect-' + this.definition.id + '--' + index + '--' + this.svg_id
        },
        isCurrentDay (exec) {
            return moment(exec.day).isSame(moment(), 'day')
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
            if (day.status === 'ok') return this.color.success.hint
            if (day.status === 'error') return this.color.critical.hint
            return this.color.default.hint
        },
        strokeBox (day) {
            if (day.status === 'ok') return this.color.success.stroke
            if (day.status === 'error') return this.color.critical.stroke
            return this.color.default.stroke
        },

        mouseenter (index, exec) {
            let r = document.getElementById(this.id(index)).getBoundingClientRect()
            this.tooltipX = r.left + (r.right - r.left) / 2
            this.tooltipY = r.bottom
            this.mouseoverday = exec
            this.mouseoverbox = true
        },
        mouseleave () {
            this.mouseoverbox = false
        }
    }

}
</script>