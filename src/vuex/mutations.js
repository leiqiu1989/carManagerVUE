export default {
    // 设置是否登录
    SET_LOGIN_STSTUS(state, platform) {
        state.loginStatus = platform;
    },
    // 设置登录标识符
    SET_IDENTITY(state, platform) {
        state.userInfo = platform;
    }
}