import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    users: null,
    albums: null,
    photos: null,

    crumbs: []
  },

  mutations: {
    initializeData (state) {
      state.isLoading = true
      const favorites = JSON.parse(window.localStorage.getItem('favorites')) || []

      Promise.all([
        axios.get('https://jsonplaceholder.typicode.com/users'),
        axios.get('https://jsonplaceholder.typicode.com/albums'),
        axios.get('https://jsonplaceholder.typicode.com/photos'),
      ])
        .then(result => {
          state.users = result[0].data.map(user => {
            user.isFavorite = favorites.indexOf(user.id) > -1
            return user
          })
          state.albums = result[1].data
          state.photos = result[2].data

          state.isLoading = false
        })
    },

    addBreadcrumb (state, crumbs) {
      crumbs.forEach(crumb => {
        state.crumbs = state.crumbs.filter(c => {
          return c.level < crumb.level
        })
        state.crumbs.push(crumb)
      })
    },

    removeFavorite (state, id) {
      state.users.find(u => u.id == id).isFavorite = false
    },

    addFavorite (state, id) {
      state.users.find(u => u.id == id).isFavorite = true
    },

    updateFavoritesStore (state) {
      window.localStorage.setItem('favorites', JSON.stringify(
        state.users
          .filter(user => user.isFavorite)
          .map(user => user.id))
      )
    }
  },

  actions: {
    initialize ({commit}) {
      commit('initializeData')
    },

    setBreadcrumb ({commit}, crumbs) {
      commit('addBreadcrumb', crumbs)
    },

    removeFavorite({commit}, userId) {
      commit('removeFavorite', userId)
      commit('updateFavoritesStore')
    },

    addFavorite({commit}, userId) {
      commit('addFavorite', userId)
      commit('updateFavoritesStore')
    }
  },

  getters: {
    users: (state) => {
	  if (state.users) {
        return state.users
	  }
    },

    user: (state) => (id) => {
	  if (state.users) {
        return state.users.find(u => u.id == id)
	  }
    },

    albums: (state) => (userId) => {
	  if (state.albums) {
        return state.albums.filter(a => a.userId == userId)
	  }
    },

    album: (state) => (id) => {
	  if (state.albums) {
        return state.albums.find(a => a.id == id)
	  }
    },

    photos: (state) => (albumId) => {
	  if (state.photos) {
        return state.photos.filter(p => p.albumId == albumId)
	  }
    },

    pageIsLoading: (state) => {
	  if (state) {
        return state.pageIsLoading
	  }
    },

    breadcrumbs: (state) => {
	  if (state) {
        return state.crumbs.sort((a, b) => {
          return a.level < b.level
        })
	  }
    }
  }
})
