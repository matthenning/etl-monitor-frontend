<template>
    <v-list-item v-if="definition" :to="$link('etl', result.entity, definition.id)">
        <v-list-item-avatar>
            <v-icon>{{ result.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title v-html="definition.name"></v-list-item-title>
            <v-list-item-subtitle>
                <etl-history-boxes-svg v-if="history" :history="history" :definition="definition"></etl-history-boxes-svg>
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>

</template>

<script>
import EtlHistoryBoxesSvg from "@/svg/EtlHistoryBoxesSvg";
import moment from "moment";

export default {
    components: {EtlHistoryBoxesSvg},

    props: {
        result: Object
    },

    computed: {
        definition () {
            return this.result?.info?.definition
        },
        history () {
            if (!this.result) return
            return this.result.info?.statistic?.execution_history?.map((h) => {
                return {
                    day: moment(h.end),
                    status: h.status,
                }
            })
        }
    }
}
</script>