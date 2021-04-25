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
                    <span class="subtitle-2 font-weight-light">Automic ETL Definition</span>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-divider></v-divider>
            </v-col>
        </v-row>

        <v-row>
            <v-col v-if="object && object.depends_on && object.depends_on.length > 0"
                   xs="12" sm="12" md="12" lg="6" xl="6">
                <automic-etl-definition-dependson :id="id" :linked-object="object"></automic-etl-definition-dependson>
            </v-col>
            <v-col xs="12" sm="12" md="12" lg="6" xl="6">
                <etl-definition-affected-slas :id="id" :linked-object="object"></etl-definition-affected-slas>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-divider></v-divider>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <etl-execution-list-selector ref="selector"></etl-execution-list-selector>
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
import AutomicEtlDefinitionDependson from "@/components/details/parts/AutomicEtlDefinitionDependson";
import EtlDefinitionAffectedSlas from "@/components/details/parts/EtlDefinitionAffectedSlas";

export default {
    components: {
        EtlDefinitionAffectedSlas,
        AutomicEtlDefinitionDependson,
        AutomicEtlDefinitionExecutionsChart, SlaListSelector, EtlExecutionListSelector},
    extends: SingleComponent,

    data () {
        return {
            model: AutomicEtlDefinitionModel,
            relations: [ 'depends_on', 'affected_slas' ]
        }
    }

}
</script>