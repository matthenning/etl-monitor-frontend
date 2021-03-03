<script>
import DashboardViewSelector from "@/views/sla/DashboardViewSelector";
export default {

    components: {
        DashboardViewSelector
    },

    data () {
        return {
            dataLoading: false,
        }
    },

    methods: {
        loadData () {
            this.dataLoading = true
        }
    }

}
</script>