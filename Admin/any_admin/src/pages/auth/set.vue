<template>
  <div id="home">
    <h2>
      <div style="float: left;line-height: 33px;">设置权限</div>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入手机号码"
        v-model="searchMobile"
        style="width: 200px;"
      >
      </el-input>
      <el-button
        size="small"
        type="primary"
        @click="search"
      >搜索</el-button>
    </h2>
    <table>
      <thead>
        <tr>
          <th>uid</th>
          <th>手机号码</th>
          <th>昵称</th>
          <th>真实改名</th>
          <th>地区</th>
          <th>地址</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in userList"
          :key="item.uid"
        >
          <td>{{item.uid}}</td>
          <td>{{item.mobile}}</td>
          <td>{{item.nick_name}}</td>
          <td>{{item.name}}</td>
          <td>{{item.address}}</td>
          <td>{{item.address_detail}}</td>
          <td>
            <el-button
              type="primary"
              size="mini"
              @click="setAuth(item.id)"
            >设置权限</el-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ajaxGet, ajaxPost } from "../../reqConfig/ajax";
export default {
  name: "home",
  data() {
    return {
      userList: [],
      searchMobile: ""
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      ajaxGet(`/api/user/get-user`).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.userList = res.data;
          console.log(this.userList.length);
        }
      });
    },
    setAuth(id) {
      console.log(id);
      ajaxPost(`/api/user/getAuthInfo`, { id: id }).then(res => {
        console.log(res);
        if (res.code === 200) {
        }
      });
    },
    search() {}
  }
};
</script>

<style lang="less" scope>
</style>