import Vue from 'vue'
// import explore from '@c/Explore'
import './registerServiceWorker'
import 'element-ui/lib/theme-chalk/index.css'
import '@a/iconfont/iconfont.css'
import { i18n } from '@/common/i18n'
import editor from '@v/Editor'
import router from '@/router'
import store from '@/store'
import VueScrollactive from 'vue-scrollactive'
import ElementUI from 'element-ui'

Vue.config.productionTip = false

Vue.use(VueScrollactive)
Vue.use(ElementUI)

store.state.version = Date.now()

new Vue({
    el: '#app',
    i18n,
    router,
    store,
    render: h => h(editor)
})