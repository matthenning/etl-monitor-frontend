<template>

    <div>
        <v-row>
            <v-col>
                <span class="text-h5">SLA Rules</span>
            </v-col>
        </v-row>

        <template v-if="object && object.rules && object.rules.etls">
            <v-row>
                <v-col>
                    <span class="font-weight-bold">ETL Completion</span>
                    <ul>
                       <li v-for="etl in object.rules.etls" :key="etl">
                           <router-link :to="etl.id">{{ etl.etl_id }}</router-link>
                       </li>
                    </ul>
                </v-col>
            </v-row>
        </template>
    </div>

</template>

<script>
import SingleComponent from "@/components/SingleComponent";
import DeliverableSlaDefinitionModel from "@/store/models/Sla/DeliverableSlaDefinitionModel";

export default {

    extends: SingleComponent,

    data () {
        return {
            model: DeliverableSlaDefinitionModel
        }
    }

}
</script>