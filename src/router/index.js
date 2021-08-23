import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import { Trans } from '@/plugins/Translation'
// import editor from '@v/Editor'
// import explore from '@v/Explore'
import app from '@/App.vue'

Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/user',
    //     component: app,
    //     children: [{
    //         path: 'en',
    //         name: 'explore',
    //         component: () =>
    //             import ('@v/Explore')
    //     }]
    // },
    // {
    //     path: '/user',
    //     component: {
    //         template: "<router-view></router-view>"
    //     },
    //     // component: explore,
    //     // component: {
    //     //     template: "<router-view></router-view>"
    //     // },
    //     // beforeEnter: Trans.routeMiddleware,
    //     children: [{
    //         path: 'editor',
    //         name: 'editor',
    //         component: editor
    //     }]
    // },
    {
        path: '/:locale',
        name: 'Home',
        component: () =>
            import ('@v/Explore'),
        beforeEnter: Trans.routeMiddleware
    },
    {
        path: '/editor/:locale',
        component: () =>
            import ('@v/Editor'),
        beforeEnter: Trans.routeMiddleware
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ '../views/About.vue')
    // },
    {
        path: '/explore/:locale',
        component: () =>
            import ('@v/Explore'),
        // component: {
        //     template: "<router-view></router-view>"
        // },
        beforeEnter: Trans.routeMiddleware
    },
    // {
    //     path: '*',
    //     redirect() {
    //         return Trans.defaultLocale;
    //     }
    // },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router