<script>
    import PaginatedComponent from "../PaginatedComponent";

    export default {

        extends: PaginatedComponent,

        props: {
            hideColumns: Boolean
        },

        data () {
            return {
                headers_default: []
            }
        },

        computed: {
            headers () {
                if (!this.hideColumns) return this.headers_default
                return this.headers_default.filter((header) => this.hideColumns.indexOf(header.value) === -1)
            }
        },

        methods: {
            paginationChangedPage (e) {
                this.pagination.current_page = e
                this.loadPage()
            },
            paginationChangedSort (e) {
                this.pagination.sort_by = e
                this.loadPage()
            },
            paginationChangedOptions (e) {
                this.pagination.per_page = e.itemsPerPage
                this.pagination.current_page = e.page
                this.pagination.sort_by = e.sortBy
                this.pagination.sort_direction = e.sortDesc ? 'desc' : 'asc'
                this.loadPage()
            }
        }

    }
</script>