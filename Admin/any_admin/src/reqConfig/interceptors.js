import axios from 'axios'
import qs from 'qs'
//import store from '../vuex/store'
import router from '../router'
import {
  Loading,
  MessageBox,
  Message
} from 'element-ui';


// axios.default.timeout = 2500;
// axios.default.baseURL = "http://127.0.0.1:8888";

const instance = axios.create({
  headers: {
    'content-type': 'application/json;charset=UTF-8'
  },
  baseURL: 'http://127.0.0.1:8888',
  timeout: 10000,
  withCredentials: false
})

let loadingInstance = null;

instance.interceptors.request.use(config => {
  console.log(config);
  console.log("axios.interceptors.request.use");
  loadingInstance = Loading.service({
    spinner: "el-icon-loading",
    background: "rgba(0,0,0,0)",
    customClass: "common-spinner"
  });
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  console.log("response use");

  if (/(\/login)/.test(response.config.url)) {
    window.localStorage.setItem("localUserInfo", JSON.stringify(response.data.data));
  }

  let getLocalUserInfo = window.localStorage.getItem("localUserInfo"),
    commonUserInfo = getLocalUserInfo || JSON.parse(getLocalUserInfo);

  // if (commonUserInfo === null) {
  //   MessageBox({
  //     type: "warning",
  //     title: "提示",
  //     confirmButtonText: "点击登录",
  //     showClose: false,
  //     closeOnClickModal: false,
  //     message: "你未登录帐号，请登录",
  //     center: true,
  //     callback: function () {
  //       router.push({
  //         path: '/account/login'
  //       })
  //     }
  //   });
  // }

  loadingInstance.close();
  return response.data;
}, error => {
  loadingInstance.close();
  return Promise.reject(error)
})

export default instance;
