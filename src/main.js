import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import axios from "axios"
import '@mdi/font/css/materialdesignicons.css'
import 'typeface-roboto/index.css'
import './assets/custom.css'

Vue.config.productionTip = false

axios.defaults.withCredentials = true
axios.defaults.headers.common = {
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest"
}

import proto from "@/util/proto";
import Echo from "laravel-echo";
proto.load()

window.Pusher = require('pusher-js');
window.echo = new Echo({
    broadcaster: 'pusher',
    key: 'sla_frontend-dev',
    cluster: 'mt1',
    wsHost: window.location.hostname,
    wsPort: 6001,
    enabledTransports: ['ws', 'wss'],
    forceTLS: false,
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                axios.post('/api/v1/common/broadcast/authenticate', {
                    socket_id: socketId,
                    channel_name: channel.name
                })
                    .then(response => {
                        callback(false, response.data);
                    })
                    .catch(error => {
                        callback(true, error);
                    });
            }
        };
    },
});

window.vueApp = new Vue({
    router,
    store,
    vuetify,
    iconfont: 'mdi',
    render: h => h(App)
}).$mount('#app')