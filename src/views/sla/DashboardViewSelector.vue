<template>
    <v-toolbar flat class="container-aligned">
        <span class="body-2">View</span>
        <v-btn-toggle class="toolbar-btn-toggle ml-2" v-model="activeView">
            <v-btn outlined value="feed" :to="route('sla', 'dashboard', 'feed')">
                <v-icon left>mdi-sort-calendar-ascending</v-icon>
                <span class="hidden-sm-and-down">Feed</span>
            </v-btn>

            <v-btn outlined value="daily" :to="route('sla', 'dashboard', 'daily')">
                <v-icon left>mdi-calendar-today</v-icon>
                <span class="hidden-sm-and-down">Daily</span>
            </v-btn>

            <v-btn outlined value="weekly" :to="route('sla', 'dashboard', 'custom')">
                <v-icon left>mdi-calendar-week</v-icon>
                <span class="hidden-sm-and-down">Custom</span>
            </v-btn>
        </v-btn-toggle>

        <template v-if="view === 'daily'">
            <v-menu
                v-model="datePickerActive"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="selectedDate"
                        label="Pick a day"
                        prepend-inner-icon="mdi-calendar"
                        class="shrink ml-2"
                        outlined
                        dense
                        hide-details single-line
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    <span class="body-2 ml-6">Filter</span>
                </template>
                <v-date-picker v-model="selectedDate" no-title scrollable
                               @input="datePickerActive = false">
                </v-date-picker>
            </v-menu>

            <v-dialog v-model="customizeFilterDialogActive" width="500">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn-toggle class="toolbar-btn-toggle ml-2" v-model="customizeFilterDialogActive">
                        <v-btn :value="true" outlined v-bind="attrs" v-on="on">
                            <v-icon left>mdi-filter-outline</v-icon>
                            <span class="hidden-sm-and-down">Customize Filter</span>
                        </v-btn>
                    </v-btn-toggle>
                </template>

                <v-card>
                    <v-card-title class="headline">Customize Filter</v-card-title>

                    <v-card-text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="customizeFilterDialogActive = false">Apply</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-spacer></v-spacer>

            <v-btn outlined color="success" class="toolbar-btn" @click="$parent.$emit('ComponentRefresh')">Refresh</v-btn>
        </template>
    </v-toolbar>
</template>

<script>
import Linker from "@/mixins/Linker";
import moment from "moment";

export default {

    mixins: [ Linker ],

    props: {
        view: String
    },

    data () {
        return {
            datePickerActive: false,
            customizeFilterDialogActive: false,
            activeView: null,
            selectedDate: moment().format('YYYY-MM-DD')
        }
    },

    mounted () {
        this.activeView = this.view
    }

}
</script>