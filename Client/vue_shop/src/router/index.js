import Vue from 'vue'
import Router from 'vue-router'

//用户中心
const userLogin = resolve => require(['@/components/account/login'], resolve);
const userChat = resolve => require(['@/components/chat/chat'], resolve);


const demo = resolve => require(['@/components/demo/index'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'userLogin',
      component: userLogin
    },{
      path: '/userChat',
      name: 'userChat',
      component: userChat
    },{
      path: '/demo',
      name: 'demo',
      component: demo
    }
  ]
})
