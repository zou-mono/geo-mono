import drag from './drag'

const install = function(Vue) {
    Vue.directive('dragDrawer', drag)
}

if (window.Vue) {
    window['dragDrawer'] = drag
    Vue.use(install); // eslint-disable-line
}

drag.install = install
export default drag