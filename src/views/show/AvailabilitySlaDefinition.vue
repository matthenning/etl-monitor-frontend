<template>

    <div>

        <availability-sla-definition-details :id="id"></availability-sla-definition-details>

    </div>

</template>

<script>
import ShowView from "@/views/show/ShowView";
import AvailabilitySlaDefinitionModel from "@/store/models/Sla/AvailabilitySlaDefinitionModel";
import AvailabilitySlaDefinitionDetails from "@/components/details/AvailabilitySlaDefinitionDetails";

export default {
    components: {
        AvailabilitySlaDefinitionDetails
    },

    extends: ShowView,

    computed: {
        object () {
            return AvailabilitySlaDefinitionModel.find(this.id)
        },
    }

}
</script>