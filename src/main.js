// import library and config
import '@utils/initFontSize.js'
import pad from '@/config/pad'
import Vue from 'vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/config/api'
import '@comps'
import '@filters'
import App from '@/App'
import store from '@/config/store'
import 'swiper/dist/css/swiper.css'
import Swiper from 'swiper/dist/js/swiper.js'

window.Swiper = Swiper
Vue.use(Mint)

Vue.prototype.pad = pad

// set page title
Vue.mixin({
  created: function () {
    if (this.$options.title) {
      store.commit('updatePageTitle', this.$options.title)
    }
  }
})

// pass the header background color to pad
pad.setStatusBarColor('#c63435')

// create the vue root instance
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
