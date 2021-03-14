<template>

    <automic-etl-definition-details :id="id"></automic-etl-definition-details>

</template>

<script>
import ShowView from "@/views/show/ShowView";
import DeliverableSlaDefinitionDetails from "@/components/details/DeliverableSlaDefinitionDetails";
import AutomicEtlDefinitionDetails from "@/components/details/AutomicEtlDefinitionDetails";
import AutomicEtlDefinitionModel from "@/store/models/Etl/AutomicEtlDefinitionModel";

export default {
    components: {AutomicEtlDefinitionDetails, DeliverableSlaDefinitionDetails},
    extends: ShowView,

    computed: {
        object () {
            return AutomicEtlDefinitionModel.find(this.id)
        },
    }

}
</script>