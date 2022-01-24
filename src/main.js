/* eslint-disable no-unused-vars */
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import Moment from 'vue-moment'

import App from "@/App"

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(Moment);

// So we don't encounter eslint rule no-new
// Reference: https://vuejs.org/v2/api/#vm-mount
const vm = new Vue({

    transformToRequire: {
        img: 'src',
        image: 'xlink:href',
    },

    render: h => h(App),
    mounted() {
        document.title = "Detector Health"
    }
});

vm.$mount('#app');

