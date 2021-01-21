<template>
  <section
    class="page-header"
    :style="'background-image: linear-gradient(120deg, ' +blogConfig.backgroundColorLeft +', ' +blogConfig.backgroundColorRight +');color: ' +blogConfig.fontColor +';'"
  >
    <div style="position: absolute; top: 20px; right: 20px; z-index: 2">
      <el-tooltip
        effect="dark"
        :content="fullButton.full ? '退出' : '全屏'"
        placement="bottom-end"
      >
        <el-button
          @click="full"
          :icon="fullButton.full ? 'el-icon-close' : 'el-icon-rank'"
          circle
        ></el-button>
      </el-tooltip>
    </div>
    <div
      v-for="(item, index) in randomIcon"
      :key="'ri' + index"
      :style="'position:absolute; top:' +item.top +'px; left:' +item.left +'px; z-index:1;'"
    >
      <font :style="'font-size: ' + item.size + 'px;color:#fff;'">
        <b>♪</b>
      </font>
    </div>
    <h1 class="project-name">{{ blogConfig.blogTitle }}</h1>
    <h2 class="project-tagline">{{ blogConfig.blogDescribe }}</h2>
    <a
      :href="'https://github.com/' + blogConfig.githubUsername"
      class="btn"
      target="_blank"
      >GitHub主页</a
    >
    <a
      href="https://github.com/GitHub-Laziji/vblog"
      class="btn"
      target="_blank"
      v-if="!blogConfig.mini"
      >博客源码</a
    >
  </section>
</template>

<static-query>
query {
  blogConfig(id: "0"){
    backgroundColorLeft,
    backgroundColorRight,
    blogTitle,
    blogDescribe,
    githubUsername,
    fontColor
  }
}
</static-query>

<script>
export default {
  name: "Header",
  data() {
    return {
      randomIcon: [],
      fullButton: {
        full: false,
      },
    };
  },
  mounted() {
    let width = window.innerWidth;
    for (let i = 0; i < 12; i++) {
      let temp = {};
      let left = this.$util.randomInt(10, width - 310);
      if (left > width / 2 - 150) {
        left += 300;
      }
      temp["left"] = left;
      temp["top"] = this.$util.randomInt(20, 300);
      temp["size"] = this.$util.randomInt(20, 40);
      this.randomIcon.push(temp);
    }
  },
  computed: {
    blogConfig() {
      return this.$static.blogConfig;
    },
  },
  methods: {
    full() {
      if (!this.fullButton.full) {
        this.$util.fullScreen()
        this.fullButton.full = true;
      } else {
        this.$util.fullExit();
        this.fullButton.full = false;
      }
    },
  },
};
</script>

<style>

</style>