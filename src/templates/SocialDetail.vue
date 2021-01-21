<template>
  <Layout>
    <el-card shadow="never" style="min-height: 400px; margin-bottom: 20px">
      <div slot="header" class="clearfix">
        <span>{{ user.id }}</span>
        <el-button
          @click="$router.go(-1)"
          style="float: right; padding: 3px 0"
          type="text"
          icon="el-icon-d-arrow-left"
          >返回</el-button
        >
      </div>
      <el-row>
        <el-col :span="9" style="padding: 0px 10px 20px 0px">
          <img :src="user.avatarUrl" style="width: 100%; border-radius: 5px" />
          <div style="padding: 10px">
            <font style="font-size: 26px; line-height: 40px; font-weight: 600"
              >{{ user.name }}
              <br />
            </font>
            <font
              style="font-size: 20px;font-style: normal;font-weight: 300;line-height: 35px;color: #666;"
              >{{ user.id }}
              <br />
            </font>
            <font
              style="font-size: 14px; line-height: 20px; color: #606266"
              v-if="user.location"
            >
              <i class="el-icon-location-outline"></i>&nbsp;&nbsp;{{ user.location }}
              <br />
            </font>
            <font
              style="font-size: 14px; line-height: 20px; color: #606266"
              v-if="user.email"
            >
              <i class="el-icon-message"></i>&nbsp;&nbsp;{{ user.email }}
              <br />
            </font>
            <font style="font-size: 14px; color: #606266" v-if="user.blog">
              <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
              <a :href="$util.addHttp(user.blog)" target="_blank">{{ user.blog }}</a>
              <br />
            </font>
          </div>
        </el-col>
        <el-col :span="15" style="padding: 0px 20px 20px 10px">
          <div
            style="width: 100%;min-height: 300px;border-radius: 5px;border: 1px solid #ebeef5;padding: 10px;font-size: 16px;color: #6a737d;"
            v-if="user.bio"
          >
            {{ user.bio }}
          </div>
          <div
            style="width: 100%;min-height: 300px;border-radius: 5px;border: 1px solid #ebeef5;padding: 30px;text-align: center;font-size: 30px;color: #dddddd;"
            v-else
          >
            <b>◔ ‸◔？没有简介</b>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </Layout>
</template>
<page-query>

query($id: ID!) {
  user(id: $id) {
    avatarUrl: avatar_url,
    htmlUrl: html_url,
    blog,
    location,
    bio,
    followers,
    following,
    publicRepos: public_repos,
    email,
    name,
    id
  }
}
</page-query>
<script>
export default {
  name: "SocialDetail",
  computed: {
    user() {
      return this.$page.user;
    },
  },
};
</script>

<style>
</style>