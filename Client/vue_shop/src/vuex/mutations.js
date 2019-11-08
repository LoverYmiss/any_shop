const mutations = {
  changeUserInfo ( state, data ) {
    state.userInfo = data;
  },
  exitLogin (state) {
    state.userInfo = {};
    window.localStorage.clear("localUserInfo");
  }
}

export default mutations
