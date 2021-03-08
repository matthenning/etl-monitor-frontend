import Vue from "vue"
import Vuetify, {VSnackbar} from 'vuetify/lib'
import colors from "vuetify/lib/util/colors"
import VuetifyToast from "vuetify-toast-snackbar"

Vue.use(Vuetify, {
    components: {
        VSnackbar
    }
})
const vuetfiy = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.orange.darken4,
                secondary: colors.lightBlue.darken3,
                accent: colors.indigo.base,
            },
            dark: {
                primary: colors.orange.darken4,
                secondary: colors.lightBlue.darken3,
                accent: colors.indigo.base,
            }
        },
        dark: false
    },
    breakpoint: {
        thresholds: {
            xs: 0,
            sm: 960,
            md: 1280,
            lg: 1920 - 16,
            xl: 2000 - 16
        }
    }
})

Vue.use(VuetifyToast, { $vuetify: vuetfiy.framework });

export default vuetfiy
