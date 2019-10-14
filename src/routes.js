import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './components/Main.vue'
import User from './components/User.vue'
import Album from './components/Album.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    },
    {
      path: '/album/:albumId',
      name: 'album',
      component: Album
    }
  ]
})