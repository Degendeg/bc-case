<template>
  <div class="col-md-3 col-sm-4 col-sx-12">
    <div class="card">
      <div class="card-body">
        <p class="card-title">
          <router-link :to="{ name: 'user', params: { userId: value.id }}">
            <strong>{{value.name}}</strong>
            <br />
            {{value.company.name}}
            <br />
            {{value.email}}
          </router-link>
          <span class="favorite">
            <i class="fas fa-star" v-if="value.isFavorite" @click="removeFavorite()"></i>
            <i class="far fa-star" v-else @click="addFavorite()"></i>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',

  props: {
    value: {
      type: Object,
      required: true
    }
  },

  methods: {
    addFavorite() { this.$store.dispatch('addFavorite', this.value.id) },
    removeFavorite() { this.$store.dispatch('removeFavorite', this.value.id) }
  }
}
</script>

<style scoped>
  .favorite {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
  }
  .card {
	background: #cce5ff;
    max-width: 300px;
    margin-bottom: 30px;

    .card-title {
	  color: #3f4d8b;
      display: flex;
      font-size: 1em;
      justify-content: space-between;

      i.fas { color: #f1c40f; }

      i:hover {
        color: #f1c40f;
        cursor: pointer;
      }
    }
  }
</style>
