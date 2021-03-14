<template>

    <v-container fluid>
        Beautiful chart maaan
    </v-container>

</template>

<script>
import moment from "moment";
import PaginatedComponent from "@/components/PaginatedComponent";
import AutomicEtlExecutionModel from "@/store/models/Etl/AutomicEtlExecutionModel";

export default {

    extends: PaginatedComponent,

    props: {
        definitionId: Number
    },

    data () {
        return {
            model: AutomicEtlExecutionModel,
            endpoint: 'inRange',
            endpoint_params: [],
        }
    },

    computed: {
        rangeStart () {
            return moment(this.$parent.$refs.selector.selectedDates[0]).startOf('isoWeek').format()
        },
        rangeEnd () {
            return moment(this.$parent.$refs.selector.selectedDates[1]).endOf('isoWeek').format()
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
        this.pagination.filter = {
            etl_definition_id: this.definitionId
        }
        this.updateEndpointParams()
    },

}
</script>