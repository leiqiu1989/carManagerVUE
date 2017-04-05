import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
import gpsIndex from '@/components/gps/index.vue'
import gpsAdd from '@/components/gps/add.vue'
import tplIndex from '@/components/template/index.vue'

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
            path: 'add',
            components: {
                'contentView': gpsAdd
            },
            alias: 'gps/add'
        }, {
            name: 'CarManager',
            path: 'car',
            components: {}
        }, {
            name: 'TemplateManager',
            path: 'tpl',
            components: {
                'contentView': tplIndex
            }
        }]
    }]
});