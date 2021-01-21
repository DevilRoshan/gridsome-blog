<template>
  <Layout>
    <div style="min-height: 600px">
      <el-card shadow="never" style="min-height: 400px">
        <div slot="header">
          <ClientOnly>
            <el-row>
            <el-col :span="12">
              <span>{{ project.name }}</span>
            </el-col>
            <el-col :span="12">
              <div style="text-align: right">
                <el-button
                  @click="$share()"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-share"
                  >分享</el-button
                >
                <el-button
                  @click="goGithub(project.url)"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-back"
                  >前往GitHub</el-button
                >
                <el-button
                  @click="more"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-more-outline"
                  >更多项目</el-button
                >
              </div>
            </el-col>
          </el-row>
          </ClientOnly>
        </div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71">
          发布 {{ $util.utcToLocal(project.createTime) }} <br />
          更新 {{ $util.utcToLocal(project.updateTime) }}
        </div>
        <div
          style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 20px 0px 0px 0px;"
        >
          {{ project.description }}
        </div>
        <div
          style="font-size: 1.1rem;color: #303133;padding: 15px 0px 15px 0px;border-bottom: 1px solid #e4e7ed;"
        >
          <el-row>
            <el-col :span="16" style="padding-top: 5px">
              <el-tooltip
                effect="dark"
                :content="'star ' + project.stargazersCount"
                placement="bottom"
              >
                <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
              </el-tooltip>
              {{ project.stargazersCount }}
              <el-tooltip
                effect="dark"
                :content="'watch ' + project.watchersCount"
                placement="bottom"
              >
                <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{ project.watchersCount }}
              <el-tooltip
                effect="dark"
                :content="'fork ' + project.forksCount"
                placement="bottom"
              >
                <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{ project.forksCount }}
            </el-col>
            <el-col :span="8" style="text-align: right">
              <el-tag
                size="small"
                type="danger"
                style="margin-right: 5px"
                v-if="project.license"
                >{{ project.license.spdx_id }}</el-tag
              >
              <el-tag
                size="small"
                type="success"
                style="margin-right: 5px"
                v-if="project.language"
                >{{ project.language }}</el-tag
              >
            </el-col>
          </el-row>
        </div>
        <div
          v-html="$markdown(project.content)"
          v-if="project.content"
          class="markdown-body"
          style="padding-top: 20px"
        ></div>
        <div
          v-if="!project.content"
          style="padding: 20px 0px 20px 0px; text-align: center"
        >
          <font style="font-size: 30px; color: #dddddd">
            <b>还没有介绍 (╯°Д°)╯︵ ┻━┻</b>
          </font>
        </div>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>

query($id: ID!) {
	project(id: $id) {
    forksCount: forks_count,
    watchersCount: watchers_count,
    stargazersCount: stargazers_count,
    description,
    updateTime: updated_at,
    createTime: created_at,
    name,
    content: readme_content,
    url: html_url,
    id
    language,
    license {
      spdx_id
    }
  }
}
</page-query>

<script>
export default {
  name: "ProjectDetail",
  computed: {
    project() {
      return this.$page.project;
    },
  },
  methods: {
    goGithub(url) {
      window.open(url);
    },
    more() {
      this.$router.push("/project/");
    },
  },
};
</script>

<style>
</style>