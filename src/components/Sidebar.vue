<template>
  <el-card shadow="never">
    <el-menu :default-active="active" @select="onSelect">
      <el-menu-item
        v-for="item in constantRouterMap"
        :key="item.node.path"
        :index="item.node.path"
      >
        <i :class="item.node.meta.icon"></i>
        <span slot="title">{{ item.node.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </el-card>
</template>

<static-query>
query {
  allBlogRouter {
    edges {
      node {
        path,
        meta {
          type,
          icon,
          title,
          mini
        }
      }
    }
  }
}
</static-query>

<script>
export default {
  name: 'Sidebar',
  computed: {
    constantRouterMap() {
      return this.$static.allBlogRouter.edges;
    },
    active() {
      return `/${this.$route.path.split('/')[1]}`
    }
  },
  methods: {
    onSelect(index) {
      this.$router.push(index);
    },
  },
};
</script>

<style>
</style>