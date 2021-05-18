import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Elm from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'


Vue.config.productionTip = false
Vue.use(Elm)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
