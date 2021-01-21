<template>
  <Layout>
    <div style="min-height: 600px">
      <el-card shadow="never" style="min-height: 400px">
        <div slot="header">
          <ClientOnly>
          <el-row>
            <el-col :span="12">
              <span>{{ blog.title }}</span>
            </el-col>
            <el-col :span="12">
              <div style="text-align: right">
                <el-button
                  @click="$share()"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-share">
                  分享
                  </el-button>
                <el-button
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-more-outline"
                  @click="more">
                更多博客
                </el-button>
              </div>
            </el-col>
          </el-row></ClientOnly>
        </div>
        <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
          发布 {{ $util.utcToLocal(blog.createTime) }} <br />
          更新 {{ $util.utcToLocal(blog.updateTime) }}
        </div>
        <div
          style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #e4e7ed;padding: 5px 0px 5px 0px;"
        >
          <pre style="font-family: '微软雅黑'">{{ blog.description }}</pre>
        </div>
        <div
          v-html="$markdown(blog.content)"
          class="markdown-body"
          style="padding-top: 20px"
        ></div>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>

query($id: ID!) {
	gist(id: $id) {
    id,
    content,
    description,
    createTime: created_at,
    updateTime: updated_at,
    title
  }
}
</page-query>

<script>
export default {
  name: "BlogDetail",
  computed: {
    blog() {
      return this.$page.gist;
    },
  },
  methods: {
    more() {
      this.$router.push("/blog/");
    },
  },
};
</script>

<style>
</style>