<template>

    <div>
        <etl-dependency-tree-item :id="initialId" :linked-object="initialObject"></etl-dependency-tree-item>
    </div>

</template>

<script>
import PaginatedComponent from "@/components/PaginatedComponent";
import EtlDefinitionModel from "@/store/models/Etl/EtlDefinitionModel";
import EtlDependencyTreeItem from "@/components/lists/EtlDependencyTreeItem";
import AutomicEtlDefinitionModel from "@/store/models/Etl/AutomicEtlDefinitionModel";

export default {
    components: {EtlDependencyTreeItem},
    extends: PaginatedComponent,

    props: {
        initialId: {
            type: Number,
            default: 0
        }
    },

    data () {
        return {
            model: EtlDefinitionModel,
            models: [ AutomicEtlDefinitionModel ],
            pagination: {
                paginate: false
            },
            relations: [ 'statistic' ],
            last_loaded_ids: [],
            loading_dependents_for: null
        }
    },

    computed: {
        initialObject () {
            let hits = this.models.map((m) => m.find(this.initialId))
            if (hits.length > 0) return hits[0]
            return null
        }
    },

    methods: {
        receivedPaginatedItemsCallback(response, ids) {
            this.last_loaded_ids = ids
            this.pagination.current_page_item_ids = this.pagination.current_page_item_ids.concat(ids)
            this.clearLoadingError()
            this.callUpdateCallbacks()
            this.initialDone()
            this.loading = false
        }
    },

    created () {
        this.pushUpdateCallback(() => {
            this.$emit('TreeViewExpanded', this.last_loaded_ids, this.loading_dependents_for)
        })
        this.pagination.filter = {
            id: this.initialId
        }

        this.$on('ExpandTreeView', (id) => {
            this.loading_dependents_for = id
            this.endpoint = 'depends_on'
            this.endpoint_params = [ id ]
            this.pagination.filter = {}
            this.loadPage()
        })
    }

}
</script>