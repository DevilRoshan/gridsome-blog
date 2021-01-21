<template>
  <Layout><div><ClientOnly>
    <el-card
      shadow="never"
      style="min-height: 400px; margin-bottom: 20px; padding: 0px 0px 20px 0px"
    >
      <el-tabs v-model="activeTab" type="card" @tab-click="changeTab">
        <el-tab-pane
          :label="'粉丝 ' + user.followers"
          name="followers"
          style="padding: 5px"
        >
          <div v-loading="followers.loading">
            <div v-if="followers.list.length">
              <el-row style="min-height: 200px">
                <el-col
                  :span="8"
                  v-for="(item, index) in followers.list"
                  :key="'followers' + index"
                  style="padding: 10px"
                >
                  <el-card
                    shadow="hover"
                    style="font-size: 13px; color: #606266; line-height: 20px"
                  >
                    <i class="el-icon-star-off"></i>&emsp;
                    <g-link
                      :to="'/social/detail/'+item.node.name"
                      style="text-decoration: none; cursor: pointer"
                      >{{ item.node.name }}
                    </g-link>
                    <br />
                    <i class="el-icon-message"></i>&emsp;
                    <a
                      :href="item.node.htmlUrl"
                      target="_blank"
                      style="text-decoration: none; cursor: pointer"
                      >TA的主页</a
                    >
                    <br />
                    <img
                      :src="item.node.avatarUrl"
                      style="width: 100%; border-radius: 5px; margin-top: 5px"
                    />
                  </el-card>
                </el-col>
              </el-row>
              <div style="text-align: center; margin-top: 10px">
                <el-pagination
                  @current-change="onSelect"
                  background
                  layout="prev, pager, next"
                  :current-page.sync="followers.query.page"
                  :page-size="followers.query.pageSize"
                  :total="followers.query.pageNumber * followers.query.pageSize"
                >
                </el-pagination>
              </div>
            </div>
            <div
              style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center;"
              v-else
            >
              <font style="font-size: 30px; color: #dddddd">
                <b>(￢_￢) 没有一个粉丝</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          :label="'关注 ' + user.following"
          name="following"
          style="padding: 5px"
        >
          <div>
            <div v-if="following.list.length">
              <el-row style="min-height: 200px">
                <el-col
                  :span="8"
                  v-for="(item, index) in following.list"
                  :key="'following' + index"
                  style="padding: 10px"
                >
                  <el-card
                    shadow="hover"
                    style="font-size: 13px; color: #606266; line-height: 20px"
                  >
                    <i class="el-icon-star-off"></i>&emsp;
                    <g-link
                      :to="'/social/detail/'+item.node.name"
                      style="text-decoration: none; cursor: pointer"
                      >{{ item.node.name }}
                    </g-link>
                    <br />
                    <i class="el-icon-message"></i>&emsp;
                    <a
                      :href="item.node.htmlUrl"
                      target="_blank"
                      style="text-decoration: none; cursor: pointer"
                      >TA的主页
                    </a>
                    <br />
                    <img
                      :src="item.node.avatarUrl"
                      style="width: 100%; border-radius: 5px; margin-top: 5px"
                    />
                  </el-card>
                </el-col>
              </el-row>
              <div style="text-align: center; margin-top: 10px">
                <el-pagination
                  @current-change="onSelect"
                  background
                  layout="prev, pager, next"
                  :current-page.sync="following.query.page"
                  :page-size="following.query.pageSize"
                  :total="following.query.pageNumber * following.query.pageSize"
                >
                </el-pagination>
              </div>
            </div>
            <div
              style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center;"
              v-else
            >
              <font style="font-size: 30px; color: #dddddd">
                <b>(￢_￢) 还没有关注一个人</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </ClientOnly></div></Layout>
</template>

<page-query>
query($page: Int) {
  user(id: "GitHub-Laziji"){
    followers,
    following
  }
	allUserFollowing(perPage: 9, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
				name: login,
        avatarUrl: avatar_url,
        htmlUrl: html_url,
      }
    }
  }
  allUserFollowers(perPage: 9, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
				name: login,
        avatarUrl: avatar_url,
        htmlUrl: html_url,
      }
    }
  }
}
</page-query>

<script>
export default {
  name: "Social",
  data() {
    return {
      activeTab: "followers",
    };
  },
  mounted() {
    let set = new Set(["followers", "following"]);
    try {
      let tab = this.$router.history.current.query.tab;
      console.log(tab);
      if (!tab || !set.has(tab)) {
        return "followers";
      }
      this.activeTab = tab;
    } catch (e) {}
  },
  computed: {
    followers() {
      const allUserFollowers = this.$page.allUserFollowers;
      return {
        list: allUserFollowers.edges,
        query: {
          pageSize: 9,
          pageNumber: allUserFollowers.pageInfo.totalPages,
          page: allUserFollowers.pageInfo.currentPage,
        },
      };
    },
    following() {
      const allUserFollowing = this.$page.allUserFollowing;
      return {
        list: allUserFollowing.edges,
        query: {
          pageSize: 9,
          pageNumber: allUserFollowing.pageInfo.totalPages,
          page: allUserFollowing.pageInfo.currentPage,
        },
      };
    },
    user() {
      return this.$page.user;
    },
  },
  methods: {
    changeTab(child) {
      if (child.name === this.$router.history.current.query.tab) {
        return;
      }
      this.$router.push("/social/?tab=" + child.name);
    },
    onSelect(page) {
      if (page === 1) {
        this.$router.push("/social/?tab=" + this.activeTab);
        return;
      }
      this.$router.push("/social/" + page + "?tab=" + this.activeTab);
    },
  },
};
</script>

<style>
</style>