<template>

    <div>
        <v-row>
            <v-col>
                <div>
                    <span class="text-sm-h3 font-weight-light">
                        <template v-if="object">{{ object.name }}</template>
                        <template v-else>...</template>
                    </span>
                    <span class="float-right" v-if="object">
                        <v-btn outlined class="mr-1">Edit</v-btn>
                        <v-btn outlined color="red">Delete</v-btn>
                    </span>
                </div>
                <div>
                    <span class="subtitle-1">Availability SLA Definition</span>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <sla-list-selector ref="selector"></sla-list-selector>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-divider></v-divider>
            </v-col>
        </v-row>

        <availability-sla-definition-sla-data-table v-if="object" :definition-id="object.id"></availability-sla-definition-sla-data-table>

    </div>

</template>

<script>
import SingleComponent from "@/components/SingleComponent";
import SlaListSelector from "@/views/show/SlaListSelector";
import AvailabilitySlaDefinitionSlaDataTable from "@/components/tables/AvailabilitySlaDefinitionSlaDataTable";
import AvailabilitySlaDefinitionModel from "@/store/models/Sla/AvailabilitySlaDefinitionModel";

export default {
    components: {SlaListSelector, AvailabilitySlaDefinitionSlaDataTable},
    extends: SingleComponent,

    data () {
        return {
            model: AvailabilitySlaDefinitionModel
        }
    }

}
</script>