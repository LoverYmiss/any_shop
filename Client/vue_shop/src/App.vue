<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { ajaxGet } from './reqConfig/ajax';
  export default {
    name: 'App',
    mounted() {
      this.getInfo();
    },
    methods: {
      getInfo () {
        console.log("ajaxGet");
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .el-loading-spinner i {
    font-size: 24px;
  }
</style>
