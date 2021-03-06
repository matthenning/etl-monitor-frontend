<template>

    <div>
        <v-row>
            <v-col md="hidden" lg="3" xl="2">
                <div class="body-1">Completed</div>
                <div class="font-weight-bold">
                    <span class="text-h5">{{ completed }}%</span>
                </div>
            </v-col>
            <v-col md="hidden" lg="3" xl="2">
                <span class="body-1">Success</span>
                <div class="font-weight-bold">
                    <span class="text-h5">{{ success }}%</span>
                </div>
            </v-col>
        </v-row>

        <v-data-table v-if="objects"
                      class="sla-dashboard-data-table"
                      :headers="headers"
                      :items="objects"
                      :items-per-page.sync="pagination.per_page"
                      :footer-props="{itemsPerPageOptions:[5, 10, 20, 50, 100]}">
            <template v-slot:header.status="{ item }">
                <span class="body-2">Status</span>
            </template>
            <template v-slot:header.definition.name="{ item }">
                <span class="body-2">Name</span>
            </template>
            <template v-slot:header.definition.status.name="{ item }">
                <span class="body-2">Lifecycle</span>
            </template>
            <template v-slot:header.range_end="{ item }">
                <span class="body-2">Target</span>
            </template>
            <template v-slot:header.landing="{ item }">
                <span class="body-2">Landing</span>
            </template>
            <template v-slot:header.history="{ item }">
                <span class="body-2">History</span>
            </template>
            <template v-slot:header.responsible="{ item }">
                <span class="body-2">Responsible</span>
            </template>
            <template v-slot:header.actions="{ item }">
                <span class="body-2">Actions</span>
            </template>

            <template v-slot:item.status="{ item }">
                <template>
                    <v-icon v-if="item.status === 'achieved'" class="mr-2" color="success">mdi-check</v-icon>
                    <v-icon v-if="item.status === 'failed'" class="mr-2" color="error">mdi-close</v-icon>
                    <v-icon v-if="item.status === 'late'" class="mr-2" color="warning">mdi-alert-octagon-outline</v-icon>
                    <v-icon v-if="item.status === 'waiting'" class="mr-2">mdi-timer-sand</v-icon>
                </template>
            </template>
            <template v-slot:item.definition.name="{ item }">
                <v-icon class="mr-2">{{ item.definition._icon }}</v-icon>
                <router-link to="">
                    <a class="font-weight-bold">{{ item.definition.name }}</a>
                </router-link>
            </template>
            <template v-slot:item.definition.status.name="{ item }">
                <span>{{ item.definition.status.name }}</span>
            </template>
            <template v-slot:item.target="{ item }">
                <template v-if="item.type === 'deliverable'">
                    <div>{{ getTime(item.range_end) }}</div>
                    <div v-if="diffInDays(item.range_end) > 0" class="text-caption">in {{ diffInDays(item.range_end) }} days</div>
                    <div v-if="diffInDays(item.range_end) < 0" class="text-caption">{{ Math.abs(diffInDays(item.range_end)) }} days ago</div>
                </template>
                <template v-if="item.type === 'availability'">
                    <div>{{ item.target_percent }}%</div>
                </template>
            </template>
            <template v-slot:item.landing="{ item }">
                <template v-if="item.type === 'deliverable'">
                    <deliverable-sla-summary-svg :sla="getDeliverableSlaLandingObject(item)"></deliverable-sla-summary-svg>
                </template>
                <template v-if="item.type === 'availability'">
                    <availability-sla-summary-svg :sla="getAvailabilitySlaLandingObject(item)"></availability-sla-summary-svg>
                </template>
            </template>
            <template v-slot:item.history="{ item }">
                <template v-if="item.type === 'deliverable'">
                    <deliverable-sla-history-svg :history="getSlaHistoryObject(item)"></deliverable-sla-history-svg>
                </template>
                <template v-if="item.type === 'availability'">
                </template>
            </template>
            <template v-slot:item.responsible="{ item }">
                <span class="font-weight-bold">John Doe</span>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn class="ma-2" icon elevation="0">
                    <v-icon>mdi-bell-ring-outline</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </div>

</template>

