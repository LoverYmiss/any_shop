import Vue from 'vue'
import Router from 'vue-router'

const home = resolve => require(["@/pages/home/home"], resolve)

// 分类
const addCate = resolve => require(["@/pages/cate/add"], resolve)

// 授权管理
const setAuth = resolve => require(["@/pages/auth/index"], resolve)
const setAuthDetail = resolve => require(["@/pages/auth/set"], resolve)

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [{
      path: '/',
      name: 'home',
      component: home,
      meta: {
        title: "首页"
      }
    },
    {
      path: '/addCate',
      name: 'addCate',
      component: addCate,
      meta: {
        title: "新增分类"
      }
    },
    {
      path: '/setAuth',
      name: 'setAuth',
      component: setAuth,
      meta: {
        title: "设置授权"
      }
    },
    {
      path: '/setAuthDetail',
      name: 'setAuthDetail',
      component: setAuthDetail,
      meta: {
        title: "设置用户权限"
      }
    }
  ]
})
