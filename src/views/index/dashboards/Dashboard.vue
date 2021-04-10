<script>
import DashboardViewSelector from "@/views/sla/selector/DashboardViewSelector";
import IndexView from "@/views/index/IndexView";
export default {

    extends: IndexView,

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
    },

    mounted () {
        this.setTitle('SLA Dashboard')
    }

}
</script>