<template>

    <svg version="1.2" height="100%" width="100%">
        <rect x="0" y="calc(50% - 3px)" width="100%" height="6" :fill="'url(#diagonal-hatch-light1)'" />


        <diagonal-hatch></diagonal-hatch>
    </svg>

</template>

<script>
import moment from "moment";
import Svg from "@/svg/Svg";
import DiagonalHatch from "@/svg/DiagonalHatch";

export default {
    components: {DiagonalHatch},
    extends: Svg,

    props: {
        sla: Object,
        dimensions: {
            type: Object,
            default: () => {
                return {
                    strokeWidth: 4
                }
            }
        }
    },

}
</script>