import Vue from 'vue'
import Vuex from 'vuex'
import { URL_PARAMS } from './config';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cdnRoot: '',
        version: '',
        locale: '',

        darkMode: URL_PARAMS.theme === 'dark',
        enableDecal: 'decal' in URL_PARAMS,
        renderer: URL_PARAMS.renderer || 'canvas',

        typeCheck: URL_PARAMS.editor === 'monaco',
        useDirtyRect: 'useDirtyRect' in URL_PARAMS,

        runCode: '',
        sourceCode: '',

        runHash: '',

        isMobile: window.innerWidth < 600,

        editorStatus: {
            type: '',
            message: ''
        },

        mapMode: 'esri-dark', // 底图的模式，包括esri-dark, osm, baidu, amap
    },
    mutations: {},
    actions: {},
    modules: {}
})