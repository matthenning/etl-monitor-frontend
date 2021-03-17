<template>
    <div>
        <template>
            <svg version="1.2" width="100%" :height="heightRender" id="automic-etl-execution-history-svg">
                <svg v-for="day in Object.keys(lanes)" x="0" :y="positionLaneY(day)" width="100%" :height="heightLane(day)">
                    <rect :x="0" :y="0" :height="heightLane(day)" width="100%" stroke="#CCCCCC" fill="transparent" />

                    <text :x="4" :y="positionTextY" class="caption">{{ day }}</text>

                    <svg v-for="(row, i) in lanes[day]" :y="positionRowY(i)">
                        <svg v-for="execution in row">
                            <rect :x="offsetStartAverageX(execution)" :y="positionStartAverageY"
                                  :height="dimensions.lane.average.height" :width="lengthStartAverage(execution)"
                                  stroke="#CCCCCC" />

                            <rect v-if="execution.date_start"
                                  :x="positionBarX(execution)" :y="positionBarY"
                                  :height="heightBar" :width="widthBar(execution)"
                                  :fill="colorFill(execution)" :stroke="colorStroke(execution)" />

                            <rect :x="offsetEndAverageX(execution)" :y="positionEndAverageY"
                                  :height="dimensions.lane.average.height" :width="lengthEndAverage(execution)"
                                  stroke="#CCCCCC" />
                        </svg>
                    </svg>
                </svg>

                <diagonal-hatch></diagonal-hatch>
            </svg>
        </template>
    </div>
</template>

<script>
import Svg from "@/svg/Svg";
import DiagonalHatch from "@/svg/DiagonalHatch";
import moment from "moment";

export default {
    components: {DiagonalHatch},
    extends: Svg,

    props: {
        executions: Array,
        dimensions: {
            type: Object,
            default: () => {
                return {
                    lane: {
                        height: 30,
                        title: {
                            width: 100
                        },
                        bar: {
                            margin: 2,
                            container: {
                                height: 20
                            }
                        },
                        average: {
                            height: 2
                        }
                    }
                }
            }
        }
    },

    data () {
        return {
            ready: false,
            lanes: {},
            lane_meta: {},
        }
    },

    watch: {
        executions () {
            this.updateChart()
        }
    },

    computed: {
        heightRender () {
            return this.ready ? this.positionLaneY(moment(this.$parent.rangeStart).format('YYYY-MM-DD')): 600
        },
        heightBar () {
            return this.dimensions.lane.bar.container.height - this.dimensions.lane.average.height * 2 - this.dimensions.lane.bar.margin * 2
        },

        offsetBarX () {
            return this.dimensions.lane.title.width
        },
        positionBarY () {
            return (this.dimensions.lane.height - this.heightBar) / 2
        },
        positionTextY () {
            return this.dimensions.lane.height - this.heightBar
        },
        positionStartAverageY () {
            return this.positionBarY - this.dimensions.lane.average.height
        },
        positionEndAverageY () {
            return this.positionBarY + this.heightBar
        }
    },

    methods: {
        updateChart () {
            this.ready = false
            this.prepareLanes()
            this.renderExecutions()
            this.sortExecutionsIntoRows()
            this.$nextTick(() => {
                this.ready = true
            })
        },
        prepareLanes () {
            let start = moment(this.$parent.rangeStart),
                end = moment(this.$parent.rangeEnd)
            this.lanes = {}

            for (let d = end, i = 0; d.isSameOrAfter(start); d.subtract(1, 'day'), i++) {
                let k = d.format('YYYY-MM-DD')
                this.lanes[k] = []
                this.lane_meta[k] = {
                    sort: i
                }
            }
        },
        renderExecutions () {
            let lanes = this.lanes
            this.executions.forEach((e) => {
                let k = moment(e.date_end_pp).format('YYYY-MM-DD')
                if (!Array.isArray(lanes[k])) lanes[k] = []
                lanes[k].push(e)
            })

            this.lanes = lanes
        },
        sortExecutionsIntoRows () {
            let start = moment(this.$parent.rangeStart),
                end = moment(this.$parent.rangeEnd)

            let prev = null
            for (let d = end, i = 0; d.isSameOrAfter(start); d.subtract(1, 'day'), i++) {
                let k = d.format('YYYY-MM-DD')
                this.lanes[k] = this.deoverlap(this.lanes[k])
                this.lane_meta[k].rows = this.lanes[k].length
                if (prev) this.lane_meta[k].total_rows_until_now = this.lane_meta[prev].total_rows_until_now + this.lane_meta[prev].rows
                else this.lane_meta[k].total_rows_until_now = 0
                prev = k
            }
        },

        deoverlap (executions) {
            let rows = []
            executions.forEach((execution) => {
                let start = moment(execution.date_activation),
                    end = moment(execution.date_end_pp)

                let done = false
                rows.forEach((row, i) => {
                    if (done) return
                    if (!Array.isArray(row)) {
                        row = []
                        row.push(execution)
                    } else {
                        let row_ok = true
                        row.forEach((e) => {
                            if (moment(e.date_end_pp).isAfter(start) || moment(e.date_start).isBefore(end)) {
                                row_ok = false
                            }
                        })

                        if (row_ok) {
                            rows[i].push(execution)
                            done = true
                        }
                    }
                })
                if (!done) {
                    rows.push([execution])
                }
            })

            return rows
        },

        positionTime (time) {
            if (!moment.isMoment(time)) time = moment(time)
            let pctTime = moment().set({
                        hour: time.format('H'),
                        minute: time.format('m'),
                        second: time.format('S')
                    }).diff(moment().startOf('day'), 'second') / 86400 * 100,
                el = document.getElementById('automic-etl-execution-history-svg').clientWidth - this.offsetBarX

            return el / 100 * pctTime
        },

        positionRowY (i) {
            return i * this.dimensions.lane.bar.container.height
        },
        positionBarX (execution) {
            if (!execution.date_start) return
            return this.positionTime(execution.date_start) + this.offsetBarX
        },
        positionLaneY (day) {
            let m = this.lane_meta[day]
            return m.sort * this.dimensions.lane.height + ((m.total_rows_until_now - m.sort) * this.dimensions.lane.bar.container.height)
        },
        offsetStartAverageX (execution) {
            return this.offsetBarX + 50
        },
        offsetEndAverageX (execution) {
            return this.offsetBarX + 800
        },
        lengthStartAverage (execution) {
            return 80
        },
        lengthEndAverage (execution) {
            return 100
        },
        widthBar (execution) {
            if (!execution.date_start) return
            let end = execution.date_end_pp
            if (!end) {
                if (moment(execution.date_start).isSame(moment(), 'day')) {
                    end = moment()
                } else {
                    end = moment(execution.date_start).endOf('day')
                }
            }

            return this.positionTime(end) - this.positionBarX(execution) + this.offsetBarX
        },
        colorFill (execution) {
            if (execution.status_text === 'success') return this.color.success.fill
            if (execution.status_text === 'error') return this.color.critical.fill
            return this.color.default.fill
        },
        colorStroke (execution) {
            if (execution.status_text === 'success') return this.color.success.stroke
            if (execution.status_text === 'error') return this.color.critical.stroke
            return this.color.default.stroke
        },

        heightLane (day) {
            let h = this.dimensions.lane.height
            if (this.lane_meta[day].rows > 1) {
                h += (this.lane_meta[day].rows - 1) * this.dimensions.lane.bar.container.height
            }
            return h
        }

    }

}
</script>