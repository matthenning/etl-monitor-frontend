<script>
    import axios from "axios"
    import Component from "./Component"
    import ModelFactory from "../store/models/ModelFactory"
    import Search from "../util/search"

    export default {

        extends: Component,

        props: {
            filter: Object,
            noPaginationLoad: Boolean,
            delayLoadingUntilEvent: String
        },

        data () {
            return {
                pagination: {
                    paginate: true,
                    current_page: 1,
                    last_page: null,
                    per_page: 10,
                    items: 0,
                    total_items: null,
                    current_page_item_ids: [],
                    sort_by: null,
                    sort_direction: 'asc',
                    filter: {}
                },
                search: null,
                search_mapping: {},
                search_exact: false,
                updateCallbacks: [],
                endpoint: 'fetch',
                endpoint_params: []
            }
        },

        watch: {
            filter (newFilter) {
                this.pagination.filter = newFilter
            }
        },

        computed: {
            objects () {
                if (!this.ready_to_load) return null

                if (!Array.isArray(this.store_model)) {
                    this.store_model = [ this.store_model ]
                }

                let objects = []
                this.store_model.forEach((m) => {
                    let query = m.query()

                    if (this.store_relations) {
                        this.store_relations.forEach((r) => { query = query.with(r) })
                    } else {
                        query = query.withAllRecursive(this.recursionDepth)
                    }

                    query.whereIdIn(this.pagination.current_page_item_ids).get().forEach((r) => {
                        objects.push(r)
                    })
                })

                return objects
            }
        },

        methods: {
            loadMore () {
                if (this.pagination.current_page <= this.pagination.last_page) {
                    if (this.pagination.current_page < this.pagination.last_page) this.pagination.current_page++
                    this.loadPage()
                }
            },

            loadPagination () {
                axios.get(this.model.endpoint(this.endpoint, this.endpoint_params) + '?pagination&per_page=' + this.pagination.per_page)
                    .then((response) => {
                        this.updatePagination(response.data.meta.pagination)
                    }, (error) => {
                        this.loadingError(error)
                    })
            },

            loadPage () {
                this.loading = true
                ModelFactory.fetchWithPagination(
                    this.model,
                    this.pagination,
                    this.receivedPaginatedItemsCallback,
                    this.loadingError,
                    this.relations,
                    this.endpoint,
                    this.endpoint_params
                )
            },

            addCurrentPageItemIds (ids) {
                if (!Array.isArray(ids)) ids = [ids]
                this.pagination.current_page_item_ids = this.pagination.current_page_item_ids.concat(ids)
            },

            updatePagination (pagination, current_page_item_ids = null) {
                this.pagination.items = pagination.items
                this.pagination.last_page = pagination.last_page
                this.pagination.total_items = pagination.total_items
                if (current_page_item_ids) this.pagination.current_page_item_ids = current_page_item_ids
            },

            updatePage (page) {
                this.pagination.current_page = page
                this.loadPage()
            },

            updateSortBy (sort_by) {
                this.pagination.sort_by = sort_by
            },

            updateSortDesc (sort_desc) {
                this.pagination.sort_direction = sort_desc[0] ? 'desc' : 'asc'
                setTimeout(() => { //Make sure we caught updateSortBy event before executing update
                    this.loadPage()
                }, 100)
            },

            updateSearch () {
                this.pagination.filter = Search.resolveSearchString(this.search, this.search_mapping, this.search_exact)
                this.loadPage()
            },

            toggleExact () {
                this.search_exact = !this.search_exact
                if (this.search.length > 0) this.updateSearch()
            },

            receivedPaginatedItemsCallback(response, ids) {
                if (this.pagination.paginate) this.updatePagination(response.meta.pagination, ids)
                else this.pagination.current_page_item_ids = ids
                this.clearLoadingError()
                this.callUpdateCallbacks()
                this.initialDone()
                this.loading = false
            },

            callUpdateCallbacks () {
                this.updateCallbacks.forEach((c) => c())
            },

            pushUpdateCallback (callback) {
                this.updateCallbacks.push(callback)
            }
        },

        mounted () {
            if (this.filter) {
                Object.keys(this.filter).forEach((k) => {
                    this.pagination.filter[k] = this.filter[k];
                })
            }

            if (!this.noPaginationLoad && this.pagination.paginate) {
                this.loadPagination()
            }

            if (!this.noInitialLoad) {
                this.loadPage()
            }

            this.$parent.$on('ComponentRefresh', this.loadPage)
        }

    }
</script>
