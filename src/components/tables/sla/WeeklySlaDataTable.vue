<template>

    <v-container fluid class="pa-0">
        <v-data-table v-if="slas"
                      class="sla-dashboard-data-table"
                      :loading="loading"
                      loading-text="Loading..."
                      :headers="headers"
                      :items="slas"
                      :footer-props="{itemsPerPageOptions:[5, 10, 20, 50, ]}">
            <template v-slot:header.definition.name="{ item }">
                <span class="body-2">&nbsp;</span><br />
                <span class="body-2">Name</span>
            </template>
            <template v-slot:header.monday="{ item }">
                <span class="body-2">{{ textDay(1) }}</span><br />
                <span class="body-2">Monday</span>
            </template>
            <template v-slot:header.tuesday="{ item }">
                <span class="body-2">{{ textDay(2) }}</span><br />
                <span class="body-2">Tuesday</span>
            </template>
            <template v-slot:header.wednesday="{ item }">
                <span class="body-2">{{ textDay(3) }}</span><br />
                <span class="body-2">Wednesday</span>
            </template>
            <template v-slot:header.thursday="{ item }">
                <span class="body-2">{{ textDay(4) }}</span><br />
                <span class="body-2">Thursday</span>
            </template>
            <template v-slot:header.friday="{ item }">
                <span class="body-2">{{ textDay(5) }}</span><br />
                <span class="body-2">Friday</span>
            </template>
            <template v-slot:header.saturday="{ item }">
                <span class="body-2">{{ textDay(6) }}</span><br />
                <span class="body-2">Saturday</span>
            </template>
            <template v-slot:header.sunday="{ item }">
                <span class="body-2">{{ textDay(7) }}</span><br />
                <span class="body-2">Sunday</span>
            </template>
            <template v-slot:header.actions="{ item }">
                <span class="body-2">&nbsp;</span><br />
                <span class="body-2">Actions</span>
            </template>

            <template v-slot:item.definition.name="{ item }">
                <v-icon class="mr-2">{{ item.definition._icon }}</v-icon>
                <router-link :to="item.definition._show">
                    <a class="font-weight-bold">{{ item.definition.name }}</a>
                </router-link>
            </template>

            <template v-slot:item.monday="{ item }">
                <achievement-pie v-if="item[1]" :sla="item[1]"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(item, 1)"></timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(item, 1)"></timerange-weekly-exists>
            </template>
            <template v-slot:item.tuesday="{ item }">
                <achievement-pie v-if="item[2]" :sla="item[2]"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(item, 2)"></timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(item, 2)"></timerange-weekly-exists>
            </template>
            <template v-slot:item.wednesday="{ item }">
                <achievement-pie v-if="item[3]" :sla="item[3]"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(item, 3)"></timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(item, 3)"></timerange-weekly-exists>
            </template>
            <template v-slot:item.thursday="{ item }">
                <achievement-pie v-if="item[4]" :sla="item[4]"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(item, 4)"></timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(item, 4)"></timerange-weekly-exists>
            </template>
            <template v-slot:item.friday="{ item }">
                <achievement-pie v-if="item[5]" :sla="item[5]"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(item, 5)"></timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(item, 5)"></timerange-weekly-exists>
            </template>
            <template v-slot:item.saturday="{ item }">
                <achievement-pie v-if="item[6]" :sla="item[6]"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(item, 6)"></timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(item, 6)"></timerange-weekly-exists>
            </template>
            <template v-slot:item.sunday="{ item }">
                <achievement-pie v-if="item[7]" :sla="item[7]"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(item, 7)"></timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(item, 7)"></timerange-weekly-exists>
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
import moment from "moment";
import DeliverableSlaHistorySvg from "@/svg/DeliverableSlaHistorySvg";
import DeliverableSlaSummarySvg from "@/svg/DeliverableSlaSummarySvg";
import AvailabilitySlaSummarySvg from "@/svg/AvailabilitySlaSummarySvg";
import AvailabilitySlaHistorySvg from "@/svg/AvailabilitySlaHistorySvg";
import AchievementPie from "@/svg/AchievementPie";
import TimerangeWeeklyStart from "@/svg/TimerangeWeeklyStart";
import TimerangeWeeklyExists from "@/svg/TimerangeWeeklyExists";
import AvailabilitySlaDefinitionModel from "@/store/models/Sla/AvailabilitySlaDefinitionModel";
import DeliverableSlaDefinitionModel from "@/store/models/Sla/DeliverableSlaDefinitionModel";
import SlaDefinitionModel from "@/store/models/Sla/SlaDefinitionModel";
import DataTable from "@/components/tables/DataTable";

