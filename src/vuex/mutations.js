export default {
    // 设置是否登录
  SET_LOGIN_STSTUS (state, platform) {
    state.st = platform.st;
    state.sid= platform.sid;
  }
}