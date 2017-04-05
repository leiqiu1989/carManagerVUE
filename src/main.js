// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import util from './base/util'
import store from './vuex/index';
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI);

Vue.prototype.utilHelper = util;

Vue.config.productionTip = false

// 注册filter
Vue.filter('dateformat', function(value, format) {
    return util.formatDate(value, format);
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: (x) => x(App)
});