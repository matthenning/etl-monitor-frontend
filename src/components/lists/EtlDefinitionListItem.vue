<template>
    <v-list-item v-if="object" :to="$link('etl', object.entity, object.id)">
        <slot name="prepended-actions"></slot>

        <v-list-item-avatar>
            <v-icon>{{ object._icon }}</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title>
                {{ object.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
                <etl-history-boxes-svg v-if="history" :history="history" :definition="object"></etl-history-boxes-svg>
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>

</template>

<script>
import EtlHistoryBoxesSvg from "@/svg/EtlHistoryBoxesSvg";
import moment from "moment";
import SingleComponent from "@/components/SingleComponent";
import EtlDefinitionModel from "@/store/models/Etl/EtlDefinitionModel";
import AutomicEtlDefinitionModel from "@/store/models/Etl/AutomicEtlDefinitionModel";

export default {
    components: {EtlHistoryBoxesSvg},

    extends: SingleComponent,

    data () {
        return {
            model: EtlDefinitionModel,
            models: [ AutomicEtlDefinitionModel ],
            relations: [ 'statistic' ]
        }
    },

    computed: {
        object () {
            if (this.loading) return []
            if (this.linkedObject && !this.ignore_linked)
                return this.linkedObject

            if(!this.ready_to_load) return null

            let result = null
            this.models.forEach((m) => {
                let r = m.query().with(this.relations).find(this.id)
                if (r) result = r
            })

            return result
        },
        history () {
            if (!this.object) return
            return this.object.statistic?.execution_history?.map((h) => {
                return {
                    day: moment(h.end),
                    status: h.status,
                    anomaly: h.anomaly
                }
            })
        }
    },

    created () {
        this.initial_load_done_hooks.push(() => {
            if (!this.object.statistic) {
                window.console.log('trying again')
                this.ignore_linked = true
                this.loadPage()
            }
        })
    }
}
</script>