<template>

    <div>
        <v-row>
            <v-col>
                <div>
                    <span class="text-sm-h5 font-weight-light">
                        <template v-if="object">{{ object.name }}</template>
                        <template v-else>...</template>
                    </span>
                    <span class="float-right" v-if="object">
                        <v-btn outlined class="mr-1">Edit</v-btn>
                        <v-btn outlined color="red">Delete</v-btn>
                    </span>
                </div>
                <div>
                    <span class="subtitle-2 font-weight-light">Deliverable SLA Definition</span>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-divider></v-divider>
            </v-col>
        </v-row>

        <v-row>
            <v-col xs="12" sm="12" md="12" lg="6" xl="6">
                <deliverable-sla-rules :id="id" :linked-object="object"></deliverable-sla-rules>
            </v-col>
            <v-col xs="12" sm="12" md="12" lg="6" xl="6">
                <deliverable-sla-timeranges :id="id" :linked-object="object"></deliverable-sla-timeranges>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-divider></v-divider>
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

        <deliverable-sla-definition-sla-data-table v-if="object" :definition-id="object.id"></deliverable-sla-definition-sla-data-table>

    </div>

</template>

<script>
import SingleComponent from "@/components/SingleComponent";
import SlaListSelector from "@/views/sla/selector/SlaListSelector";
import DeliverableSlaDefinitionSlaDataTable from "@/components/tables/sla/DeliverableSlaDefinitionSlaDataTable";
import DeliverableSlaDefinitionModel from "@/store/models/Sla/DeliverableSlaDefinitionModel";
import DeliverableSlaRules from "@/components/details/parts/DeliverableSlaRules";
import DeliverableSlaTimeranges from "@/components/details/parts/DeliverableSlaTimeranges";

export default {
    components: {SlaListSelector, DeliverableSlaDefinitionSlaDataTable, DeliverableSlaRules, DeliverableSlaTimeranges},
    extends: SingleComponent,

    data () {
        return {
            relations: [],
            model: DeliverableSlaDefinitionModel
        }
    }

}
</script>