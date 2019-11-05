<template>
  <div>
    <mock-header></mock-header>
    <div class="container">
      <el-button type="primary" class="subBtn" @click="submit">
        同步
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
      <el-button type="primary" class="subBtn" @click="add" style="margin-right:10px">
        新增
        <i class="el-icon-plus el-icon--right"></i>
      </el-button>
    </div>
    <section>
      <div v-for="(item,index) in models" :key="index" class="card">
        <div class="card_header">
          <span v-if="item.type">{{item.name}}</span>
          <el-input placeholder="请输入模块名称" v-model="item.name" v-if="item.type!=='view'"></el-input>
        </div>
        <ul>
          <li>
            <div class="sub-title">模块地址</div>
            <el-input placeholder="请输入内容" v-model="item.path" :disabled="item.type==='view'"></el-input>
          </li>
          <li>
            <div class="sub-title">请求数</div>
            <el-input placeholder="请输入内容" v-model="item.total" :disabled="true"></el-input>
          </li>
          <li>
            <div class="sub-title">描述</div>
            <el-input placeholder="请输入内容" v-model="item.des" :disabled="item.type==='view'"></el-input>
          </li>
        </ul>
        <div class="card_footer">
          <el-button type="text" class="button" @click="editModel(item)">编辑接口</el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import mockHeader from "@/components/Header";
export default {
  name: "",
  data() {
    return {
      models: []
    };
  },
  components: {
    mockHeader
  },
  mounted() {
    this.getModels();
  },
  methods: {
    add() {
      let obj = {
        name: "",
        path: "",
        total: 0,
        des: "",
        type: "add"
      };
      this.models.unshift(obj);
    },
    getModels() {
      this.$api.getModel().then(res => {
        console.log(res.data);
        this.models = res.data;
        console.log(this.models);
      });
    },
    editModel(item) {
      this.$router.push({ path: "/model", query: { model: item.path } });
    },
    submit() {
      this.$api.addModel(this.models).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  overflow: hidden;
  padding: 10px 23px;
  box-sizing: border-box;
  button {
    float: right;
  }
}
section {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  padding: 20px 0;
  flex-wrap: wrap;
  .card {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #ebeef5;
    width: 300px;
    height: 320px;
    border-radius: 4px;
    overflow: hidden;
    margin: 0 23px 20px 0;
    .card_header {
      height: 50px;
      background: rgba(25, 137, 250, 0.5);
      line-height: 50px;
      font-size: 16px;
      color: #fff;
      /deep/.el-input__inner {
        color: #fff;
        background: none;
        border: none;
        font-size: 16px;
        text-align: center;
      }
    }
    .card_footer {
      padding-right: 20px;
      button {
        float: right;
      }
    }
    ul {
      padding: 0 20px;
      li {
        margin-bottom: 5px;
        list-style: none;
        text-align: left;
        .sub-title {
          color: #8492a6;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
