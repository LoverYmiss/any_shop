<template>
  <div id="chat-room">

    <div
      class="common-box1 chat-login-area"
      v-show="loginSta === 1"
    >
      <div class="head"></div>
      <div class="main">
        <div class="avatar-box">
          <div class="avatar">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573379398&di=5e05d4a5ae7ea2aa57c1402d29578f73&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201512%2F24%2F20151224235942_mYXFV.thumb.700_0.jpeg" alt="">
          </div>
        </div>

        <div class="login-form-box">
          <div class="login-form">
            <div class="item">
              <span></span>
              <input type="number" v-model="login_data.id">
            </div>
            <div class="item">
              <span></span>
              <input type="password" v-model="login_data.password">
            </div>
            <a href="javascript:;" class="login-btn" @click="loginBtn">登录</a>
          </div>
        </div>
      </div>
    </div>

    <div
      id="chat-info-box"
      class="common-box1 chat-info-box"
      v-if="loginSta === 2"
    >
      <div class="info"></div>
      <div class="tab">
        <div
          class="item"
          v-for="item in tabArr"
          :key="'chatTab'+item.value"
          :class="{current: item.value === chatTabCur}"
          @click="switchBox(item.value)"
        >{{item.name}}</div>
      </div>
      <div class="main-box">
        <div
          class="inner-box"
          :style="{left: chatInnerTabLeft + 'px'}"
        >
          <vueScroll
            :ops="ops"
            class="chat-now-box"
          >
            <div
              class="list"
              v-for="item in msgArr"
              :key="item.name"
              @dblclick="openChat(item)"
            >
              <div class="avatar-area">
                <img :src="item.avatar" alt="">
              </div>
              <div class="area-main">
                <div class="name-date-area">
                  <div class="name">{{item.name}}</div>
                  <div class="date">{{item.date}}</div>
                </div>
                <div class="msg">{{item.msg}}</div>
              </div>
            </div>
          </vueScroll>
          <vueScroll
            :ops="ops"
            class="chat-friends"
          >
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="一致性 Consistency" name="1">
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
              </el-collapse-item>
              <el-collapse-item title="反馈 Feedback" name="2">
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
              </el-collapse-item>
              <el-collapse-item title="效率 Efficiency" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              </el-collapse-item>
              <el-collapse-item title="可控 Controllability" name="4">
                <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
              </el-collapse-item>
            </el-collapse>
          </vueScroll>
          <vueScroll
            :ops="ops"
            class="chat-qZone"
          >
            chat-qZone
          </vueScroll>
        </div>
      </div>
    </div>

    <div
      class="common-box1 chat-box"
      v-show="showChatBox"
    >
      <div class="sidebar">
        <div
          class="item"
          v-for="item in chatBoxArr"
        >
          <div class="avatar-area">
            <img :src="item.avatar" alt="">
          </div>
          <div class="area-main">
            <div class="name">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="head">
          <div class="name">{{}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ajaxPost } from '../../reqConfig/ajax';
  import md5 from "md5";
  export default {
    name: "chat",
    data () {
      return {
        loginSta: 2,
        showChatBox: false,
        chatBoxArr: [
          {
            avatar: "https://img11.360buyimg.com/n7/jfs/t1/82626/19/14963/188507/5dc4de6eE67897997/516a642fdceb81d6.jpg",
            name: "那匹马",
            date: "今天",
            msg: "我明天过去哈"
          },{
            avatar: "https://img10.360buyimg.com/n7/jfs/t1/74498/34/14687/194199/5dc3e179Ee13043e0/3a42acb0b6a91441.jpg",
            name: "异次元无尽",
            date: "11-03",
            msg: "我的天"
          },{
            avatar: "https://img12.360buyimg.com/n7/jfs/t1/77617/5/7356/117354/5d578b79E88777705/f1e6ee56d6e27bcd.jpg",
            name: "゛一種偏執錯誤叫执著",
            date: "11-03",
            msg: ""
          }
        ],
        chatInnerTabLeft: 0,
        chatTabCur: 0,
        tabArr: [
          {
            value: 0,
            name: "消息"
          },{
            value: 1,
            name: "联系人"
          },{
            value: 2,
            name: "空间"
          }
        ],
        login_data: {
          id: "2503469",
          password: "123456"
        },
        ops: {
          bar: {
            background: 'rgba(215, 215, 215, .9)',
          }
        },
        activeNames: ['1'],
        msgArr: [
          {
            avatar: "https://img11.360buyimg.com/n7/jfs/t1/82626/19/14963/188507/5dc4de6eE67897997/516a642fdceb81d6.jpg",
            name: "那匹马",
            date: "今天",
            msg: "我明天过去哈"
          },{
            avatar: "https://img10.360buyimg.com/n7/jfs/t1/74498/34/14687/194199/5dc3e179Ee13043e0/3a42acb0b6a91441.jpg",
            name: "异次元无尽",
            date: "11-03",
            msg: "我的天"
          },{
            avatar: "https://img12.360buyimg.com/n7/jfs/t1/77617/5/7356/117354/5d578b79E88777705/f1e6ee56d6e27bcd.jpg",
            name: "゛一種偏執錯誤叫执著",
            date: "11-03",
            msg: ""
          }
        ]
      }
    },
    components: {
    },
    mounted () {
      if(this.loginSta === 2) {
        let winHei = window.innerHeight,
          chatBoxDom = document.getElementById("chat-info-box");
        chatBoxDom.style.top = (winHei - 695 ) / 2 + "px";
      }
    },
    methods: {
      switchBox (index) {
        this.chatInnerTabLeft = - (index * 275);
        this.chatTabCur = index;
      },
      handleChange (val) {
        console.log(val);
      },
      openChat (item) {
        console.log(item);
        this.showChatBox = true;
        this.chatBoxArr.push(item);
      },
      loginBtn () {
        ajaxPost("/login", {
          id: this.login_data.id,
          password: md5(this.login_data.password)
        })
          .then(res => {
            if(res.code === 200) {
              console.log(res.data);
              this.loginSta = 2;
            }
          }).catch(() => {
          console.log("获取当前日期错误");
        })
      }
    }
  }
