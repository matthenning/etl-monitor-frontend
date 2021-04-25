<template>

    <div>
        <v-row>
            <v-col>
                <span class="text-h6 font-weight-light">SLA Timeranges</span>
            </v-col>
        </v-row>

        <template v-if="object && object.daily_timeranges">
            <v-row>
                <v-col>
                    <span class="font-weight-light">Daily</span>
                    <sla-daily-timerange-svg :timeranges="object.daily_timeranges"></sla-daily-timerange-svg>
                </v-col>
            </v-row>
        </template>

        <template v-if="object && object.weekly_timeranges">
            <v-row>
                <v-col>
                    <span class="font-weight-light">Weekly</span>
                </v-col>
            </v-row>
        </template>
    </div>

</template>

<script>
import SingleComponent from "@/components/SingleComponent";
import DeliverableSlaDefinitionModel from "@/store/models/Sla/DeliverableSlaDefinitionModel";
import SlaDailyTimerangeSvg from "@/svg/SlaDailyTimerangeSvg";

export default {
    components: {
        SlaDailyTimerangeSvg
    },

    extends: SingleComponent,

    data () {
        return {
            model: DeliverableSlaDefinitionModel,
            relations: [ 'daily_timeranges', 'weekly_timeranges' ]
        }
    }

}
</script>