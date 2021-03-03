<script>
import View from "../View"

export default {
    extends: View,

    data () {
        return {
        }
    },

    computed: {
        object () {
            return null //Implemented on children
        },
        id () {
            return parseInt(this.$route.params.id)
        }
    },

    watch: {
        object (value) {
            if (this.object !== null) this.setTitle(this.object.name)
        }
    },

    mounted () {
        if (this.object !== null) this.setTitle(this.object.name)
        else this.setTitle('...')
    },

}
</script>
