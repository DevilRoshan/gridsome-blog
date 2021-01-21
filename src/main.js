// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Vant from 'vant'
import 'vant/lib/index.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'mavon-editor/dist/markdown/github-markdown.min.css'

import util from './utils/util'

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  Vue.use(mavonEditor);
  Vue.use(ElementUI);
  Vue.use(Vant);

  Vue.prototype.$isClient = isClient;

  Vue.prototype.$markdown = function (value) {
    if(process.isClient){
      return mavonEditor.markdownIt.render(value)
    }
  }

  Vue.prototype.$share = function (message) {
    if (!message) {
      message = window.location
    } else {
      message = window.location.origin + message
    }
    if (util.copy(message)) {
      Vue.prototype.$confirm('链接已复制,去分享给好友吧!!', '分享', {
        showCancelButton: false,
        showClose: false,
        type: 'success'
      })
    } else {
      Vue.prototype.$confirm('链接复制失败,可能因为浏览器不兼容', '分享', {
        showCancelButton: false,
        showClose: false,
        type: 'warning'
      })
    }
  }

  Vue.prototype.$util = util

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);

}
