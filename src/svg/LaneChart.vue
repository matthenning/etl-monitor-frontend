<script>
import Svg from "@/svg/Svg";
import DiagonalHatch from "@/svg/DiagonalHatch";
import moment from "moment";

export default {
    components: {
        DiagonalHatch
    },

    extends: Svg,

    data () {
        return {
            dimensions: {
                header: {
                    height: 10,
                    width: 40,
                    marker: {
                        height: 10,
                        width: 1
                    }
                },
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
            },
            ready: false,
            lanes: {},
            lane_meta: {},
            time_markers: [],
            timespan_seconds: 86400,
            container_id: '',
            fields: {
                start: 'start',
                end: 'end'
            }
        }
    },

    computed: {
        heightRender () {
            let h = this.ready ? this.positionLaneY(this.rangeStart.format('YYYY-MM-DD')) + this.dimensions.lane.height : 600
            h += this.dimensions.header.height

            return h
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
        },

        rangeStart () {
            return moment(this.$parent.rangeStart)
        },
        rangeEnd () {
            return moment(this.$parent.rangeEnd)
        }
    },

    methods: {
        deoverlap (executions) {
            let rows = []
            executions.forEach((execution) => {
                let start = moment(execution[this.fields.start]),
                    end = moment(execution[this.fields.end])

                let done = false
                rows.forEach((row, i) => {
                    if (done) return
                    if (!Array.isArray(row)) {
                        row = []
                        row.push(execution)
                    } else {
                        let row_ok = true
                        row.forEach((e) => {
                            if (moment(e[this.fields.end]).isAfter(start)) {
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
            if (!document.getElementById(this.container_id)) return
            let pctTime = moment(time).diff(this.laneRangeStart(time), 'second') / this.timespan_seconds * 100
            let el = document.getElementById(this.container_id).clientWidth - this.offsetBarX

            let r = el / 100 * pctTime + this.offsetBarX
            return r
        },

        positionRowY (i) {
            return i * this.dimensions.lane.bar.container.height
        },
        positionBarX (execution) {
            if (!execution.date_start) return
            return this.positionTime(execution[this.fields.start])
        },
        positionLaneY (lane) {
            if (!this.lane_meta[lane]) return
            let m = this.lane_meta[lane],
                h = m.sort * this.dimensions.lane.height

            if (m.total_rows_until_now - m.sort > 0) {
                h += (m.total_rows_until_now - m.sort) * this.dimensions.lane.bar.container.height
            }

            return h
        },
        laneRangeStart (time) {
            return moment(time ?? this.rangeStart).startOf('day')
        },

        widthBar (execution) {
            if (!execution[this.fields.start]) return
            let end = execution[this.fields.end]
            if (!end) {
                if (moment(execution[this.fields.start]).isSame(moment(), 'day')) {
                    end = moment()
                } else {
                    end = moment(execution[this.fields.start]).endOf('day')
                }
            }

            return this.positionTime(end) - this.positionBarX(execution)
        },
        colorFill (execution) {
            if (!execution.date_end_pp) return this.color.default.fill
            if (execution.status_text === 'success') return this.color.success.fill
            if (execution.status_text === 'error') return this.color.critical.fill
            return this.color.default.fill
        },
        colorStroke (execution) {
            if (!execution.date_end_pp) return this.color.default.stroke
            if (execution.status_text === 'success') return this.color.success.stroke
            if (execution.status_text === 'error') return this.color.critical.stroke
            return this.color.default.stroke
        },

        heightLane (lane) {
            let h = this.dimensions.lane.height
            if (this.lane_meta[lane].rows > 1) {
                h += (this.lane_meta[lane].rows - 1) * this.dimensions.lane.bar.container.height
            }
            return h
        },
        updateTimeMarkers () {
            this.time_markers = []
            let markers = [],
                start = moment(this.rangeStart),
                end = this.rangeEnd

            for (let d = start; d.isSameOrBefore(end); d.add(2, 'hour')) {
                markers.push({
                    position: this.positionTime(d),
                    time: d.format('HH:mm')
                })
            }

            this.time_markers = markers
        }
    }

}
</script>