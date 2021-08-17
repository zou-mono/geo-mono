import Vue from 'vue'
// import App from './App.vue'
// import $ from 'jquery'
import explore from '@c/Explore'
import VueI18n from 'vue-i18n';
import messages from './common/i18n';
import './registerServiceWorker'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
// import 'bootstrap/dist/js/bootstrap.min'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import editor from '@c/Editor'
// import router from './router'
import store from './store'
// import VueScrollTo from 'vue-scrollto'
import VueScrollactive from 'vue-scrollactive'
import ElementUI from 'element-ui'
// import scrollto from '@c/ScrollTo'

Vue.config.productionTip = false

Vue.use(VueScrollactive)
Vue.use(ElementUI)
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'zh',
    // fallbackLocale: 'zh',
    messages
});

store.state.locale = 'zh';
store.state.version = Date.now()

new Vue({
    el: '#app',
    i18n,
    // router,
    store,
    render: h => h(explore)
})