<template>
  <header>
    <section>
      <div class="pic">
        <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
      </div>
      <div>
        <div>本地Mock平台</div>
        <div>仅作为开发阶段调试使用</div>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
    };
  }
};
</script>

<style lang="less" scoped>
header {
  width: 100%;
  height: 100px;
  background: rgba(25, 137, 250, 0.5);
  section {
    width: 100%;
    height: 100%;
    max-width: 1300px;
    padding: 0 20px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .pic {
      margin-right: 10px;
      & + div {
        color: #fff;
        div:nth-child(1) {
          font-size: 16px;
          line-height: 26px;
        }
        div:nth-child(2) {
          font-size: 12px;
        }
      }
    }
    div {
      text-align: left;
    }
  }
}
</style>
