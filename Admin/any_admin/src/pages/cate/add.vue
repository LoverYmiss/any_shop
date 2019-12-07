<template>
  <div id="home">
    <h2>新增分类</h2>
    <el-form label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="标识">
        <el-input v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="formData.icon"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="formData.description"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="formData.url"></el-input>
      </el-form-item>
      <el-form-item label="上级分类">
        <el-select
          v-model="parentName"
          placeholder="请选择分类"
          @change="cateChange"
        >
          <el-option
            v-for="(cate, index) in cates"
            :key="cate.code"
            :value="index"
          >{{cate.name}}</el-option>
        </el-select>
        <div class="tips">注：如您未选择分类，表示你新增的是一级分类</div>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ajaxGet, ajaxPost } from "../../reqConfig/ajax";
export default {
  name: "home",
  data() {
    return {
      formData: {
        name: "",
        code: "",
        icon: "",
        description: "",
        url: "",
        parent_id: "0"
      },
      parentName: "",
      cates: []
    };
  },
  mounted() {
    this.getCate();
  },
  methods: {
    getCate() {
      ajaxGet(`/api/cate/get-cate`).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.cates = res.data;
        }
      });
    },
    cateChange(e) {
      e = e;
      let item = this.cates[e];
      console.log(JSON.stringify(item));
      this.parentName = item.name;
      this.formData.parent_id = item.id;
    },
    onSubmit() {
      let self = this;
      if (self.formData.name == "") {
        return this.$message.error("请输入名称");
      }
      if (self.formData.code == "") {
        return this.$message.error("请输入标识");
      }
      // if (self.formData.parent_id == "") {
      //   return this.$message.error("请输入选择分类");
      // }
      // return console.log(this.formData);
      ajaxPost(`/api/cate/add-cate`, this.formData).then(res => {
        console.log(res);
        if (res.code == 200) {
          self.formData.name = "";
          self.formData.code = "";
          self.formData.icon = "";
          self.formData.url = "";
          self.formData.description = "";
          self.formData.parent_id = "";
          self.parentName = "";
        }
      });
    }
  }
};
</script>

<style lang="less" scope>
.tips {
  color: red;
}
</style>