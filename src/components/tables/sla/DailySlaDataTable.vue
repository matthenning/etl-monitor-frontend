<template>

    <v-container fluid>

        <v-data-table v-if="objects"
                      class="sla-dashboard-data-table"
                      :loading="loading"
                      loading-text="Loading..."
                      :headers="headers"
                      :items="objects"
                      :footer-props="{itemsPerPageOptions:[5, 10, 20, 50, 100]}">
            <template v-slot:header.status="{ item }">
                <span class="body-2">Status</span>
            </template>
            <template v-slot:header.definition.name="{ item }">
                <span class="body-2">Name</span>
            </template>
            <template v-slot:header.definition.lifecycle.name="{ item }">
                <span class="body-2">Lifecycle</span>
            </template>
            <template v-slot:header.target="{ item }">
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
                <router-link :to="item.definition._show">
                    <a class="font-weight-bold">{{ item.definition.name }}</a>
                </router-link>
            </template>
            <template v-slot:item.definition.lifecycle.name="{ item }">
                <span>{{ item.definition.lifecycle.name }}</span>
            </template>
            <template v-slot:item.target="{ item }">
                <achievement-pie :sla="item"></achievement-pie>
            </template>
            <template v-slot:item.landing="{ item }">
                <template v-if="item.type === 'deliverable'">
                    <deliverable-sla-summary-svg :sla="item.sla_landing"></deliverable-sla-summary-svg>
                </template>
                <template v-if="item.type === 'availability'">
                    <availability-sla-summary-svg :sla="item.sla_landing"></availability-sla-summary-svg>
                </template>
            </template>
            <template v-slot:item.history="{ item }">
                <template v-if="item.type === 'deliverable'">
                    <deliverable-sla-history-svg :history="item.sla_history"></deliverable-sla-history-svg>
                </template>
                <template v-if="item.type === 'availability'">
                    <availability-sla-history-svg :history="item.sla_history"></availability-sla-history-svg>
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
    </v-container>

</template>

<script>
import PaginatedComponent from "@/components/PaginatedComponent";
import DeliverableSlaModel from "@/store/models/Sla/DeliverableSlaModel";
import moment from "moment";
import SlaModel from "@/store/models/Sla/SlaModel";
import AvailabilitySlaModel from "@/store/models/Sla/AvailabilitySlaModel";
import AchievementPie from "@/svg/AchievementPie";
import AvailabilitySlaSummarySvg from "@/svg/AvailabilitySlaSummarySvg";
import DeliverableSlaHistorySvg from "@/svg/DeliverableSlaHistorySvg";
import DeliverableSlaSummarySvg from "@/svg/DeliverableSlaSummarySvg";
import AvailabilitySlaHistorySvg from "@/svg/AvailabilitySlaHistorySvg";

export default {
    components: {
        AchievementPie,
        AvailabilitySlaSummarySvg,
        DeliverableSlaHistorySvg,
        DeliverableSlaSummarySvg,
        AvailabilitySlaHistorySvg
    },

    extends: PaginatedComponent,

    props: {
        range_start: null,
        range_end: null
    },

    data () {
        return {
            pagination: {
                paginate: false
            },
            model: SlaModel,
            models: [ DeliverableSlaModel, AvailabilitySlaModel ],
            relations: [],
            endpoint: 'inRange',
            endpoint_params: [],
            headers: [
                {
                    text: 'Status',
                    align: 'center',
                    sortable: true,
                    value: 'status',
                    width: 100
                },
                {
                    text: 'Name',
                    align: 'start',
                    sortable: true,
                    value: 'definition.name'
                },
                {
                    text: 'Lifecycle',
                    align: 'start',
                    sortable: true,
                    value: 'definition.lifecycle.name'
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
            if (this.loading) return []
            if (!this.ready_to_load) return null
            let results = []
            this.models.forEach((m) => {
                m.query().whereIdIn(this.pagination.current_page_item_ids)
                    .with(['definition', 'definition.lifecycle', 'statistic'])
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
        }
    },

    created () {
        this.updateEndpointParams()
    }

}
</script>