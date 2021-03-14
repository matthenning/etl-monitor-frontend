<template>

    <v-autocomplete
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        no-filter
        item-text="name"
        class="mx-4"
        flat
        hide-no-data
        hide-details
        label="Search"
        solo-inverted
        prepend-inner-icon="mdi-magnify"
        :menu-props="{maxHeight: 500}">
        <template v-slot:item="data">
            <template>
                <sla-definition-search-list-item v-if="data.item.group.endsWith('_sla_definitions')" :result="data.item"></sla-definition-search-list-item>
                <etl-definition-search-list-item v-else-if="data.item.group.endsWith('_etl_definitions')" :result="data.item"></etl-definition-search-list-item>
                <div v-else><span class="subtitle-2">{{ data.item.name }}</span></div>
            </template>
        </template>
    </v-autocomplete>

</template>

<script>
import GlobalSearch from "@/util/custom_fetchers/GlobalSearch";
import models from "@/store/models";
import SlaDefinitionSearchListItem from "@/components/lists/SlaDefinitionSearchListItem";
import entities from "@/store/entities";
import EtlDefinitionSearchListItem from "@/components/lists/EtlDefinitionSearchListItem";

export default {
    components: {EtlDefinitionSearchListItem, SlaDefinitionSearchListItem},

    data () {
        return {
            loading: false,
            items: [],
            search: null,
            select: null,
        }
    },

    watch: {
        search (text) {
            text && text !== this.select && this.autocomplete(text)
        }
    },

    methods: {
        fillResults (results) {
            this.items = []
            Object.keys(results.data).forEach((k, i) => {
                this.items.push({ header: entities.hasOwnProperty(k) ? entities[k] : k })

                results.data[k].forEach((r) => {
                    this.items.push({
                        id: r.id,
                        name: r.name,
                        info: r.info,
                        model: r.model,
                        entity: r.entity,
                        url: models[r.model + 'Model'].view('show', r.id),
                        icon: r.icon,
                        group: k
                    })
                })

                if (Object.keys(results.data).length - 1 < i) this.items.push({ divider: true })
            })

            this.loading = false
        },
        autocomplete (text) {
            this.loading = true
            GlobalSearch.fetch(text, this.fillResults)
        }
    }

}
</script>