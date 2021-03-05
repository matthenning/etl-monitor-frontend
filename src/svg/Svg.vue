<script>
export default {

    computed: {
        color () {
            if (this.$vuetify.theme.dark) {
                return {
                    text: '#ffffff',
                    success: {
                        fill: '#96c8cc',
                        stroke: '#91c3c7',
                    },
                    warning: {
                        fill: '#FFA726',
                        stroke: '#FAA322',
                    },
                    critical: {
                        fill: '#fab9bf',
                        stroke: '#f6b4ba',
                    },
                    default: {
                        fill: '#C0C0C0',
                        stroke: '#BCBCBC'
                    },
                    light1: {
                        fill: '#959595',
                        stroke: '#B9B9B9'
                    },
                    light2: {
                        fill: '#C8C8C8',
                        stroke: '#C3C3C3'
                    }
                }
            } else {
                return {
                    text: '#7c7c7c',
                    success: {
                        fill: '#96c8cc',
                        stroke: '#91c3c7',
                    },
                    warning: {
                        fill: '#FFA726',
                        stroke: '#FAA322',
                    },
                    critical: {
                        fill: '#fab9bf',
                        stroke: '#f6b4ba',
                    },
                    default: {
                        fill: '#C0C0C0',
                        stroke: '#BCBCBC'
                    },
                    light1: {
                        fill: '#D5D5D5',
                        stroke: '#C9C9C9'
                    },
                    light2: {
                        fill: '#F8F8F8',
                        stroke: '#F3F3F3'
                    }
                }

            }
        }
    }

}
</script>