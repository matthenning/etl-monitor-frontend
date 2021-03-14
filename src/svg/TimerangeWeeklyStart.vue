<template>

    <svg version="1.2" height="100%" width="100%">
        <rect x="50%" y="25%" height="50%" width="2" :fill="this.color.light1.fill" />
        <rect x="calc(50% + 2px)" y="calc(50% - 3px)" width="calc(50% - 2px)" height="6" :fill="'url(#diagonal-hatch-light1)'" />


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