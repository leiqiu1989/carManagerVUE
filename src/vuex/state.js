import util from '../base/util';

export default {
    // 登录状态
    loginStatus: util.getStore('loginStatus') ? util.getStore('loginStatus') : false,
    // 用户信息
    userInfo: util.getStore('userInfo') ? util.getStore('userInfo') : {}
};