<template>
  <div class="container">
    <h1>Favorites</h1>
	<hr />
    <div class="row">
      <user-card v-model="favoriteUsers()[i]"
                 v-for="(user, i) in favoriteUsers()"
                 :key="user.id"
      />
    </div>

    <h1>Users</h1>
	<hr />
    <div class="row">
      <user-card v-model="nonFavoritesUsers()[i]"
                 v-for="(user, i) in nonFavoritesUsers()"
                 :key="user.id"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './UserCard.vue'

export default {
  name: 'Main',

  data () {
    return {
      favorites: null
    }
  },

  created () {
    this.$store.dispatch('setBreadcrumb', [
      {
        level: 1,
        title: 'Start',
        link: this.$route.path
      }
    ])
  },

  computed: {
    ...mapGetters([
      'users',
    ])
  },

  methods: {
    favoriteUsers() {
	  if (this.users) {
        return this.users.filter(user => user.isFavorite)
	  }
    },

    nonFavoritesUsers() {
	  if (this.users) {
        return this.users.filter(user => !user.isFavorite)
	  }
    },
  },

  components: {
    UserCard
  }
}
</script>

<style scoped>
  .container {
    text-align: left;

    .row {
      margin: 1em 0;

      div {

      }
    }
  }
</style>
