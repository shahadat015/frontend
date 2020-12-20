import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'vue-snotify/styles/simple.css'
import User from './helpers/User'
import Exception from './helpers/Exception'
import VueProgressBar from "vue-progressbar";
import Snotify, { SnotifyPosition } from "vue-snotify";

const snotifyOptions = {
    toast: {
        position: SnotifyPosition.rightTop
    }
};

Vue.use(Snotify, snotifyOptions);

const progressBarOptions = {
    color: "#38c172",
    failedColor: "#874b4b",
    thickness: "4px",
    transition: {
        speed: "0.2s",
        opacity: "0.6s",
        termination: 300
    },
    autoRevert: true,
    location: "top",
    inverse: false
};

Vue.use(VueProgressBar, progressBarOptions);

window.User = User;
window.Exception = Exception;
Vue.config.productionTip = false
window.axios = require('axios')
window.axios.defaults.baseURL = 'https://backend.dev/api/'
const JwtToken = `Bearer ${localStorage.getItem('token')}`;
window.axios.defaults.headers.common['Authorization'] = JwtToken;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
