<template>

    <div class="container">

        <div class="row">
            <div class="col col-12">
                <dashboard-view-selector view="feed"></dashboard-view-selector>
            </div>
        </div>

        <div class="row">
            Feed
        </div>

    </div>

</template>

<script>
import Dashboard from "@/views/index/dashboards/Dashboard";

export default {
    extends: Dashboard
}
</script>