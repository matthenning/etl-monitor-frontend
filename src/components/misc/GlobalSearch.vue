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
        prepend-inner-icon="mdi-magnify">
        <template v-slot:item="data">
            <template>
                <v-list-item :to="data.item.url">
                    <v-list-item-avatar>
                        <v-icon>{{ data.item.icon }}</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title v-html="data.item.name"></v-list-item-title>
                        <v-list-item-subtitle v-html="data.item.info"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </template>
    </v-autocomplete>

</template>

<script>
import GlobalSearch from "@/util/custom_fetchers/GlobalSearch";
import models from "@/store/models";

export default {

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
            Object.keys(results.data).forEach((k) => {
                this.items.push({ header: k })

                results.data[k].forEach((r) => {
                    this.items.push({
                        id: r.id,
                        name: r.name,
                        info: r.info,
                        url: models[r.model + 'Model'].view('show', r.id),
                        icon: r.icon,
                        group: k
                    })
                })

                this.items.push({ divider: true })
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