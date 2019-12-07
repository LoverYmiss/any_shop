import axios from 'axios'
import qs from 'qs'
import store from '../vuex/store'
import router from '../router'
import {
  Loading,
  MessageBox,
  Message
} from 'element-ui';

axios.defaults.timeout = 2500;
axios.defaults.withCredentials = true
axios.defaults.baseURL = store.state.requestUrl;
console.log("axios", axios);

let loadingInstance;

axios.interceptors.request.use(config => {
  console.log("axios.interceptors.request.use");

  let paramsLoadingSta = "loadingSta",
    reg = new RegExp("(^|&)" + paramsLoadingSta + "=([^&]*)(&|$)"),
    reqLoadingSta = true;
  if (config.method.toLowerCase() === "get") {
    if (!reg.test(config.url)) reqLoadingSta = false;
  } else if (config.method.toLowerCase() === "post") {
    console.log(reg, config.data);
    console.log(reg.test(config.data));
    if (!reg.test(config.data)) reqLoadingSta = false;
  }

  config.headers["token"] = window.localStorage.getItem("userToken") || "";

  // element ui Loading方法
  console.log("reqLoadingSta = " + reqLoadingSta);
  loadingInstance = Loading.service({
    fullscreen: true,
    //text:'加载中...',
    spinner: "el-icon-loading",
    background: "rgba(0,0,0,0.5)",
    customClass: "common-spinner"
  });
  return config
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {
  console.log("response use");

  if (/(\/login)/.test(response.config.url)) {
    window.localStorage.setItem("localUserInfo", JSON.stringify(response.data.data));
  }

  let getLocalUserInfo = window.localStorage.getItem("localUserInfo"),
    commonUserInfo = getLocalUserInfo || JSON.parse(getLocalUserInfo);

  //判断登录
  if (commonUserInfo === null) {
    let urlPath = router.options.routes[0].path;
    //过滤不用登录页面
    if (urlPath !== "/") {
      MessageBox({
        type: "warning",
        title: "提示",
        confirmButtonText: "点击登录",
        showClose: false,
        closeOnClickModal: false,
        message: "你未登录帐号，请登录",
        center: true,
        callback: function () {
          router.push({
            path: '/account/login'
          })
        }
      });
    }
  }
  loadingInstance.close();
  return response.data;
}, error => {
  loadingInstance.close();
  return Promise.reject(error)
});

export default axios;
