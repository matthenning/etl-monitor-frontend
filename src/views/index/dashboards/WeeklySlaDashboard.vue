<template>

    <div>
        <v-row>
            <v-col>
                <span class="text-sm-h3 font-weight-light">SLA Dashboard</span>
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

        <weekly-sla-data-table></weekly-sla-data-table>

    </div>

</template>

<script>
import Dashboard from "@/views/index/dashboards/Dashboard";
import WeeklySlaDataTable from "@/components/tables/sla/WeeklySlaDataTable";

export default {

    components: {
        WeeklySlaDataTable
    },

    extends: Dashboard
}
</script>