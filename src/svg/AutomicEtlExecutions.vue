<template>
    <div>
        <div :id="container_id">
            <svg version="1.2" width="100%" :height="heightRender + 100" v-if="ready">
                <svg :x="0" :y="10">
                    <svg v-for="etl_id in Object.keys(lanes)" :x="0" :y="positionLaneY(etl_id)" width="100%" :height="heightLane(etl_id)">
                        <rect :x="0" :y="0" :height="heightLane(etl_id)" width="100%" stroke="#EEEEEE" fill="transparent" />

                        <text :x="4" :y="positionTextY" class="caption">{{ etl_id }}</text>

                        <svg v-for="(row, i) in lanes[etl_id]" :y="positionRowY(i)">
                            <svg v-for="execution in row">
                                <rect :x="offsetStartAverageX(execution)" :y="positionStartAverageY"
                                      :height="dimensions.lane.average.height" :width="lengthStartAverage(execution)"
                                      stroke="#CCCCCC" />

                                <rect v-if="execution.date_start" class="svg-lane-chart-bar"
                                      @click="showExecutionDetails(execution)"
                                      :x="positionBarX(execution)" :y="positionBarY"
                                      :height="heightBar" :width="widthBar(execution)"
                                      :fill="colorFill(execution)" :stroke="colorStroke(execution)" />

                                <rect :x="offsetEndAverageX(execution)" :y="positionEndAverageY"
                                      :height="dimensions.lane.average.height" :width="lengthEndAverage(execution)"
                                      stroke="#CCCCCC" />
                            </svg>
                        </svg>
                    </svg>

                    <svg v-for="(marker, i) in time_markers" :key="i"
                         :x="marker.position" :y="0"
                         :height="heightRender" :width="dimensions.header.marker.width">
                        <rect :height="heightRender" :width="dimensions.header.marker.width"
                              :stroke="color.light2.stroke" :fill="color.light2.fill"
                                opacity="0.1"></rect>
                    </svg>
                </svg>

                <diagonal-hatch></diagonal-hatch>
            </svg>
        </div>


        <v-dialog v-model="execution_details_modal" width="800px" persistent>
            <v-card v-if="execution_details">
                <v-card-title>
                    <span class="headline" v-if="etl_definition">{{ etl_definition.name }}</span>
                    <span class="headline" v-else>...</span>
                </v-card-title>
                <v-card-text>

                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="closeExecutionDetails()">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import moment from "moment";
import LaneChart from "@/svg/LaneChart";
import ModelFactory from "@/store/models/ModelFactory";
import AutomicEtlDefinitionModel from "@/store/models/Etl/AutomicEtlDefinitionModel";

export default {
    extends: LaneChart,

    props: {
        executions: Array,
    },

    data () {
        return {
            dimensions: {
                lanes: {
                    title: {
                        width: 300
                    }
                }
            },
            container_id: 'automic-etl-executions-svg',
            fields: {
                start: 'date_start',
                end: 'date_end_pp',
                id: 'etl_id'
            },
            execution_details_modal: false,
            execution_details: null,
            etl_definition: null
        }
    },

    watch: {
        executions () {
            this.updateChart()
        }
    },

    computed: {
        heightRender () {
            return this.dimensions.header.height + this.executions.length * this.dimensions.lane.height
        },
        rangeStart () {
            return this.timespan().start
        },
        rangeEnd () {
            return this.timespan().end
        }
    },

    methods: {
        timespan () {
            let start, end
            this.executions.forEach((e) => {
                if (!start || moment(e[this.fields.start]).isBefore(start)) {
                    start = moment(e[this.fields.start])
                }
                if (!end || moment(e[this.fields.end]).isAfter(end)) {
                    end = moment(e[this.fields.end])
                }
            })

            return {
                start: start,
                end: end
            }
        },
        updateChart () {
            this.ready = false

            let timespan = this.timespan()
            this.timespan_seconds = Math.abs(timespan.start.diff(timespan.end, 'second'))

            this.prepareLanes()
            this.renderExecutions()
            this.sortExecutionsIntoRows()
            this.updateTimeMarkers()
            this.$nextTick(() => {
                this.ready = true
            })
        },
        prepareLanes () {
            this.lanes = {}
            this.lane_meta = {}

            let i = 0
            this.executions.forEach((e) => {
                let k = e[this.fields.id]
                if (!this.lanes[k]) {
                    this.lanes[k] = []
                    this.lane_meta[k] = {
                        sort: i
                    }
                    i++
                }
            })
        },
        renderExecutions () {
            let lanes = this.lanes
            this.executions.forEach((e) => {
                let k = e[this.fields.id]
                if (!Array.isArray(lanes[k])) lanes[k] = []

                lanes[k].push(e)
            })

            this.lanes = lanes
        },
        sortExecutionsIntoRows () {
            let prev = null
            Object.keys(this.lanes).forEach((k) => {
                this.lanes[k] = this.deoverlap(this.lanes[k])
                this.lane_meta[k].rows = this.lanes[k].length === 0 ? 1 : this.lanes[k].length
                if (prev) this.lane_meta[k].total_rows_until_now = this.lane_meta[prev].total_rows_until_now + this.lane_meta[prev].rows
                else this.lane_meta[k].total_rows_until_now = 0
                prev = k
            })
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

        receiveEtlDefinition () {
            this.etl_definition = AutomicEtlDefinitionModel.getQueryWithAllRelations().where('etl_id', this.execution_details.etl_id).first()
        },
        loadExecutionDetails () {
            if (!this.execution_details) return
            ModelFactory.fetchWithPagination(
                AutomicEtlDefinitionModel,
                { paginate: false, filter: { etl_id: this.execution_details.etl_id } },
                this.receiveEtlDefinition,
                null,
                ['statistic']
            )
        },
        showExecutionDetails (execution) {
            this.execution_details = execution
            this.loadExecutionDetails()
            this.execution_details_modal = true
        },
        closeExecutionDetails (e) {
            if (this.execution_details_modal) {
                this.execution_details = null
                this.execution_details_modal = false
            }
        }
    },

    mounted () {
        this.updateChart()
    }

}
</script>