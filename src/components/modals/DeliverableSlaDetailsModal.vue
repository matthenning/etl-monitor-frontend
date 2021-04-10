<template>
    <v-dialog v-model="modal" width="1200px" persistent>
        <v-card v-if="object">
            <v-card-title>
                <span class="headline">{{ object.definition.name }}</span>
            </v-card-title>
            <v-card-text>
                <automic-etl-executions :executions="executions" v-if="executions.length > 0"></automic-etl-executions>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="close()">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import SingleComponent from "@/components/SingleComponent";
import DeliverableSlaModel from "@/store/models/Sla/DeliverableSlaModel";
import ModelFactory from "@/store/models/ModelFactory";
import models from "@/store/models";
import AutomicEtlExecutions from "@/svg/AutomicEtlExecutions";
import AutomicEtlExecutionModel from "@/store/models/Etl/AutomicEtlExecutionModel";

export default {

    extends: SingleComponent,

    components: {
        AutomicEtlExecutions
    },

    data () {
        return {
            model: DeliverableSlaModel,
            modal: false,
            execution_ids: []
        }
    },

    computed: {
        executions () {
            return AutomicEtlExecutionModel.query().whereIdIn(this.execution_ids).get()
        }
    },

    methods: {
        slaLoaded () {
            this.loadExecutions()
        },
        loadPage () {
            if (!this.id) return
            ModelFactory.fetch(this.model, this.id, this.slaLoaded, null, this.relations, this.endpoint, this.endpoint_params)
        },
        executionsLoaded (e) {
            this.execution_ids = []
            e.data.map((r) => r.id).forEach((r) => {
                this.execution_ids.push(r)
            })
        },
        loadExecutions () {
            let t = {}
            if (!this.object || !this.object.achievement_conditions) return
            this.object.achievement_conditions.forEach((c) => {
                if (!t[c.condition_model]) t[c.condition_model] = []
                t[c.condition_model].push(c.condition_id)
            })

            Object.keys(t).forEach((k) => {
                ModelFactory.fetchMultiple(models[k + 'Model'], t[k], this.executionsLoaded)
            })
        },
        show () {
            this.modal = true
        },
        close () {
            this.modal = false
            this.execution_ids = []
            this.$emit('close')
        }
    },

    created () {
        this.$parent.$on('ShowSlaDetails', this.show)
    }

}
</script>