export default {

    components: {
        TimerangeWeeklyExists,
        TimerangeWeeklyStart,
        AchievementPie,
        AvailabilitySlaSummarySvg,
        DeliverableSlaHistorySvg,
        DeliverableSlaSummarySvg,
        AvailabilitySlaHistorySvg
    },

    extends: DataTable,

    props: {
        range_start: null,
        range_end: null
    },

    data () {
        return {
            pagination: {
                paginate: false
            },
            model: SlaDefinitionModel,
            store_model: [ DeliverableSlaDefinitionModel, AvailabilitySlaDefinitionModel ],
            relations: [ 'lifecycle' ],
            store_relations: [ 'lifecycle', 'slas' ],
            endpoint: 'inRange',
            endpoint_params: [],
            slas: [],
            headers_default: [
                {
                    text: 'Name',
                    align: 'start',
                    class: 'px-3',
                    cellClass: 'px-3',
                    sortable: true,
                    value: 'definition.name',
                    width: 500
                },
                {
                    text: 'Monday',
                    align: 'center',
                    class: 'px-3',
                    cellClass: 'px-0',
                    sortable: false,
                    value: 'monday',
                    width: 100
                },
                {
                    text: 'Tuesday',
                    align: 'center',
                    class: 'px-3',
                    cellClass: 'px-0',
                    sortable: false,
                    value: 'tuesday',
                    width: 100
                },
                {
                    text: 'Wednesday',
                    align: 'center',
                    class: 'px-3',
                    cellClass: 'px-0',
                    sortable: false,
                    value: 'wednesday',
                    width: 100
                },
                {
                    text: 'Thursday',
                    align: 'center',
                    class: 'px-3',
                    cellClass: 'px-0',
                    sortable: false,
                    value: 'thursday',
                    width: 100
                },
                {
                    text: 'Friday',
                    align: 'center',
                    class: 'px-3',
                    cellClass: 'px-0',
                    sortable: false,
                    value: 'friday',
                    width: 100
                },
                {
                    text: 'Saturday',
                    align: 'center',
                    class: 'px-3',
                    cellClass: 'px-0',
                    sortable: false,
                    value: 'saturday',
                    width: 100
                },
                {
                    text: 'Sunday',
                    align: 'center',
                    class: 'px-3',
                    cellClass: 'px-0',
                    sortable: false,
                    value: 'sunday',
                    width: 100
                },
                {
                    text: 'Actions',
                    class: 'px-3',
                    cellClass: 'px-3',
                    sortable: false,
                    value: 'actions',
                    width: 50
                }
            ]
        }
    },

    computed: {
        rangeStart () {
            return moment(this.$parent.$refs.selector.selectedWeek).startOf('isoWeek')
        },
        rangeEnd () {
            return moment(this.$parent.$refs.selector.selectedWeek).endOf('isoWeek')
        }
    },

    watch: {
        objects () {
            this.updateSlas()
        },
        rangeStart () {
            this.updateEndpointParams()
        },
        rangeEnd () {
            this.updateEndpointParams()
        }
    },

    methods: {
        updateSlas () {
            let slas = []
            this.objects.forEach((d) => {
                let entry = { definition: d }
                d.slas.filter((sla) => this.isSlaInRange(sla)).forEach((sla) => {
                    entry[moment(sla.range_end).format('E')] = sla
                })
                slas.push(entry)
            })

            this.slas = slas
        },
        isSlaInRange (sla) {
            let s = moment(sla.range_start)
            if (s.isBefore(this.rangeEnd) && s.isAfter(this.rangeStart)) return true
            let e = moment(sla.range_end)
            if (e.isBefore(this.rangeEnd) && e.isAfter(this.rangeStart)) return true

            return false
        },
        updateEndpointParams () {
            this.endpoint_params = [
                this.rangeStart.format(),
                this.rangeEnd.format()
            ]
        },
        getTime (ts) {
            return moment(ts).format('HH:mm')
        },
        diffInDays (ts) {
            return moment(ts).diff(moment(), 'day')
        },
        weeklyStartsOnDay (slas, dayOfWeek) {
            let sla_k = Object.keys(slas).filter((k) => k !== 'definition')[0],
                sla = slas[sla_k]
            if (!sla) return false
            if (sla.timerange_type !== 'weekly') return
            let day = moment(this.rangeStart).add(dayOfWeek - 1, 'day')
            return moment(sla.range_start).isSame(day, 'day')
        },
        weeklyExistsOnDay (slas, dayOfWeek) {
            let sla_k = Object.keys(slas).filter((k) => k !== 'definition')[0],
                sla = slas[sla_k]
            if (!sla) return false
            if (sla.timerange_type !== 'weekly') return
            let day = moment(this.rangeStart).add(dayOfWeek - 1, 'day')
            return day.isBetween(moment(sla.range_start).startOf('day'), moment(sla.range_end).endOf('day'))
        },
        textDay (dayOfWeek) {
            return moment(this.rangeStart).add(dayOfWeek - 1, 'day').format('YYYY-MM-DD')
        }
    },

    created () {
        this.updateEndpointParams()
    }

}
</script>