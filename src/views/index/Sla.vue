<script>
import Link from "@/util/Link";

export default {
    created() {
        this.$router.push(Link.route('sla', 'dashboard', 'daily'))
    }
}
</script>