<template>
    <v-list-item v-if="object" :to="$link('sla', object._entity, object.id)">
        <v-list-item-avatar>
            <v-icon>{{ object._icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>
                {{ object.name }}

                <span class="ml-2" v-for="tag in object.tags">
                    <span class="caption">{{ tag.name }}</span>
                </span>
            </v-list-item-title>
            <v-list-item-subtitle>
                <sla-history-boxes-svg v-if="history" :history="history" :definition="object"></sla-history-boxes-svg>
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>

</template>

<script>
import SlaHistoryBoxesSvg from "@/svg/SlaHistoryBoxesSvg";
import moment from "moment";
import SingleComponent from "@/components/SingleComponent";
import SlaDefinitionModel from "@/store/models/Sla/SlaDefinitionModel";
import AvailabilitySlaDefinitionModel from "@/store/models/Sla/AvailabilitySlaDefinitionModel";
import DeliverableSlaDefinitionModel from "@/store/models/Sla/DeliverableSlaDefinitionModel";

export default {
    components: {SlaHistoryBoxesSvg},

    extends: SingleComponent,

    data () {
        return {
            model: SlaDefinitionModel,
            models: [ AvailabilitySlaDefinitionModel, DeliverableSlaDefinitionModel ],
            relations: [ 'statistic', 'tags' ]
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
            return this.object.statistic?.achievement_history?.map((h) => {
                return {
                    day: moment(h.day),
                    status: h.status,
                }
            })
        }
    }
}
</script>