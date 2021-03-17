<template>

    <v-container fluid>
        <automic-etl-execution-history :executions="objects"></automic-etl-execution-history>
    </v-container>

</template>

<script>
import PaginatedComponent from "@/components/PaginatedComponent";
import AutomicEtlExecutionModel from "@/store/models/Etl/AutomicEtlExecutionModel";
import moment from "moment";
import AutomicEtlExecutionHistory from "@/svg/AutomicEtlExecutionHistory";

export default {
    components: {AutomicEtlExecutionHistory},
    extends: PaginatedComponent,

    props: {
        etlId: String
    },

    data () {
        return {
            pagination: {
                paginate: false
            },
            model: AutomicEtlExecutionModel,
            relations: [],
            endpoint: 'inRange',
            endpoint_params: [],
        }
    },

    computed: {
        rangeStart () {
            return moment(this.$parent.$refs.selector.selectedDates[0]).startOf('day').format()
        },
        rangeEnd () {
            return moment(this.$parent.$refs.selector.selectedDates[1]).endOf('day').format()
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
        }
    },

    created () {
        this.pagination.filter = {
            etl_id: this.etlId
        }
        this.updateEndpointParams()
    },

}
</script>