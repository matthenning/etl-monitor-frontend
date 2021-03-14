<template>

    <availability-sla-definition-details :id="id"></availability-sla-definition-details>

</template>

<script>
import ShowView from "@/views/show/ShowView";
import AvailabilitySlaDefinitionDetails from "@/components/details/AvailabilitySlaDefinitionDetails";
import AvailabilitySlaDefinitionModel from "@/store/models/Sla/AvailabilitySlaDefinitionModel";

export default {
    components: {AvailabilitySlaDefinitionDetails},
    extends: ShowView,

    computed: {
        object () {
            return AvailabilitySlaDefinitionModel.getQueryWithAllRelations().find(this.id)
        },
    }

}
</script>