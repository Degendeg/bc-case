<template>
  <nav class="navbar navbar-light">
    <ul class="nav breadcrumb">
      <li class="breadcrumb-item" v-for="(bc, index) in breadcrumbs" :key="index">
        <router-link :to="bc.link" :class="{ 'active' : (index == breadcrumbs.length - 1) }">{{bc.title}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'breadcrumb',

  computed: {
    ...mapGetters([
      'breadcrumbs',
    ])
  }
}
</script>

<style scoped>
  .active{
    color: #828282;
    pointer-events: none;
    cursor: default;
  }
  
  .navbar {
	width: 60vw;
  background: #e2e6ea !important;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
	margin-left: auto;
	margin-right: auto;
  }

  .nav {
    margin: 0;
  }

  .breadcrumb {
    background-color: transparent;
  }
</style>
