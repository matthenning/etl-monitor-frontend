<template>

    <div>
        <v-row>
            <v-col>
                <span class="text-h5">Depends on / Predecessors</span>

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
                                <etl-dependency-tree :initial-id="object.id"></etl-dependency-tree>
                            </v-card-text>
                        </v-container>
                    </v-card>
                </v-dialog>
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
import EtlDependencyTree from "@/components/lists/EtlDependencyTree";

export default {
    components: {EtlDependencyTree, EtlDefinitionListItem},
    extends: SingleComponent,

    data () {
        return {
            dialog_tree_view: false,
            model: AutomicEtlDefinitionModel,
            relations: [ 'statistic', 'depends_on.statistic' ]
        }
    },

    methods: {
        toggleTreeView () {
            this.dialog_tree_view = !this.dialog_tree_view
        }
    }

}
</script>