<template>
    <v-list-item v-if="definition" :to="definition.url">
        <v-list-item-avatar>
            <v-icon>{{ definition.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title v-html="definition.name"></v-list-item-title>
            <v-list-item-subtitle>
                <sla-history-boxes-svg v-if="history" :history="history"></sla-history-boxes-svg>
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>

</template>

<script>
import SlaHistoryBoxesSvg from "@/svg/SlaHistoryBoxesSvg";

export default {
    components: {SlaHistoryBoxesSvg},

    props: {
        definition: Object
    },

    computed: {
        history () {
            if (!this.definition) return
            return this.definition.info?.achievement_history.map((h) => {
                return {
                    sla_definition_id: h.sla_definition_id,
                    day: h.day,
                    status: h.status,
                }
            })
        }
    }
}
</script>