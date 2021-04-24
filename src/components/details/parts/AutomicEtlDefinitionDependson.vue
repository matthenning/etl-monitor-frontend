<template>

    <div>
        <v-row>
            <v-col>
                <span class="text-h5">Depends on / Predecessors</span>
            </v-col>
        </v-row>

        <template v-if="object && object.depends_on && object.depends_on.length > 0">
            <v-row>
                <v-col>
                    <etl-definition-list-item v-for="etl in object.depends_on" :key="etl.id" :id="etl.id"></etl-definition-list-item>
                </v-col>
            </v-row>
        </template>
    </div>

</template>

<script>
import SingleComponent from "@/components/SingleComponent";
import EtlDefinitionListItem from "@/components/lists/EtlDefinitionListItem";
import AutomicEtlDefinitionModel from "@/store/models/Etl/AutomicEtlDefinitionModel";

export default {
    components: {EtlDefinitionListItem},
    extends: SingleComponent,

    data () {
        return {
            model: AutomicEtlDefinitionModel
        }
    }

}
</script>