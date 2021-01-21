// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  plugins: [],
  templates: {
    Project: [
      {
        path: '/project/detail/:id',
        component: './src/templates/ProjectDetail.vue'
      }
    ],
    User: [
      {
        path: '/social/detail/:id',
        component: './src/templates/SocialDetail.vue'
      }
    ],
    Gist: [
      {
        path: '/blog/detail/:id',
        component: './src/templates/BlogDetail.vue'
      }
    ]
  }
}
