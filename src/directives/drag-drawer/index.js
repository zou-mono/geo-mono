import drag from './drag'

const install = function(Vue) {
    Vue.directive('dragDrawer', drag)
}

if (window.Vue) {
    window['dragDrawer'] = drag
}

if (window.Vue) {
    window['el-drag-drawer'] = drag
    Vue.use(install); // eslint-disable-line
}

drag.install = install
export default drag