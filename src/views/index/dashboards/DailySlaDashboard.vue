<template>

    <div>
        <v-row>
            <v-col>
                <span class="text-sm-h3 font-weight-light">SLA Dashboard</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <dashboard-view-selector ref="selector" view="daily"></dashboard-view-selector>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-divider></v-divider>
            </v-col>
        </v-row>

        <daily-sla-data-table></daily-sla-data-table>

    </div>

</template>

<script>
import Dashboard from "@/views/index/dashboards/Dashboard";
import DailySlaDataTable from "@/components/tables/sla/DailySlaDataTable";

export default {

    components: {
        DailySlaDataTable
    },

    extends: Dashboard
}
</script>