<template>

    <v-container fluid>
        <v-data-table v-if="slas"
                      class="sla-dashboard-data-table"
                      :loading="loading"
                      loading-text="Loading..."
                      :headers="headers"
                      :items="Object.keys(slas)"
                      disable-pagination>
            <template v-slot:header.week="{ item }">
                <span class="body-2">Week</span>
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

            <template v-slot:item.week="{ item }">
                {{ textWeekOfYear(slas[item]) }}
            </template>
            <template v-slot:item.monday="{ item }">
                <achievement-pie v-if="slas[item][1]" :sla="getAchievementPieObject(slas[item][1])"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(slas[item], 1)"></timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(slas[item], 1)"></timerange-weekly-exists>
            </template>
            <template v-slot:item.tuesday="{ item }">
                <achievement-pie v-if="slas[item][2]" :sla="getAchievementPieObject(slas[item][2])"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(slas[item], 2)"></timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(slas[item], 2)"></timerange-weekly-exists>
            </template>
            <template v-slot:item.wednesday="{ item }">
                <achievement-pie v-if="slas[item][3]" :sla="getAchievementPieObject(slas[item][3])"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(slas[item], 3)"></timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(slas[item], 3)"></timerange-weekly-exists>
            </template>
            <template v-slot:item.thursday="{ item }">
                <achievement-pie v-if="slas[item][4]" :sla="getAchievementPieObject(slas[item][4])"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(slas[item], 4)"></timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(slas[item], 4)"></timerange-weekly-exists>
            </template>
            <template v-slot:item.friday="{ item }">
                <achievement-pie v-if="slas[item][5]" :sla="getAchievementPieObject(slas[item][5])"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(slas[item], 5)"></timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(slas[item], 5)"></timerange-weekly-exists>
            </template>
            <template v-slot:item.saturday="{ item }">
                <achievement-pie v-if="slas[item][6]" :sla="getAchievementPieObject(slas[item][6])"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(slas[item], 6)"></timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(slas[item], 6)"></timerange-weekly-exists>
            </template>
            <template v-slot:item.sunday="{ item }">
                <achievement-pie v-if="slas[item][7]" :sla="getAchievementPieObject(slas[item][7])"></achievement-pie>
                <timerange-weekly-start v-else-if="weeklyStartsOnDay(slas[item], 7)"></timerange-weekly-start>
                <timerange-weekly-exists v-else-if="weeklyExistsOnDay(slas[item], 7)"></timerange-weekly-exists>
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
import moment from "moment";
import TimerangeWeeklyExists from "@/svg/TimerangeWeeklyExists";
import TimerangeWeeklyStart from "@/svg/TimerangeWeeklyStart";
import AchievementPie from "@/svg/AchievementPie";
import AvailabilitySlaSummarySvg from "@/svg/AvailabilitySlaSummarySvg";
import AvailabilitySlaHistorySvg from "@/svg/AvailabilitySlaHistorySvg";
import AvailabilitySlaDefinitionModel from "@/store/models/Sla/AvailabilitySlaDefinitionModel";
import SlaModel from "@/store/models/Sla/SlaModel";
import AvailabilitySlaModel from "@/store/models/Sla/AvailabilitySlaModel";
import PaginatedComponent from "@/components/PaginatedComponent";
import GroupSlaByDefinitionAndWeek from "@/services/GroupSlaByDefinitionAndWeek";

export default {

    extends: PaginatedComponent,

    components: {
        TimerangeWeeklyExists,
        TimerangeWeeklyStart,
        AchievementPie,
        AvailabilitySlaSummarySvg,
        AvailabilitySlaHistorySvg
    },

    props: {
        definitionId: Number
    },

    data () {
        return {
            pagination: {
                paginate: false
            },
            model: SlaModel,
            store_model: AvailabilitySlaModel,
            endpoint: 'inRange',
            endpoint_params: [],
            relations: [],
            filters: [],
            slas: [],
            headers: [
                {
                    text: 'Week',
                    align: 'start',
                    sortable: true,
                    value: 'week'
                },
                {
                    text: 'Monday',
                    align: 'center',
                    cellClass: 'pr-0',
                    sortable: false,
                    value: 'monday',
                    width: 120
                },
                {
                    text: 'Tuesday',
                    align: 'center',
                    cellClass: 'pr-0',
                    sortable: false,
                    value: 'tuesday',
                    width: 120
                },
                {
                    text: 'Wednesday',
                    align: 'center',
                    cellClass: 'pr-0',
                    sortable: false,
                    value: 'wednesday',
                    width: 120
                },
                {
                    text: 'Thursday',
                    align: 'center',
                    cellClass: 'pr-0',
                    sortable: false,
                    value: 'thursday',
                    width: 120
                },
                {
                    text: 'Friday',
                    align: 'center',
                    cellClass: 'pr-0',
                    sortable: false,
                    value: 'friday',
                    width: 120
                },
                {
                    text: 'Saturday',
                    align: 'center',
                    cellClass: 'pr-0',
                    sortable: false,
                    value: 'saturday',
                    width: 120
                },
                {
                    text: 'Sunday',
                    align: 'center',
                    sortable: false,
                    value: 'sunday',
                    width: 120
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
        definition () {
            return AvailabilitySlaDefinitionModel.find(this.definitionId)
        },
        rangeStart () {
            return moment(this.$parent.$refs.selector.selectedDates[0]).startOf('isoWeek').format()
        },
        rangeEnd () {
            return moment(this.$parent.$refs.selector.selectedDates[1]).endOf('isoWeek').format()
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
            this.slas = GroupSlaByDefinitionAndWeek(this.objects)[this.definitionId]
        },
        isSlaInRange (sla) {
            let s = moment(sla.range_start)
            if (s.isBefore(this.rangeEnd) && s.isAfter(this.rangeStart)) return true
            let e = moment(sla.range_end)
            if (e.isBefore(this.rangeEnd) && e.isAfter(this.rangeStart)) return true

            return false
        },
        textWeekOfYear (week) {
            let sla_k = Object.keys(week).filter((k) => k !== 'meta')[0],
                sla = week[sla_k]
            if (!sla) return
            return moment(sla.range_start).format('YYYY / W')
        },
        textWeekOfYearStart (week) {
            let sla_k = Object.keys(week).filter((k) => k !== 'meta')[0],
                sla = week[sla_k]
            if (!sla) return
            return moment(sla.range_start).startOf('week').format('YYYY-MM-DD')
        },
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
                start: sla.range_start,
                target: sla.target_percent,
                achieved_progress_percent: sla.achieved_progress_percent,
                achieved_at: sla.achieved_at
            }
        },
        weeklyStartsOnDay (week, dayOfWeek) {
            let sla_k = Object.keys(week).filter((k) => k !== 'meta')[0],
                sla = week[sla_k]
            if (!sla || sla.timerange_type !== 'weekly') return
            let day = moment(week.meta.weekStart).add(dayOfWeek - 1, 'day')
            return moment(sla.range_start).isSame(day, 'day')
        },
        weeklyExistsOnDay (week, dayOfWeek) {
            let sla_k = Object.keys(week).filter((k) => k !== 'meta')[0],
                sla = week[sla_k]
            if (!sla || sla.timerange_type !== 'weekly') return
            let day = moment(week.meta.weekStart).add(dayOfWeek - 1, 'day')
            return day.isBetween(moment(sla.range_start).startOf('day'), moment(sla.range_end).endOf('day'))
        },
        updateFilter () {
            this.pagination.filter = {
                sla_definition_id: this.definitionId
            }
        }
    },

    created () {
        this.updateFilter()
        this.updateEndpointParams()
    },

}
</script>