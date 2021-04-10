<template>

    <div>

        <deliverable-sla-definition-details :id="id"></deliverable-sla-definition-details>

    </div>

</template>

<script>
import ShowView from "@/views/show/ShowView";
import DeliverableSlaDefinitionModel from "@/store/models/Sla/DeliverableSlaDefinitionModel";
import DeliverableSlaDefinitionDetails from "@/components/details/DeliverableSlaDefinitionDetails";

export default {
    components: {
        DeliverableSlaDefinitionDetails
    },

    extends: ShowView,

    computed: {
        object () {
            return DeliverableSlaDefinitionModel.find(this.id)
        },
    }

}
</script>