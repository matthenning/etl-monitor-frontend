<script>
export default {

    data () {
        return {
            svg_id: null
        }
    },

    computed: {
        color () {
            if (this.$vuetify.theme.dark) {
                return {
                    text: '#ffffff',
                    success: {
                        hint: '#E0F2F1',
                        fill: '#B2DFDB',
                        stroke: '#80CBC4',
                    },
                    warning: {
                        hint: '#FFF3E0',
                        fill: '#FFE0B2',
                        stroke: '#FFCC80',
                    },
                    critical: {
                        hint: '#FFEBEE',
                        fill: '#FFCDD2',
                        stroke: '#EF9A9A',
                    },
                    default: {
                        hint: '#e2e2e2',
                        fill: '#C0C0C0',
                        stroke: '#BCBCBC'
                    },
                    light1: {
                        hint: '#cdcdcd',
                        fill: '#959595',
                        stroke: '#B9B9B9'
                    },
                    light2: {
                        hint: '#ffffff',
                        fill: '#C8C8C8',
                        stroke: '#C3C3C3'
                    },
                    anomaly: {
                        hint: '#ba87d9',
                        fill: '#9d41d0',
                        stroke: '#8616cf'
                    }
                }
            } else {
                return {
                    text: '#7c7c7c',
                    success: {
                        hint: '#E0F2F1',
                        fill: '#B2DFDB',
                        stroke: '#80CBC4',
                    },
                    warning: {
                        hint: '#FFF3E0',
                        fill: '#FFE0B2',
                        stroke: '#FFCC80',
                    },
                    critical: {
                        hint: '#FFEBEE',
                        fill: '#FFCDD2',
                        stroke: '#EF9A9A',
                    },
                    default: {
                        hint: '#e2e2e2',
                        fill: '#C0C0C0',
                        stroke: '#BCBCBC'
                    },
                    light1: {
                        hint: '#cdcdcd',
                        fill: '#D5D5D5',
                        stroke: '#C9C9C9'
                    },
                    light2: {
                        hint: '#ffffff',
                        fill: '#F8F8F8',
                        stroke: '#F3F3F3'
                    },
                    anomaly: {
                        hint: '#ba87d9',
                        fill: '#9d41d0',
                        stroke: '#8616cf'
                    }
                }

            }
        }
    },

    created () {
        this.svg_id = 'svg-' + Math.random().toString(36).substring(7);
    }

}
</script>