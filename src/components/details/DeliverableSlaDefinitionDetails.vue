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
                    <span class="subtitle-1">Deliverable SLA Definition</span>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-divider></v-divider>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <deliverable-sla-rules :id="id" :linked-object="object"></deliverable-sla-rules>
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

export default {
    components: {SlaListSelector, DeliverableSlaDefinitionSlaDataTable, DeliverableSlaRules},
    extends: SingleComponent,

    data () {
        return {
            relations: [],
            model: DeliverableSlaDefinitionModel
        }
    }

}
</script>