<script>
import PaginatedComponent from "@/components/PaginatedComponent";
import DeliverableSlaModel from "@/store/models/Sla/DeliverableSlaModel";
import moment from "moment";
import SlaModel from "@/store/models/Sla/SlaModel";
import AvailabilitySlaModel from "@/store/models/Sla/AvailabilitySlaModel";
import DeliverableSlaHistorySvg from "@/svg/DeliverableSlaHistorySvg";
import DeliverableSlaSummarySvg from "@/svg/DeliverableSlaSummarySvg";
import AvailabilitySlaSummarySvg from "@/svg/AvailabilitySlaSummarySvg";

export default {
    components: {AvailabilitySlaSummarySvg, DeliverableSlaHistorySvg, DeliverableSlaSummarySvg},
    extends: PaginatedComponent,

    props: {
        range_start: null,
        range_end: null
    },

    data () {
        return {
            pagination: {
                current_page: 1,
                last_page: null,
                per_page: 100,
                items: 0,
                total_items: null,
                current_page_item_ids: [],
                sort_by: null,
                sort_direction: 'asc',
                filter: {}
            },
            model: SlaModel,
            models: [ DeliverableSlaModel, AvailabilitySlaModel ],
            relations: [],
            endpoint: 'inRange',
            endpoint_params: [],
            headers: [
                {
                    text: 'Status',
                    align: 'start',
                    sortable: false,
                    value: 'status',
                    width: 50
                },
                {
                    text: 'Name',
                    align: 'start',
                    sortable: true,
                    value: 'definition.name'
                },
                {
                    text: 'Status',
                    align: 'start',
                    sortable: true,
                    value: 'definition.status.name'
                },
                {
                    text: 'Target',
                    sortable: false,
                    value: 'target'
                },
                {
                    text: 'Landing',
                    sortable: false,
                    value: 'landing',
                    width: 300
                },
                {
                    text: 'History',
                    sortable: false,
                    value: 'history',
                    width: 300
                },
                {
                    text: 'Responsible',
                    sortable: true,
                    value: 'responsible'
                },
                {
                    text: 'Actions',
                    sortable: false,
                    value: 'actions',
                    width: 50
                }
            ]
        }
    },

    computed: {
        objects () {
            if (!this.ready_to_load) return null
            let results = []
            this.models.forEach((m) => {
                m.query().whereIdIn(this.pagination.current_page_item_ids)
                    .with(['definition', 'definition.status', 'statistic'])
                    .get().forEach((o) => {
                    results.push(o)
                })
            })

            return results
        },
        rangeStart () {
            return moment(this.$parent.$refs.selector.selectedDate).startOf('day').format()
        },
        rangeEnd () {
            return moment(this.$parent.$refs.selector.selectedDate).endOf('day').format()
        },
        completed () {
            return Math.round(Math.random() * 100)
        },
        success () {
            return Math.round(Math.random() * 100)
        }
    },

    watch: {
        rangeStart () {
            this.updateEndpointParams()
        },
        rangeEnd () {
            this.updateEndpointParams()
        }
    },

    methods: {
        updateEndpointParams () {
            this.endpoint_params = [
                this.rangeStart,
                this.rangeEnd
            ]
        },
        getTime (ts) {
            return moment(ts).format('HH:mm')
        },
        diffInDays (ts) {
            return moment(ts).diff(moment(), 'day')
        },
        getAvailabilitySlaLandingObject (sla) {
            return {
                start: moment(sla.range_start),
                target:  moment(sla.range_end),
                average: sla.statistic ? {
                    lower: sla.statistic.average_duration_minutes_lower,
                    upper: sla.statistic.average_duration_minutes_upper
                } : null,
                achieved: sla.achieved_at ? moment(sla.achieved_at) : null,
                error_margin_minutes: sla.error_margin_minutes
            }
        },
        getDeliverableSlaLandingObject (sla) {
            return {
                start: moment(sla.range_start),
                target:  moment(sla.range_end),
                average: sla.statistic ? {
                    lower: sla.statistic.average_duration_minutes_lower,
                    upper: sla.statistic.average_duration_minutes_upper
                } : null,
                achieved: sla.achieved_at ? moment(sla.achieved_at) : null,
                error_margin_minutes: sla.error_margin_minutes
            }
        },
        getSlaHistoryObject (sla) {
            return sla.statistic?.achievement_history.map((h) => {
                return {
                    sla_id: h.sla_id,
                    status: h.status,
                    start: moment(h.start),
                    target: moment(h.end),
                    achieved_at: moment(h.achieved_at),
                    achieved: h.achieved_percent,
                    error_margin_minutes: h.error_margin_minutes
                }
            })
        }
    },

    created () {
        this.updateEndpointParams()
    }

}
</script>