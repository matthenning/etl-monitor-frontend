<template>
    <v-toolbar flat class="container-aligned">
        <span class="text-h5">ETL Execution List</span>

        <template>
            <v-menu
                v-model="datePickerActive"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="selectedDates.join(' - ')"
                        label="Pick a range"
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
                <v-date-picker v-model="selectedDates" no-title scrollable
                               :first-day-of-week="1"
                               range>
                </v-date-picker>
            </v-menu>
        </template>

        <v-spacer></v-spacer>

        <v-btn outlined color="success" class="toolbar-btn" @click="refresh">Refresh</v-btn>
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
            selectedDates: [
                moment().subtract(1, 'week').format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD')
            ]
        }
    },

    methods: {
        refresh () {
            this.datePickerActive = false
            this.$nextTick(() => this.$parent.$emit('ComponentRefresh'))
        }
    },

    mounted () {
        this.activeView = this.view
    }

}
</script>