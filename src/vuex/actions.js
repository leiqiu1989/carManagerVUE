export default {
  // 设置Login状态
  setLoginStatus ({commit}, platform) {
    commit('SET_LOGIN_STSTUS', platform);
  }
}