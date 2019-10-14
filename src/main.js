import Vue from 'vue'
import App from './App.vue'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import router from './routes'

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')