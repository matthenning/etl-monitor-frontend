<template>
    <svg>
        <pattern id="diagonal-hatch-success" patternUnits="userSpaceOnUse" width="4" height="4">
            <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" :stroke="color.success.fill" stroke-width="1" />
        </pattern>

        <pattern id="diagonal-hatch-warning" patternUnits="userSpaceOnUse" width="4" height="4">
            <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" :stroke="color.warning.fill" stroke-width="1" />
        </pattern>

        <pattern id="diagonal-hatch-critical" patternUnits="userSpaceOnUse" width="4" height="4">
            <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" :stroke="color.critical.fill" stroke-width="1" />
        </pattern>

        <pattern id="diagonal-hatch-default" patternUnits="userSpaceOnUse" width="4" height="4">
            <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" :stroke="color.default.fill" stroke-width="1" />
        </pattern>
    </svg>
</template>

<script>

import Svg from "@/svg/Svg";

export default {
    extends: Svg,

    props: {
        stroke: String,
    }
}

</script>