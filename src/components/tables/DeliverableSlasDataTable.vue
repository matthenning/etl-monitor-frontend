<template>
    <v-skeleton-loader v-if="!objects" transition="fade-transitions" height="400" type="table">
    </v-skeleton-loader>
    <v-card v-else outlined>
        <error-alert v-if="error" :error="error"></error-alert>

        <v-card-title>
            Habitats
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                :append-icon="search_exact ? 'mdi-target' : 'mdi-approximately-equal'"
                label="Search"
                single-line
                hide-details
                @keydown.enter="updateSearch"
                @click:append="toggleExact"></v-text-field>
        </v-card-title>

        <v-data-table
                show-expand
                :single-expand="false"
                :expanded.sync="expanded"
                item-key="id"
                :loading="loading"
                :headers="headers"
                :items="objects"
                :items-per-page.sync="pagination.per_page"
                :server-items-length="pagination.total_items"
                :search="search"
                @update:page="updatePage"
                @update:sort-by="updateSortBy"
                @update:sort-desc="updateSortDesc"
                @update:items-per-page="updatePage">
            <template v-slot:item.icon="{ item }">
                <v-icon class="my-3">{{ item._icon }}</v-icon>
            </template>
            <template v-slot:item.name="{ item }">
                <router-link :to="model.view('show', item)">{{ item.name }}</router-link>
            </template>
            <template v-slot:item.animals="{ item }">
                <div class="mb-1">
                    <animal-inline v-for="animal in item.animals" :key="animal.id" :id="animal.id"> </animal-inline>
                </div>
            </template>
            <template v-slot:item._monitor="{ item }">
                <div class="mb-1" v-if="item._monitor">
                    <monitor-sparkline-inline v-for="(monitor, index) in Object.keys(item._monitor)" :key="index"
                                              v-bind:data="item._monitor[monitor]" :monitor="item._monitor[monitor]">
                    </monitor-sparkline-inline>
                </div>
            </template>
            <template v-slot:expanded-item="{ item }" style="box-shadow: none">
                <td colspan="7" class="ma-0 pa-0" v-if="item.animals.length > 0">
                    <v-simple-table class="custom--expanded-table">
                        <tbody>

                        </tbody>
                    </v-simple-table>
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    import DataTable from "./DataTable"
    import ErrorAlert from "../misc/ErrorAlert"
    import AnimalInline from "@/components/inline/AnimalInline";
    import HabitatModel from "@/store/models/Core/HabitatModel";
    import MonitorSparklineInline from "@/components/inline/MonitorSparklineInline";

    export default {

        extends: DataTable,

        components: {
            MonitorSparklineInline,
            HabitatModel,
            ErrorAlert, AnimalInline
        },

        data () {
            return {
                model: HabitatModel,
                expanded: [],
                headers_default: [
                    {
                        text: '',
                        value: 'icon',
                        width: 40,
                        sortable: false,
                        filterable: false
                    },
                    {
                        text: 'Name', //@TODO: Translate
                        value: 'name',
                    },
                    {
                        text: 'Monitoring', //@TODO: Translate
                        value: '_monitor',
                        sortable: false
                    },
                    {
                        text: 'Animals', //@TODO: Translate
                        value: 'animals',
                        sortable: false,
                        filterable: true
                    },
                    { text: '', value: 'data-table-expand' },
                ]
            }
        }

    }

</script>
