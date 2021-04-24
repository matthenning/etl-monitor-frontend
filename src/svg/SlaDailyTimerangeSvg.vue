<template>
    <div>
        <v-tooltip v-model="mouseoverbar" bottom :position-x="tooltipX" :position-y="tooltipY">
            <span v-if="mouseoverday">{{ mouseoverday.end.format('YYYY-MM-DD') }}</span>
        </v-tooltip>

        <svg version="1.2" :height="dimensions.height" :width="width">
            <svg v-for="(day, index) in days" :key="day" :x="positionX(index)" :y="dimensions.padding_y / 2">
                <text :x="5" :y="0">{{ day }}</text>

                <rect :x="0" :y="20" :width="dimensions.day.width" :height="dimensions.day.height"
                      :stroke="color.default.stroke" fill="transparent"></rect>
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
        timeranges: {
            type: Array,
            default: []
        },
        dimensions: {
            type: Object,
            default: () => {
                return {
                    padding_y: 10,
                    day: {
                        width: 50,
                        height: 200,
                        padding_l: 10
                    }
                }
            }
        }
    },

    data () {
        return {
            mouseoverday: null,
            mouseoverbar: false,
            tooltipX: null,
            tooltipY: null,
            days: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ]
        }
    },

    computed: {
        width () {
            return this.positionX(6) + this.dimensions.day.width
        },
        height () {
            return this.dimensions.day.height + this.dimensions.padding_y
        }
    },

    methods: {
        positionX (index) {
            return index * (this.dimensions.day.width + this.dimensions.day.padding_l)
        },
        mouseenter (day) {
            if (!this.timeranges.length < 1) return
            let r = document.getElementById('sla-daily-timerange-' + this.sla_definition.id).getBoundingClientRect()
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