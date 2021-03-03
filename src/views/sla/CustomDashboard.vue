<template>

    <div class="container">

        <div class="row">
            <div class="col col-12">
                <dashboard-view-selector view="custom"></dashboard-view-selector>
            </div>
        </div>

        <div class="row">
            Custom
        </div>

    </div>

</template>

<script>
import Dashboard from "@/views/sla/Dashboard";

export default {
    extends: Dashboard
}
</script>