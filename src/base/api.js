import axios from 'axios'
import qs from 'qs'
import util from './util'

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://gpsoss.dev-ag.56qq.com';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        if (config.indetity) {
            var identity = util.getStore('userInfo');
            if (identity) {
                config.data.st = identity.st;
                config.data.sid = identity.sid;
            }
        }
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export function fetch(url, params, opt) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, opt)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
                reject(error)
            })
    });
}

export default {
    // 登录
    Login(params) {
        return fetch('/doLogin', params);
    },
    // gps设备
    GPSList(params) {
        return fetch('/avl/get-avl-info-list', params, { indetity: true });
    },
    // 新增gps设备
    addGPS(params) {
        return fetch('/avl/save-avl-info', params, { indetity: true });
    }
}