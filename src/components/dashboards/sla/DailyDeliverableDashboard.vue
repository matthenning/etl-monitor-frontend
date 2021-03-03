<template>

    <div>
        <template v-if="objects">
            <div class="row" v-for="object in objects" :key="object.id">
                {{ object.definition.name }}
            </div>
        </template>

    </div>

</template>

<script>
import PaginatedComponent from "@/components/PaginatedComponent";
import DeliverableSlaModel from "@/store/models/Sla/DeliverableSlaModel";
import moment from "moment";

export default {

    extends: PaginatedComponent,

    props: {
        range_start: null,
        range_end: null
    },

    data () {
        return {
            model: DeliverableSlaModel,
            relations: [ 'definition' ],
            endpoint: 'inRange',
            endpoint_params: []
        }
    },

    computed: {
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
        }
    },

    created () {
        this.pagination.per_page = 20
        this.updateEndpointParams()
    }

}
</script>