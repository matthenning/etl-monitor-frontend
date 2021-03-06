<template>
    <svg version="1.2" :height="dimensions.height" :width="dimensions.width">
        <text x="0" y="45" class="caption" :fill="color.text">{{ textStart }}</text>
        <rect :x="dimensions.textBoxStart" y="40" :width="barWidth" height="10" :fill="color.light1.stroke" />
        <text :x="dimensions.rangeWidth + 40" y="45" class="caption" :fill="color.text">{{ textEnd }}</text>
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
        barWidth () {

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