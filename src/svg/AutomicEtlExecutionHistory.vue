<template>
    <div>
        <div :id="container_id">
            <svg version="1.2" width="100%" :height="heightRender">
                <svg :x="0" :y="10">
                    <svg v-for="day in Object.keys(lanes)" :x="0" :y="positionLaneY(day)" width="100%" :height="heightLane(day)">
                        <rect :x="0" :y="0" :height="heightLane(day)" width="100%" stroke="#EEEEEE" fill="transparent" />

                        <text :x="4" :y="positionTextY" class="caption">{{ day }}</text>

                        <svg v-for="(row, i) in lanes[day]" :y="positionRowY(i)">
                            <svg v-for="execution in row">
                                <rect :x="offsetStartAverageX(execution)" :y="positionStartAverageY"
                                      :height="dimensions.lane.average.height" :width="lengthStartAverage(execution)"
                                      stroke="#CCCCCC" />

                                <rect v-if="execution.date_start" class="svg-lane-chart-bar"
                                      rx="2" ry="2"
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
                box_size: 12
            },
            container_id: 'automic-etl-execution-history-svg',
            fields: {
                start: 'date_start',
                end: 'date_end_pp'
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

    methods: {
        updateChart () {
            this.ready = false
            this.prepareLanes()
            this.renderExecutions()
            this.sortExecutionsIntoRows()
            this.updateTimeMarkers()
            this.$nextTick(() => {
                this.ready = true
            })
        },
        prepareLanes () {
            let start = moment(this.$parent.rangeStart),
                end = moment(this.$parent.rangeEnd)
            this.lanes = {}

            for (let d = end, i = 0; d.isSameOrAfter(start, 'day'); d.subtract(1, 'day'), i++) {
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
            let start = moment(this.rangeStart),
                end = moment(this.rangeEnd)

            let prev = null
            for (let d = end, i = 0; d.isSameOrAfter(start, 'day'); d.subtract(1, 'day'), i++) {
                let k = d.format('YYYY-MM-DD')
                this.lanes[k] = this.deoverlap(this.lanes[k])
                this.lane_meta[k].rows = this.lanes[k].length === 0 ? 1 : this.lanes[k].length
                if (prev) this.lane_meta[k].total_rows_until_now = this.lane_meta[prev].total_rows_until_now + this.lane_meta[prev].rows
                else this.lane_meta[k].total_rows_until_now = 0
                prev = k
            }
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
    }

}
</script>