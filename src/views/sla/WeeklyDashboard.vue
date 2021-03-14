<template>

    <div>
        <v-row>
            <v-col>
                <span class="text-sm-h3 font-weight-light">SLA Dashboard</span>
                <v-divider vertical class="mx-8"></v-divider>
                <span class="text-sm-h3">
                    <v-btn outlined large class="mb-3" color="accent">Load Collection</v-btn>
                </span>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <dashboard-view-selector ref="selector" view="weekly"></dashboard-view-selector>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-divider></v-divider>
            </v-col>
        </v-row>

        <weekly-dashboard></weekly-dashboard>

    </div>

</template>

<script>
import Dashboard from "@/views/sla/Dashboard";
import WeeklyDashboard from "@/components/dashboards/sla/WeeklyDashboard";
import DeliverableSlaDefinitionModel from "@/store/models/Sla/DeliverableSlaDefinitionModel";

export default {

    components: {
        WeeklyDashboard
    },

    extends: Dashboard
}
</script>