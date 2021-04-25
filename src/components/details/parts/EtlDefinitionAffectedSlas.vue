<template>

    <div>
        <v-row>
            <v-col>
                <span class="text-h6 font-weight-light">Affected SLAs</span>

                <v-dialog v-model="dialog_tree_view" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <template v-slot:activator="{ on, attrs }">
                        <span class="float-right">
                            <v-btn outlined class="mr-1" v-bind="attrs" v-on="on">Tree View</v-btn>
                        </span>
                    </template>
                    <v-card>
                        <v-toolbar color="primary">
                            <v-btn icon @click="dialog_tree_view = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar>

                        <v-container fluid>
                            <v-card-text>
                            </v-card-text>
                        </v-container>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>

        <template v-if="object && object.affected_slas && object.affected_slas.length > 0">
            <v-row>
                <v-col>
                    <sla-definition-list-item v-for="sla in object.affected_slas" :key="sla.id" :id="sla.id" :linked-object="sla"></sla-definition-list-item>
                </v-col>
            </v-row>
        </template>
    </div>

</template>

<script>
import SingleComponent from "@/components/SingleComponent";
import EtlDefinitionListItem from "@/components/lists/EtlDefinitionListItem";
import AutomicEtlDefinitionModel from "@/store/models/Etl/AutomicEtlDefinitionModel";
import EtlDependencyTree from "@/components/lists/EtlDependencyTree";
import DeliverableSlaDefinition from "@/views/show/DeliverableSlaDefinition";
import SlaDefinitionListItem from "@/components/lists/SlaDefinitionListItem";

export default {
    components: {SlaDefinitionListItem, DeliverableSlaDefinition, EtlDependencyTree, EtlDefinitionListItem},
    extends: SingleComponent,

    data () {
        return {
            dialog_tree_view: false,
            model: AutomicEtlDefinitionModel,
            relations: [ 'statistic', 'affected_slas' ]
        }
    },

    methods: {
        toggleTreeView () {
            this.dialog_tree_view = !this.dialog_tree_view
        }
    }

}
</script>