import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
import gpsIndex from '@/components/gps/index.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Login',
        component: Login
    }, {
        path: '/index',
        name: 'Index',
        component: Index,
        children: [{
            name: 'GPSDevice',
            path: 'gps',
            components: {
                'contentView': gpsIndex
            }
        }, {
            name: 'CarManager',
            path: 'car',
            components: {}
        }]
    }]
})