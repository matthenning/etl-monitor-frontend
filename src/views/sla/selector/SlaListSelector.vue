<template>
    <v-toolbar flat class="container-aligned">
        <span class="text-h6 font-weight-light">SLA List</span>

        <v-spacer></v-spacer>

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

        <v-btn outlined color="primary" class="toolbar-btn ml-1" @click="refresh">Refresh</v-btn>
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
                moment().subtract(4, 'week').format('YYYY-MM-DD'),
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