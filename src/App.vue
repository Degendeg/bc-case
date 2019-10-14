<template>
  <div id="app">
    <breadcrumbs />
    <router-view v-if="!pageIsLoading"></router-view>
    <div class="loader" v-else>Loading..</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumbs from './components/Breadcrumbs.vue'

export default {
  name: 'app',

  computed: {
    ...mapGetters([
      'pageIsLoading'
    ])
  },

  created () {
    this.$store.dispatch('initialize')
  },

  components: {
    Breadcrumbs
  }
}
</script>

<style>
  #app {
    font-family: 'Lato', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2d3f52;
  }
  
  h1 {
	font-size: 2rem !important;
  }
  
  .container {
    .header {
      margin: 4em 0;
      h3 {
        display: inline;
        font-size: 1em;
        margin-bottom: 30px;
        font-style: italic;
      }
    }
  }

  .navbar {
    margin-bottom: 1em;
  }

  i:hover {
    color: #9CADAE;
	cursor: pointer;
  }
</style>