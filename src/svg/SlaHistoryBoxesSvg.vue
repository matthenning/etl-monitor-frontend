<template>
    <div>
        <v-tooltip v-model="mouseoverbox" bottom :position-x="tooltipX" :position-y="tooltipY">
            <span v-if="mouseoverday && mouseoverday.day">{{ mouseoverday.day.format('YYYY-MM-DD') }}</span>
        </v-tooltip>

        <svg version="1.2" :height="dimensions.height" :width="dimensions.width">

            <svg v-for="(day, index) in history" :key="id(index)" :width="widthBox(day)" :x="positionBoxX(index)" :height="dimensions.box_size + 4" y="0"
                 @mouseenter="mouseenter(index, day)" @mouseleave="mouseleave(index, day)">

                <rect v-if="isStartOfWeek(day)" x="4" y="0" width="2" :height="dimensions.box_size + 4" :fill="color.default.stroke"></rect>

                <rect :x="boxOffsetX(day)" :y="2" :height="dimensions.box_size" :width="dimensions.box_size" :id="id(index)"
                      :fill="fillBox(day)" :stroke="strokeBox(day)" />

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
                    height: 14,
                    width: 600,
                    box_size: 7,
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
        getMondays (index) {
            return this.history.slice(0, index).filter((d) => moment(d.day).weekday() === 1).length
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
            return index * (this.dimensions.box_size + 4) + this.getMondays(index) * 8
        },
        widthBox (day) {
            let add = this.isStartOfWeek(day) ? 8 : 0
            return this.dimensions.box_size + 4 + add
        },
        boxOffsetX (day) {
            return this.isStartOfWeek(day) ? 11 : 3
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