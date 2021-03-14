import Link from "@/util/Link";

export default {
    install (Vue, options) {
        Vue.prototype.$link = (...args) => {
            return Link.route(...args)
        }
    }
}