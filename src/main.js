import Vue from 'vue'
// import app from './App.vue'
// import $ from 'jquery'
import explore from '@v/Explore'
import test from '@v/test'
// import VueI18n from 'vue-i18n';
// import messages from './common/i18n';
// import zh from '@/common/zh';
// import en from '@/common/en';
import './registerServiceWorker'
import 'element-ui/lib/theme-chalk/index.css'
import '@a/iconfont/iconfont.css'
import { i18n } from '@/common/i18n'
import router from '@/router/index'
import store from '@/store'
import VueScrollactive from 'vue-scrollactive'
import ElementUI from 'element-ui'

// Vue.prototype.$i18nRoute = Trans.i18nRoute.bind(Trans)

Vue.config.productionTip = false

Vue.use(VueScrollactive)
Vue.use(ElementUI)
    // Vue.use(VueI18n);

// const zh = require("./common/zh")
// const en = require("./common/en")

// const i18n = new VueI18n({
//     locale: 'zh',
//     fallbackLocale: 'en',
//     // messages: {
//     //     'zh': { zh }
//     // }
//     messages: {
//         'zh': zh,
//         'en': en
//     }
//     // messages: { zh }
// });

store.state.locale = 'zh';
store.state.version = Date.now()

new Vue({
    i18n,
    router,
    store,
    render: h => h(explore)
}).$mount('#app')