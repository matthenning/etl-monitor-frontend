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
                    <span class="subtitle-1">Automic ETL Definition</span>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <etl-execution-list-selector ref="selector"></etl-execution-list-selector>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-divider></v-divider>
            </v-col>
        </v-row>

        <automic-etl-definition-executions-chart v-if="object" :etl-id="object.etl_id"></automic-etl-definition-executions-chart>

    </div>

</template>

<script>
import SingleComponent from "@/components/SingleComponent";
import SlaListSelector from "@/views/sla/selector/SlaListSelector";
import AutomicEtlDefinitionModel from "@/store/models/Etl/AutomicEtlDefinitionModel";
import AutomicEtlDefinitionExecutionsChart from "@/components/charts/AutomicEtlDefinitionExecutionsChart";
import EtlExecutionListSelector from "@/views/show/EtlExecutionListSelector";

export default {
    components: {AutomicEtlDefinitionExecutionsChart, SlaListSelector, EtlExecutionListSelector},
    extends: SingleComponent,

    data () {
        return {
            model: AutomicEtlDefinitionModel
        }
    }

}
</script>