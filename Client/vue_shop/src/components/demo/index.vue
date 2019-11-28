<template>
  <div id="demo">
    <input type="text" v-model="mobile"> <br>
    <input type="password" v-model="password"> <br>
    <input type="button" value="提交" @click="submit">
  </div>
</template>

<script>
  import md5 from "md5";
  import { ajaxPost } from '../../reqConfig/ajax';
  export default {
    name: "demoIndex",
    data () {
      return {
        mobile: "18151039981",
        password: "123456"
      }
    },
    mounted() {
      //调用
      let obj = {
        appid: '',
        terminalNumber: '',
        id: 32432434321,
        token: "dsjafdklsajfkelwjakldsjaf.dsdaflejfksldajfiejwfkdlsjaiej2k4l3jrk4l3jr432l5j43k5l3.3543o254jklfdsklafje",
        time: parseInt(new Date().getTime() / 1000)
      };
      obj.sign = this.signGenerate(obj, this.key);
      console.log(obj, obj.sign.length);
    },
    methods: {
      submit () {
        ajaxPost("/login", {
          mobile: this.mobile,
          password: md5(this.password),
          loadingSta: false
        })
          .then(res => {
            if(res.code === 200) {
              console.log(res.data);
              this.loginSta = 2;
            }
          }).catch(() => {
          console.log("登录失败");
        })
      }
    }
  }
</script>

<style scoped>
 #demo {
   background-color: #f9f9f9;
 }
</style>
