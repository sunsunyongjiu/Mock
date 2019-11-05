<template>
  <div>
    <mock-header></mock-header>
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
            <!-- <el-menu-item index="2-2" @click="batchDelete">批量删除</el-menu-item> -->
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
          <el-table-column prop="des" label="描述" width="180"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="checkClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="editClick(scope.row,scope.$index)">编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click.native.prevent="deleteRow(scope.$index, tableData)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <footer class="mock_footer">
        <el-button type="primary" class="subBtn" @click="upload">
          同步
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </footer>
    </div>

    <req-dialog :show="showDialog" @cancel="cancelClick" @submit="dialogSure" :editData="editData"></req-dialog>
  </div>
</template>

<script>
import reqDialog from "@/components/ReqDialog";
import mockHeader from "@/components/Header";
export default {
  name: "home",
  components: {
    reqDialog,
    mockHeader
  },
  data() {
    return {
      tableData: [],
      activeIndex: "1",
      showDialog: false,
      editData: {},
      editIndex: "",
      model: ""
    };
  },
  mounted() {
    console.log(this.$route.query);
    this.model = this.$route.query.model.slice(
      1,
      this.$route.query.model.length
    );
    this.getList({
      model: this.$route.query.model.slice(1, this.$route.query.model.length)
    });
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    getList(param) {
      this.$api.getList(param).then(res => {
        this.tableData = res.data;
      });
    },
    handleSelect() {},
    submit() {
      //同步接口信息
    },
    addReq() {
      this.editData = {};
      this.showDialog = true;
    },
    cancelClick() {
      this.showDialog = false;
    },
    dialogSure(data) {
      if (data.type) {
        delete data["key"];
        this.showDialog = false;
        this.tableData[this.editIndex] = data;
      } else {
        let obj = {
          model: this.model,
          data: data
        };
        this.$api.save(obj).then(res => {
          this.showDialog = false;
          if (res.code === 0) {
            this.getList({ model: this.model });
          } else {
            this.$message.error(res.message);
          }
        });
      }
    },
    test() {
      this.$api.test({ name: 1 }).then(res => {
        console.log(res);
      });
    },
    checkClick(data) {
      data.type = "view";
      this.editData = data;
      this.showDialog = true;
    },
    editClick(data) {
      console.log(data);
      data.type = "edit";
      this.editData = data;
      this.showDialog = true;
    },
    upload() {
      let obj = {
        model: this.model,
        data: this.tableData
      };
      this.$api.edit(obj).then(res => {
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
  border-radius: 4px;
  margin: 20px 0;
  position: relative;
}
.mock_section {
}
.mock_footer {
  margin-top: 10px;
}
.subBtn {
  float: right;
}
</style>