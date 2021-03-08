<template>

    <v-container fluid>
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
                      :loading="loading"
                      loading-text="Loading..."
                      :headers="headers"
                      :items="objects"
                      :items-per-page.sync="pagination.per_page"
                      :footer-props="{itemsPerPageOptions:[5, 10, 20, 50, 100]}">
            <template v-slot:header.definition.name="{ item }">
                <span class="body-2">Name</span>
            </template>
            <template v-slot:header.lifecycle="{ item }">
                <span class="body-2">Lifecycle</span>
            </template>
            <template v-slot:header.monday="{ item }">
                <span class="body-2">Monday</span>
            </template>
            <template v-slot:header.tuesday="{ item }">
                <span class="body-2">Tuesday</span>
            </template>
            <template v-slot:header.wednesday="{ item }">
                <span class="body-2">Wednesday</span>
            </template>
            <template v-slot:header.thursday="{ item }">
                <span class="body-2">Thursday</span>
            </template>
            <template v-slot:header.friday="{ item }">
                <span class="body-2">Friday</span>
            </template>
            <template v-slot:header.saturday="{ item }">
                <span class="body-2">Saturday</span>
            </template>
            <template v-slot:header.sunday="{ item }">
                <span class="body-2">Sunday</span>
            </template>
            <template v-slot:header.responsible="{ item }">
                <span class="body-2">Responsible</span>
            </template>
            <template v-slot:header.actions="{ item }">
                <span class="body-2">Actions</span>
            </template>

            <template v-slot:item.definition.name="{ item }">
                <v-icon class="mr-2">{{ item.definition._icon }}</v-icon>
                <router-link to="">
                    <a class="font-weight-bold">{{ item.definition.name }}</a>
                </router-link>
            </template>
            <template v-slot:item.lifecycle="{ item }">
                <span>{{ item.definition.status.name }}</span>
            </template>

            <template v-slot:item.monday="{ item }">
                <achievement-pie v-if="item[1]" :sla="getAchievementPieObject(item[1])"></achievement-pie>
            </template>
            <template v-slot:item.tuesday="{ item }">
                <achievement-pie v-if="item[2]" :sla="getAchievementPieObject(item[2])"></achievement-pie>
            </template>
            <template v-slot:item.wednesday="{ item }">
                <achievement-pie v-if="item[3]" :sla="getAchievementPieObject(item[3])"></achievement-pie>
            </template>
            <template v-slot:item.thursday="{ item }">
                <achievement-pie v-if="item[4]" :sla="getAchievementPieObject(item[4])"></achievement-pie>
            </template>
            <template v-slot:item.friday="{ item }">
                <achievement-pie v-if="item[5]" :sla="getAchievementPieObject(item[5])"></achievement-pie>
            </template>
            <template v-slot:item.saturday="{ item }">
                <achievement-pie v-if="item[6]" :sla="getAchievementPieObject(item[6])"></achievement-pie>
            </template>
            <template v-slot:item.sunday="{ item }">
                <achievement-pie v-if="item[7]" :sla="getAchievementPieObject(item[7])"></achievement-pie>
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
import DeliverableSlaHistorySvg from "@/svg/DeliverableSlaHistorySvg";
import DeliverableSlaSummarySvg from "@/svg/DeliverableSlaSummarySvg";
import AvailabilitySlaSummarySvg from "@/svg/AvailabilitySlaSummarySvg";
import AvailabilitySlaHistorySvg from "@/svg/AvailabilitySlaHistorySvg";
import AchievementPie from "@/svg/AchievementPie";

export default {
    components: {
        AchievementPie,
        AvailabilitySlaSummarySvg, DeliverableSlaHistorySvg, DeliverableSlaSummarySvg, AvailabilitySlaHistorySvg},
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
                    text: 'Name',
                    align: 'start',
                    sortable: true,
                    value: 'definition.name'
                },
                {
                    text: 'Lifecycle',
                    align: 'lifecycle',
                    sortable: true,
                    value: 'lifecycle'
                },
                {
                    text: 'Monday',
                    sortable: false,
                    value: 'monday'
                },
                {
                    text: 'Tuesday',
                    sortable: false,
                    value: 'tuesday'
                },
                {
                    text: 'Wednesday',
                    sortable: false,
                    value: 'wednesday'
                },
                {
                    text: 'Thursday',
                    sortable: false,
                    value: 'thursday'
                },
                {
                    text: 'Friday',
                    sortable: false,
                    value: 'friday'
                },
                {
                    text: 'Saturday',
                    sortable: false,
                    value: 'saturday'
                },
                {
                    text: 'Sunday',
                    sortable: false,
                    value: 'sunday'
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
            let results = {}
            this.models.forEach((m) => {
                m.query().whereIdIn(this.pagination.current_page_item_ids)
                    .with(['definition', 'definition.status', 'statistic'])
                    .get().forEach((o) => {
                        if (!results[o.definition.id]) {
                            results[o.definition.id] = {}
                            results[o.definition.id].definition = o.definition
                        }
                        results[o.definition.id][moment(o.range_end).isoWeekday()] = o
                    })
            })

            let defs = []
            Object.keys(results).forEach((r) => defs.push(results[r]))
            return defs
        },
        rangeStart () {
            return moment(this.$parent.$refs.selector.selectedWeek).startOf('week').add(1, 'day').format()
        },
        rangeEnd () {
            return moment(this.$parent.$refs.selector.selectedWeek).endOf('week').add(1, 'day').format()
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
        getAchievementPieObject (sla) {
            return {
                status: sla.status,
                target: sla.target_percent,
                achieved_progress_percent: sla.achieved_progress_percent
            }
        }
    },

    created () {
        this.updateEndpointParams()
    }

}
</script>