<template>
    <v-list-item v-if="definition" :to="$link('sla', result.entity, definition.id)">
        <v-list-item-avatar>
            <v-icon>{{ result.icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>
                {{ definition.name }}

                <span class="ml-2" v-for="tag in definition.tags">
                    <span class="caption">{{ tag.name }}</span>
                </span>
            </v-list-item-title>
            <v-list-item-subtitle>
                <sla-history-boxes-svg v-if="history" :history="history" :definition="definition"></sla-history-boxes-svg>
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>

</template>

<script>
import SlaHistoryBoxesSvg from "@/svg/SlaHistoryBoxesSvg";
import moment from "moment";

export default {
    components: {SlaHistoryBoxesSvg},

    props: {
        result: Object
    },

    computed: {
        definition () {
            return this.result?.info?.definition
        },
        history () {
            if (!this.result) return
            return this.result.info?.statistic?.achievement_history?.map((h) => {
                return {
                    day: moment(h.day),
                    status: h.status,
                }
            })
        }
    }
}
</script>