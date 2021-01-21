<template>
  <Layout>
    <div style="min-height: 600px">
      <el-card shadow="never" style="margin-bottom: 20px">
        <el-input
          placeholder="请输入关键字"
          v-model="searchKey"
          clearable
          style="width: 300px"
        ></el-input>
        <el-button
          @click="search"
          icon="el-icon-search"
          style="margin-left: 10px"
          circle
          plain
        ></el-button>
        <el-button
          @click="$share()"
          icon="el-icon-share"
          type="warning"
          style="margin-left: 10px"
          plain
          circle
        ></el-button>
      </el-card>

      <div v-if="projects && projects.length > 0">
        <el-card
          shadow="hover"
          v-for="(item, index) in projects"
          :key="'pro' + index"
          style="margin-bottom: 20px"
        >
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <a
                    style="text-decoration: none; cursor: pointer"
                    @click="goDetails(item.node.id)"
                  >
                    <i class="el-icon-service"></i>&nbsp;&nbsp;
                    {{ item.node.name }}
                  </a>
                </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right">
                  <el-button
                    @click="goGithub(item.node.url)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-back"
                    >前往GitHub</el-button
                  >
                  <el-button
                    @click="$share('/project/details/' + item.node.name)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-share"
                  ></el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
            最近更新 {{ $util.utcToLocal(item.node.updateTime) }}
          </div>
          <div
            style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px;"
          >
            {{ item.node.description }}
          </div>
          <div
            style="font-size: 1.1rem; color: #303133; padding: 10px 0px 0px 0px"
          >
            <el-row>
              <el-col :span="16" style="padding-top: 5px">
                <el-tooltip
                  effect="dark"
                  :content="'star ' + item.node.stargazersCount"
                  placement="bottom"
                >
                  <i
                    class="el-icon-star-off"
                    style="margin: 0px 5px 0px 0px"
                  ></i>
                </el-tooltip>
                {{ item.node.stargazersCount }}
                <el-tooltip
                  effect="dark"
                  :content="'watch ' + item.node.watchersCount"
                  placement="bottom"
                >
                  <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ item.node.watchersCount }}
                <el-tooltip
                  effect="dark"
                  :content="'fork ' + item.node.forksCount"
                  placement="bottom"
                >
                  <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ item.node.forksCount }}
              </el-col>
              <el-col :span="8" style="text-align: right">
                <el-tag style="margin-right: 5px" size="small" type="danger" v-if="item.node.license">{{
                  item.node.license.spdx_id
                }}</el-tag>
                <el-tag style="margin-right: 5px" size="small" type="success" v-show="item.node.language">{{
                  item.node.language
                }}</el-tag>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <div style="text-align: center" v-show="!this.searchKey">
          <el-pagination
            @current-change="list"
            background
            layout="prev, pager, next"
            :current-page.sync="query.page"
            :page-size="query.pageSize"
            :total="query.pageNumber * query.pageSize"
          >
          </el-pagination>
        </div>
      </div>

      <el-card
        shadow="never"
        style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center;"
        v-if="!projects || projects.length == 0"
      >
        <font style="font-size: 30px; color: #dddddd">
          <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>
query($page: Int) {
	allProject(perPage: 5, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        forksCount: forks_count,
        watchersCount: watchers_count,
        stargazersCount: stargazers_count,
        description,
        updateTime: updated_at,
        createTime: created_at,
        name,
        url: html_url,
        id,
        language,
        license {
          spdx_id
        }
      }
    }
  }
}
</page-query>

<script>
export default {
  name: "Project",
  data() {
    return {
      searchKey: "",
      projectsId: new Set([]),
    };
  },
  computed: {
    projects() {
      return this.$page.allProject.edges.filter(v => !this.projectsId.has(v.node.id));
    },
    query() {
      const { totalPages, currentPage } = this.$page.allProject.pageInfo;
      return {
        pageSize: 5,
        pageNumber: totalPages,
        page: currentPage,
      };
    },
  },
  methods: {
    list(page) {
      this.searchKey = "";
      if(page === 1){
        this.$router.push("/project/");
        return
      }
      this.$router.push("/project/" + page);
    },
    search() {
      this.projectsId = new Set(this.$page.allProject.edges.filter(v => v.node.name.indexOf(this.searchKey) < 0).map(v => v.node.id));
    },
    goDetails(id) {
      this.$router.push("/project/detail/" + id);
    },
    goGithub(url) {
      window.open(url);
    },
  },
};
</script>

<style>
</style>