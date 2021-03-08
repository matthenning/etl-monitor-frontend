<template>
    <div>

        <svg version="1.2" :height="dimensions.size" :width="dimensions.size">
            <svg :x="dimensions.padding" :y="dimensions.padding" :height="dimensions.size - dimensions.padding * 2" :width="dimensions.size - dimensions.padding * 2">
                <path :d="pathAchieved" fill="transparent" :stroke="fillAchieved" :stroke-width="dimensions.strokeWidth" stroke-linecap="butt" />

                <path :d="pathTarget" fill="transparent" :stroke="'url(#diagonal-hatch-' + hatchTypeTarget + ')'" :stroke-width="dimensions.strokeWidth" stroke-linecap="butt" />

                <path :d="pathInner" fill="transparent" :stroke="strokeTotal" stroke-width="1" stroke-linecap="butt" />
                <path :d="pathOuter" fill="transparent" :stroke="strokeTotal" stroke-width="1" stroke-linecap="butt" />

                <text x="calc(50% + 5px)" y="calc(50% + 5px)" dominant-baseline="middle" text-anchor="middle" class="caption text--secondary">{{ textAchieved }}%</text>
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
        sla: Object,
        dimensions: {
            type: Object,
            default: () => {
                return {
                    size: 76,
                    padding: 4,
                    strokeWidth: 4
                }
            }
        }
    },

    computed: {
        drawSize () {
            return this.dimensions.size - this.dimensions.padding * 4
        },
        diameter () {
            return this.drawSize - this.dimensions.strokeWidth / 2
        },
        radius () {
            return this.diameter / 2
        },
        radiusOuter () {
            return this.radius + this.dimensions.strokeWidth / 2
        },
        radiusInner () {
            return this.radius - this.dimensions.strokeWidth / 2
        },
        center () {
            return this.drawSize / 2 + this.dimensions.padding
        },
        pathStartX () {
            return this.center + this.radius
        },
        pathStartY () {
            return this.center
        },
        pathStartXOuter () {
            return this.center + this.radiusOuter
        },
        pathStartXInner () {
            return this.center + this.radiusInner
        },
        pathAchieved () {
            let to
            to = this.sla.achieved_progress_percent > this.sla.target ? this.sla.target : this.sla.achieved_progress_percent

            let p = 'M ' + this.pathStartX + ',' + this.pathStartY + ' '
            p += 'A ' + this.radius + ' ' + this.radius + ' 0 '
            p += to > 50 ? '1 1 ' : '0 1 '
            p += this.endpointX(to) + ' ' + this.endpointY(to)

            return p
        },
        pathTarget () {
            let fr, to
            fr = this.sla.achieved_progress_percent > this.sla.target ? this.sla.target : this.sla.achieved_progress_percent
            to = this.sla.achieved_progress_percent < this.sla.target ? this.sla.target : this.sla.achieved_progress_percent

            let p = 'M ' + this.endpointX(fr) + ',' + this.endpointY(fr) + ' '
            p += 'A ' + this.radius + ' ' + this.radius + ' 0 '
            p += fr - to > 50 ? '1 1 ' : '0 1 '
            p += this.endpointX(to) + ' ' + this.endpointY(to)

            return p
        },
        pathOuter () {
            let to
            to = this.sla.achieved_progress_percent < this.sla.target ? this.sla.target : this.sla.achieved_progress_percent

            let p = 'M ' + this.pathStartXOuter + ',' + this.pathStartY + ' '
            p += 'A ' + this.radiusOuter + ' ' + this.radiusOuter + ' 0 '
            p += to > 50 ? '1 1 ' : '0 1 '
            p += this.endpointXOuter(to) + ' ' + this.endpointYOuter(to)

            return p
        },
        pathInner () {
            let to
            to = this.sla.achieved_progress_percent < this.sla.target ? this.sla.target : this.sla.achieved_progress_percent

            let p = 'M ' + this.pathStartXInner + ',' + this.pathStartY + ' '
            p += 'A ' + this.radiusInner + ' ' + this.radiusInner + ' 0 '
            p += to > 50 ? '1 1 ' : '0 1 '
            p += this.endpointXInner(to) + ' ' + this.endpointYInner(to)

            return p
        },
        strokeTotal () {
            if (this.sla.status === 'achieved') return this.color.success.stroke
            if (this.sla.status === 'failed') return this.color.critical.stroke
            return this.color.default.stroke
        },
        fillAchieved () {
            if (this.sla.status === 'achieved') return this.color.success.fill
            if (this.sla.status === 'failed') return this.color.critical.fill
            return this.color.default.fill
        },
        hatchTypeTarget () {
            if (this.sla.status === 'achieved') return 'success'
            if (this.sla.status === 'failed') return 'critical'
            return 'default'
        },
        textAchieved () {
            return this.sla.achieved_progress_percent ?? 0
        }
    },

    methods: {
        radian (percent) {
            let a = 360 / 100 * percent
            if (a > 359) a = 359
            return a * Math.PI / 180
        },

        endpointX (percent) {
            return this.center + this.radius * Math.cos(this.radian(percent))
        },
        endpointY (percent) {
            return this.center + this.radius * Math.sin(this.radian(percent))
        },

        endpointXInner (percent) {
            return this.center + this.radiusInner * Math.cos(this.radian(percent))
        },
        endpointYInner (percent) {
            return this.center + this.radiusInner * Math.sin(this.radian(percent))
        },

        endpointXOuter (percent) {
            return this.center + this.radiusOuter * Math.cos(this.radian(percent))
        },
        endpointYOuter (percent) {
            return this.center + this.radiusOuter * Math.sin(this.radian(percent))
        }
    }

}
</script>