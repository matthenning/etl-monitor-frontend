<template>

    <div class="container">

        <div class="row">
            <div class="col col-12">
                <span class="text-sm-h3 font-weight-light">SLA Dashboard</span>
                <v-divider vertical class="mx-8"></v-divider>
                <span class="text-sm-h3">
                    <v-btn outlined large class="mb-3" color="accent">Load Collection</v-btn>
                </span>
            </div>
            <div class="col col-12">
                <dashboard-view-selector ref="selector" view="daily"></dashboard-view-selector>
            </div>
        </div>

        <div class="row">
            <div class="col col-12">
                <v-divider></v-divider>
            </div>
        </div>

        <daily-deliverable-dashboard></daily-deliverable-dashboard>

    </div>

</template>

<script>
import Dashboard from "@/views/sla/Dashboard";
import DailyDeliverableDashboard from "@/components/dashboards/sla/DailyDeliverableDashboard";

export default {

    components: {
        DailyDeliverableDashboard
    },

    extends: Dashboard
}
</script>