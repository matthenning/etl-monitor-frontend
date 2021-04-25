<template>

    <div>
        <v-row>
            <v-col>
                <span class="text-h6 font-weight-light">SLA Rules</span>
            </v-col>
        </v-row>

        <template v-if="object && object.rules && object.rules.etls">
            <v-row>
                <v-col>
                    <span class="font-weight-light">ETL Completion</span>
                    <etl-definition-list-item v-for="etl in object.rules.etls" :key="etl.id" :id="etl.id"></etl-definition-list-item>
                </v-col>
            </v-row>
        </template>
    </div>

</template>

<script>
import SingleComponent from "@/components/SingleComponent";
import DeliverableSlaDefinitionModel from "@/store/models/Sla/DeliverableSlaDefinitionModel";
import EtlDefinitionListItem from "@/components/lists/EtlDefinitionListItem";

export default {
    components: {EtlDefinitionListItem},
    extends: SingleComponent,

    data () {
        return {
            model: DeliverableSlaDefinitionModel
        }
    }

}
</script>