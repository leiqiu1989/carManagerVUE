import util from '../base/util';

export default {
    // 设置Login状态
    setLoginStatus({ commit }, platform) {
        util.setStore('loginStatus', platform);
        commit('SET_LOGIN_STSTUS', platform);
    },
    // 设置identity
    setIdentity({ commit }, platform) {
        util.setStore('userInfo', platform);
        commit('SET_IDENTITY', platform);
    },
    // 退出
    signOut({ commit }) {
        util.removeStore('loginStatus');
        util.removeStore('userInfo');
        commit('SET_LOGIN_STSTUS', false);
        commit('SET_IDENTITY', {});
    }
}