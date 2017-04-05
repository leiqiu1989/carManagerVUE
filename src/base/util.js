import router from '../router';
import {
    MessageBox,
    Loading
} from 'element-ui';
var store = require('store');

function changeRouter(opt) {
    router.push(opt);
}

function goBack() {
    router.go(-1);
}

function setStore(key, value) {
    store.set(key, value);
}

function getStore(key) {
    return store.get(key);
}

function removeStore(key) {
    store.remove(key);
}

function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function formatDate(value, format) {
    return new Date(value).format(format);
}

function callBackProcess(data) {
    var code = data.errorCode;
    var msg = data.errorMsg || '系统未知错误,请联系管理员!';
    var opt = {};
    if (code && code === "120010") {
        opt = {
            type: 'error',
            confirmButtonText: '确定',
            callback: () => {
                changeRouter({
                    name: 'Login'
                });
            }
        }
    } else {
        opt = {
            type: 'info',
            confirmButtonText: '确定'
        }
    }
    MessageBox.alert(msg, '提示', opt);
}

export default {
    setStore,
    getStore,
    removeStore,
    trim,
    changeRouter,
    goBack,
    formatDate,
    callBackProcess
}