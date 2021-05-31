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
                primary: colors.teal.darken1,
                secondary: colors.teal.darken2,
                accent: colors.teal.lighten2,
            },
            dark: {
                primary: colors.lightBlue.darken4,
                secondary: colors.lightBlue.darken3,
                accent: colors.lightBlue.accent3,
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
