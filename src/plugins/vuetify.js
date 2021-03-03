import Vue from "vue"
import Vuetify, {VBtn, VIcon, VSnackbar} from 'vuetify/lib'
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
    }
})

Vue.use(VuetifyToast, { $vuetify: vuetfiy.framework });

export default vuetfiy
