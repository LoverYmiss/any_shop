<template>
  <div id="home">
    <div v-if="step === 1">
      <h2>
        <div style="float: left;line-height: 33px; margin-right:50px;">设置权限</div>
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
    <div v-if="step === 2">
      <h2>配置用户权限</h2>
      <el-tree
        ref="tree"
        node-key="sort_key"
        :data="allCates"
        show-checkbox
        :default-checked-keys="userConfArr"
        :props="defaultProps"
        :default-expand-all="expandAll"
      >
      </el-tree>

      <div class="save-auth">
        <el-button
          @click="getCheckedKeys"
          type="primary"
          size="small"
        >保存配置</el-button>
        <el-button
          @click="goBack"
          size="small"
        >返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ajaxGet, ajaxPost } from "../../reqConfig/ajax";
export default {
  name: "home",
  data() {
    return {
      userList: [],
      searchMobile: "",
      expandAll: true,
      step: 1,
      allCates: [],
      userConfArr: [],
      selectedId: "",
      defaultProps: {
        children: "children",
        label: "name"
      }
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
      this.selectedId = id;
      this.step = 2;
      this.userConfArr = [];
      ajaxPost(`/api/user/getAuthInfo`, {
        id: id
      }).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.allCates = res.data.cate;
          if (typeof res.data.userAuth[0] === "object") {
            this.userConfArr = res.data.userAuth[0].user_auth.split(",");
          }
        }
      });
    },
    search() {
      let url = `/api/user/searchConfigUser`;
      ajaxPost(url, {
        mobile: this.searchMobile
      }).then(res => {
        if (res.code === 200) {
          console.log(res);
          this.userList = res.data;
        }
      });
    },
    getCheckedKeys() {
      let arr = this.$refs.tree.getCheckedKeys(),
        url = `/api/user/saveUserConfig`;

      if (arr.length === 0) {
        return this.$message.error("你暂未选择配置信息");
      }
      if (this.userConfArr.length > 0) {
        url = `/api/user/updateUserConfig`;
      }

      console.log(url);
      ajaxPost(url, {
        user_id: this.selectedId,
        user_auth: arr.join(",")
      }).then(res => {
        if (res.code === 200) {
          this.$message("用户配置设置成功");
          this.step = 1;
        }
      });
    },
    goBack() {
      this.step = 1;
    }
  }
};
</script>

<style lang="less" scope>
h2 {
  margin-bottom: 20px;
}
.save-auth {
  position: fixed;
  left: 54%;
  bottom: 3%;
}
.el-tree {
  border: 1px solid #f2f2f2;
  padding: 20px;
}
</style>