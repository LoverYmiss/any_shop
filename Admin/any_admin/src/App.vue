<template>
  <div id="app">
    <div id="header">
      <span class="logo">header</span>
    </div>
    <div id="side-bar">
      <el-menu>
        <el-submenu
          v-for="item in menu"
          :key="item.code"
          :index="item.index"
        >
          <template slot="title">{{item.name}}</template>
          <el-menu-item
            v-for="ch in item.children"
            :key="ch.code"
            :index="ch.index"
            @click="openPage(ch)"
          >{{ch.name}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div id="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { commonMenu } from "./assets/js/common-menu";
export default {
  name: "App",
  data() {
    return {
      menu: commonMenu()
    };
  },
  methods: {
    openPage(item) {
      console.log(item.url);
      this.$router.push({ path: item.url });
    }
  }
};
</script>

<style lang="less">
@topHei: 60px;
@sideWid: 220px;
* {
  margin: 0;
  padding: 0;
}
// body {
//   background-image: url("../static/images/body-bg.png");
// }
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #222;
}
#header {
  line-height: @topHei;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  right: 0;
  bottom: auto;
  left: 0;
  padding: 0 20px;
  z-index: 100;
  .logo {
    color: #d80012;
  }
}
#side-bar {
  position: fixed;
  top: @topHei;
  bottom: 0;
  left: 0;
  width: @sideWid;
  border-right: 1px solid #f2f2f2;
  .el-menu {
    border-right: none;
  }
}
#main {
  position: fixed;
  top: @topHei;
  right: 0;
  bottom: 0;
  left: @sideWid + 1;
  padding: 20px;
  overflow: auto;
  background-color: #fdfdfd;

  table {
    width: 100%;
    border-spacing: 0;
    text-align: center;
    border-top: 1px solid #ebebeb;
    border-left: 1px solid #ebebeb;
  }

  table tbody td,
  table thead th {
    padding: 5px 10px;
    border-right: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
  }

  table thead th {
    padding: 7px;
    background-color: #f2f2f2;
  }

  table tbody tr:nth-child(2n) {
    background-color: #f9f9f9;
  }
}
</style>
