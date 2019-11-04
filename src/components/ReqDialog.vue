<template>
  <el-dialog
    title="新增接口信息"
    :visible.sync="showDialog"
    width="60%"
    center
    @close="cancelClick"
    @open="opened"
  >
    <div class="dia_contain">
      <div class="left_contain">
        <vue-json-editor v-model="form.code" :showBtns="false" v-if="form.type!=='view'"></vue-json-editor>
        <el-input
          type="textarea"
          autosize
          placeholder="请输入返回数据"
          v-model="form.code"
          v-if="form.type==='view'"
          disabled
        ></el-input>
      </div>
      <div class="right_contain">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="接口名称">
            <el-input v-model="form.name" :disabled="form.type==='view'"></el-input>
          </el-form-item>
          <el-form-item label="url">
            <el-input v-model="form.url" :disabled="form.type==='view'"></el-input>
          </el-form-item>
          <el-form-item label="Method">
            <el-select v-model="form.method" placeholder="请选择Method" :disabled="form.type==='view'">
              <el-option label="GET" value="GET"></el-option>
              <el-option label="POST" value="POST"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="接口描述">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入接口描述"
              v-model="form.des"
              :disabled="form.type==='view'"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelClick">取 消</el-button>
      <el-button type="primary" @click="submitClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import vueJsonEditor from "vue-json-editor";
export default {
  name: "",
  components: {
    vueJsonEditor
  },
  data() {
    return {
      showDialog: false,
      form: {
        code: {
          code: 0,
          data: []
        }
      }
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    editData: {
      type: Object,
      required: false
    }
  },
  computed: {},
  watch: {
    show: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        this.showDialog = newV;
      },
      deep: true
    }
  },

  methods: {
    cancelClick() {
      this.$emit("cancel");
    },
    submitClick() {
      this.$emit("submit", this.form);
    },
    opened() {
      console.log(this.editData);
      if (this.editData.type) {
        this.form = this.editData;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.dia_contain {
  width: 100%;
  display: flex;
  .left_contain,
  .right_contain {
    flex: 1;
    height: 300px;
  }
  .left_contain {
  }
}
</style>
