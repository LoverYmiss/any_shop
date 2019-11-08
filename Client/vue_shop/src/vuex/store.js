import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

let localUserInfo = window.localStorage.getItem("localUserInfo");
if(localUserInfo !== "undefined") {
  localUserInfo = JSON.parse(localUserInfo);
} else {
  localUserInfo = [];
}

const state = {
  userInfo: localUserInfo,
  requestUrl: "http://127.0.0.1:3005"
};

export default new Vuex.Store({
  state,
  mutations
})
