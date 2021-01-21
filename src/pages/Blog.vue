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
          style="margin-left: 10px"
          icon="el-icon-share"
          type="warning"
          plain
          circle
        ></el-button>
        <!-- <el-button
          type="primary"
          icon="el-icon-edit"
          round
          plain
          style="float: right"
          @click="goAdd"
          >写博文</el-button
        > -->
      </el-card>

      <div v-if="blogs && blogs.length > 0">
        <el-card
          shadow="hover"
          v-for="(item, index) in blogs"
          :key="'p' + index"
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
                    <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                    {{ item.node.title }}
                  </a>
                </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right">
                  <el-button
                    @click="$share('/blog/detail/' + item.node.id)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-share"
                  ></el-button>
                  <!-- <el-button
                    @click="editBlog(index)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-edit"
                    v-if="token"
                  ></el-button>
                  <el-button
                    @click="deleteBlog(index)"
                    style="padding: 3px 0"
                    type="text"
                    icon="el-icon-delete"
                    v-if="token"
                  ></el-button> -->
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
        </el-card>
        <div style="text-align: center">
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
        v-if="!blogs || blogs.length == 0"
      >
        <font style="font-size: 30px; color: #dddddd">
          <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>

<page-query>
query($page: Int) {
	allGist(perPage: 5, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id,
        description,
        updateTime: updated_at,
        title
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
      blogsId: new Set([]),
    };
  },
  computed: {
    blogs() {
      return this.$page.allGist.edges.filter(
        (v) => !this.blogsId.has(v.node.id)
      );
    },
    query() {
      const { totalPages, currentPage } = this.$page.allGist.pageInfo;
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
      if (page === 1) {
        this.$router.push("/blog/");
        return;
      }
      this.$router.push("/blog/" + page);
    },
    search() {
      this.blogsId = new Set(
        this.$page.allGist.edges
          .filter((v) => v.node.title.indexOf(this.searchKey) < 0)
          .map((v) => v.node.id)
      );
    },
    goDetails(id) {
      this.$router.push("/blog/detail/" + id);
    },
    goGithub(url) {
      window.open(url);
    },
  },
};
</script>

<style>
</style>