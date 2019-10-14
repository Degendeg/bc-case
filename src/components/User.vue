<template>
  <div class="container">
    <div class="header">
      <h1>
        <strong>{{user.name}}</strong>
        <span class="favorite">
          <i class="fas fa-star" v-if="user.isFavorite" @click="removeFavorite()"></i>
          <i class="far fa-star" v-else @click="addFavorite()"></i>
        </span>
      </h1>
      <p><i>{{user.company.name}} – {{user.email.toLowerCase()}} – {{user.address.street}} {{user.address.suite}}, {{user.address.zipcode}} {{user.address.city}}</i></p>
	  <br />
	  <h2 class="album-header"><strong>Album</strong></h2>
	  <br />
    </div>
    <div class="row">
      <div class="col-md-3 col-sm-4 col-sx-12" v-for="album in albums" :key="album.id">
		<router-link class="card-link" :to="{ name: 'album', params: { albumId: album.id }}">
			<div class="card">
			  <div class="card-body">
				<h5 class="card-title">{{album.title}}</h5>
			  </div>
			</div>
		</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',

  created () {
    this.$store.dispatch('setBreadcrumb', [
      {
        level: 1,
        title: 'Start',
        link: this.$router.resolve({ name: 'main' }).route.path
      },
      {
        level: 2,
        title: `User - ${this.$store.getters.user(this.$route.params.userId).name}`,
        link: this.$route.path
      }
    ])
  },

  computed: {
    user () {
      const userId = this.$route.params.userId
      return this.$store.getters.user(userId)
    },

    albums () {
      return this.$store.getters.albums(this.user.id)
    }
  },

  methods: {
    addFavorite() { this.$store.dispatch('addFavorite', this.user.id) },
    removeFavorite() { this.$store.dispatch('removeFavorite', this.user.id) }
  }
}
</script>

<style scoped>
  i.fas { color: #f1c40f; }

  i:hover {
    color: #f1c40f;
    cursor: pointer;
  }
  
  .favorite {
	margin-left: 1%;
  }
  
  .album-header {
	margin-left: -90%;
  }
  
  .card {
	background: #cce5ff;
  }
  
  .card-title {
    color: #3f4d8b;
	font-weight: bold;
  }

  [class*="col-"] {
    margin-bottom: 25px;
  }
</style>
