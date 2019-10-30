<template>
  <div class="mock_container">
    <header class="mock_header">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">接口列表</el-menu-item>
        <el-submenu index="2">
          <template slot="title">操作</template>
          <el-menu-item index="2-1" @click="addReq">新增接口</el-menu-item>
          <el-menu-item index="2-2">删除接口</el-menu-item>
          <el-menu-item index="2-3" @click="test">测试</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" disabled>暂未开放</el-menu-item>
      </el-menu>
    </header>
    <section class="mock_section">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column fixed prop="name" label="接口名称" width="150"></el-table-column>
        <el-table-column fixed prop="method" label="method" width="150"></el-table-column>
        <el-table-column prop="url" label="url"></el-table-column>
        <el-table-column prop="des" label="描述" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <req-dialog :show="showDialog" @cancel="cancelClick" @submit="dialogSure"></req-dialog>
  </div>
</template>

<script>
import reqDialog from "@/components/ReqDialog";
export default {
  name: "home",
  components: {
    reqDialog
  },
  data() {
    return {
      tableData: [],
      activeIndex: "1",
      showDialog: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$api.getList().then(res => {
        this.tableData = res.data;
      });
    },
    handleSelect() {},
    submit() {
      //同步接口信息
    },
    addReq() {
      this.showDialog = true;
    },
    cancelClick() {
      console.log(1);
      this.showDialog = false;
    },
    dialogSure(data) {
      this.$api.save(data).then(res => {
        this.showDialog = false;
        if (res.code === 0) {
          this.getList();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    test() {
      this.$api.test({ name: 1 }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.mock_container {
  width: 100%;
  max-width: 1366px;
  margin: 0 auto;
  height: 100%;
}
.mock_header {
  width: 100%;
  height: 50px;
  background: #252d47;
  border-radius: 4px;
  margin: 20px 0;
}
.mock_section {
}
.sub_btn {
  float: right;
  height: 100%;
}
</style>