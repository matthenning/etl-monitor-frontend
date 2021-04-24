<template>

    <div :class="depth > 0 ? 'pl-12' : ''">

        <v-row>
            <v-col>
                <etl-definition-list-item v-if="object" :id="id" :linked-object="object">
                    <template v-slot:prepended-actions>
                        <v-list-item-action>
                            <v-btn icon v-on:click="expand" :disabled="expanding">
                                <v-icon v-if="!expanded">mdi-chevron-down</v-icon>
                                <v-icon v-else>mdi-chevron-up</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </template>
                </etl-definition-list-item>
            </v-col>
        </v-row>

        <v-row v-if="expanded && depends_on && depends_on.length > 0">
            <v-col>
                <v-row>
                    <v-col>
                        <span class="subtitle-2 ml-10">Depends on:</span>
                    </v-col>
                </v-row>

                <etl-dependency-tree-item v-for="(c, i) in depends_on" :key="c.id"
                                          :depth="depth + 1" :id="c.id" :linked-object="c">
                </etl-dependency-tree-item>
            </v-col>
        </v-row>
    </div>

</template>

<script>
import PassiveSingleComponent from "@/components/PassiveSingleComponent";
import EtlDefinitionModel from "@/store/models/Etl/EtlDefinitionModel";
import EtlDefinitionListItem from "@/components/lists/EtlDefinitionListItem";
import AutomicEtlDefinitionModel from "@/store/models/Etl/AutomicEtlDefinitionModel";

export default {
    components: {
        EtlDefinitionListItem,
        EtlDependencyTreeItem: () => import('./EtlDependencyTreeItem')
    },

    extends: PassiveSingleComponent,

    props: {
        depth: {
            type: Number,
            default: 0
        }
    },

    data () {
        return {
            model: EtlDefinitionModel,
            models: [ AutomicEtlDefinitionModel ],
            relations: [ 'statistic' ],
            depends_on_ids: [],
            expanding: false,
            expanded: false
        }
    },

    computed: {
        depends_on () {
            return this.models.map((m) => m.getQueryWithAllRelations().whereIdIn(this.depends_on_ids).get()).flat(1) ?? []
        }
    },

    methods: {
        expand () {
            if (this.expanded) this.expanded = false
            else {
                this.expanding = true
                this.$parent.$emit('ExpandTreeView', this.id)
            }
        }
    },

    created () {
        this.$on('ExpandTreeView', (id) => {
            this.expanding = true
            this.$parent.$emit('ExpandTreeView', id) // Pass Until we reach EtlDependencyTree component
        })

        this.$parent.$on('ExpandTreeView', (id) => {
            this.expanding = true // Make sure expanding is propagated to every component
        })

        this.$parent.$on('TreeViewExpanded', (depends_on, loading_dependents_for) => {
            this.expanding = false
            if (this.id === loading_dependents_for) {
                this.depends_on_ids = depends_on
                this.expanded = true
            }

            this.$emit('TreeViewExpanded', depends_on, loading_dependents_for)
        })
    }

}
</script>