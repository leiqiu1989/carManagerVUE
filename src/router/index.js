import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Authorize from '@/components/authorize'

Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [{
        path: '/',
        name: 'Login',
        component: Login
    },{
        path:'/index',
        name:'Index',
        component:Index
    },{
        path:'/authorize',
        name:'authorize',
        component:Authorize
    }]
})