</script>

<style scoped lang="less">
  input {
    outline: none;
    border: none;
  }
  .common-box1 {
    border-radius: 4px;
    background-color: #fff;
    position: fixed;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0,0,0,.2);
  }

  #chat-room {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("../../../static/images/bg5.jpg") center center no-repeat;
    background-size: cover;
    font-size: 14px;

    .chat-login-area {
      width: 428px;
      height: 328px;
      margin: -164px auto 0;
      top: 50%;
      right: 0;
      bottom: 0;
      left: 0;
      .head {
        height: 328px * (1 - 0.618);
        background: #fff url("../../../static/images/login-bg3.jpg") top center no-repeat;
        background-size: cover;
      }

      .main {
        margin-top: 80px;
        text-align: center;
        position: absolute;
        top: 0;
        right: 0;
        bottom: auto;
        left: 0;
      }

      @avatarWid: 80px;
      .avatar-box {
        width: @avatarWid;
        height: @avatarWid;
        padding: 3px;
        background-color: #fff;
        display: inline-block;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
      }

      .avatar {
        width: @avatarWid;
        height: @avatarWid;
        background-color: #fff;
        display: inline-block;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }

      .login-form {
        width: 250px;
        display: inline-block;
        padding-top: 10px;
        .item {
          height: 30px;
          line-height: 30px;
          border-bottom: 1px solid #e5e5e5;
          span {
            width: 16px;
            height: 16px;
            background-color: #ddd;
            display: inline-block;
            float: left;
            margin-top: 7px;
          }
          input {
            width: 220px;
            float: left;
            margin-left: 10px;
            margin-top: 8px;
          }
        }
        .login-btn {
          width: 100%;
          height: 35px;
          line-height: 35px;
          display: inline-block;
          text-align: center;
          color: #fff;
          background-color: #e36957;
          border-radius: 4px;
          margin-top: 20px;
          &:hover {
            background-color: #bc5945;
          }
        }
      }
    }

    .chat-info-box {
      width: 275px;
      height: 695px;
      top: 40px;
      right: 50px;
      .info {
        width: 100%;
        height: 145px;
        background: url("../../../static/images/bg1.jpg") top center no-repeat;
        background-size: 100% auto;
      }
      .tab {
        height: 40px;
        border-bottom: 1px solid #e5e5e5;
        background-color: #fff;
        text-align: center;
        .item {
          width: 100% / 3;
          line-height: 40px;
          color: #999;
          float: left;
          cursor: pointer;
          position: relative;
          &.current,
          &:hover {
            color: #000;
          }
          &.current:after {
            content: "";
            position: absolute;
            height: 2px;
            background-color: #000;
            width: 70%;
            right: 0;
            bottom: 0;
            left: 15%;
            z-index: 10;
          }
        }
      }
      .main-box {
        position: absolute;
        top: 186px;
        right: 0;
        bottom: 40px;
        left: 0;
        border-bottom: 1px solid #e5e5e5;
        overflow: hidden;
        .chat-now-box,
        .chat-friends,
        .chat-qZone {
          width: 275px !important;
          float: left;
          padding: 10px 0;
        }
        .inner-box {
          width: 275px * 3;
          height: 469px;
          position: relative;
          transition: left .2s;
        }
        .list {
          padding: 10px;
          display: flex;
          align-items: center;
          &:hover {
            background-color: #f2f2f2;
          }
          .avatar-area {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          .name-date-area {
            width: 205px;
            display: flex;
            align-items: center;
          }
          .name {
            flex: 1;
            line-height: 19px;
          }
          .msg,
          .date {
            font-size: 12px;
            color: #999;
          }
          .msg {
            height: 17px;
            padding-top: 5px;
          }
        }
      }
    }

    .chat-box {
      width: auto;
      height: 630px;
      top: 100px;
      left: 300px;
      .sidebar {
        width: 180px;
        height: 630px;
        overflow: hidden;
        background-color: #252525;
        .item {
          display: flex;
          align-items: center;
          padding: 10px;
          color: #999;
        }
        .avatar-area {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .area-main {
          width: 125px;
          align-items: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .name {
          width: 125px;
          line-height: 19px;
        }
      }
      .main {
        width: 600px;
        height: 630px;
        background-color: #fff;
      }
    }
  }
</style>

<style lang="less">
  #chat-room {
    .el-collapse {
      margin-top: -1px;
    }
    .chat-info-box .chat-friends .el-collapse-item__header {
      padding-left: 10px;
      height: 30px;
      line-height: 30px;
      /*background-color: #f2f2f2;*/
    }
    .el-collapse-item__content {
      padding-bottom: 0;
    }
  }
</style>
