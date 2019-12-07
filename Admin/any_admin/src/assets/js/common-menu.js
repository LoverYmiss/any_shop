export function commonMenu() {
  return [{
    name: "分类管理",
    code: "CATE_MANAGE",
    index: "1",
    children: [{
      name: "新增分类",
      code: "ADD_CATE",
      url: "/addCate",
      index: "1-1"
    }]
  }, {
    name: "权限管理",
    code: "AUTH_MANAGE",
    index: "2",
    children: [{
      name: "权限列表",
      code: "AUTH_LIST",
      url: "/authList",
      index: "2-1"
    }, {
      name: "设置权限",
      code: "SET_AUTH",
      url: "/setAuth",
      index: "2-2"
    }]
  }]
}
