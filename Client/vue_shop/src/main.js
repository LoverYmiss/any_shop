// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import sha1 from "js-sha1";

import vueScroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
Vue.use(vueScroll);

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

Vue.config.productionTip = false

//封装全局签名函数
Vue.prototype.signGenerate = (obj, key) => {
  console.log(obj, key);
  let str0 = '';
  for (let i in obj) {
    console.log("i = ", i);
    if (i != 'sign') {
      let str1 = '';
      str1 = i + '=' + obj[i];
      str0 += str1;
    }

  }

  console.log(str0);

  return sha1(str0 + key);
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
