<template>
  <div>
    <div class="container">
      <div class="header">
        <h1>{{album.title}}</h1>
        <p class="photos-amount">{{photos.length}} photos</p>
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-4 col-sx-12" v-for="(photo, index) in photos" :key="photo.id">
          <div class="card">
            <img :src="photo.url" v-gallery:photos class="card-img-top">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import gallery from 'img-vuer'

Vue.use(gallery,{
  isIndexShow: false,
})

window.addEventListener("keydown", e => {
	const $imgVuer = Vue.prototype.$imgVuer;
	if (e.key == 'ArrowRight') {
		$imgVuer.next()
	}
	if (e.key == 'ArrowLeft') {
		$imgVuer.prev()
	}
	if (e.key == 'Escape') {
		$imgVuer.close()
	}
})

export default {
  name: 'Album',

  data () {
    return {
    }
  },

  created () {
    const album = this.$store.getters.album(this.$route.params.albumId)
    this.$store.dispatch('setBreadcrumb', [
      {
        level: 1,
        title: 'Start',
        link: this.$router.resolve({ name: 'main' }).route.path
      },
      {
        level: 2,
        title: `User - ${this.$store.getters.user(album.userId).name}`,
        link: this.$router.resolve({ name: 'user', params: { userId: album.userId } }).route.path
      },
      {
        level: 3,
        title: `Album - ${album.title}`,
        link: this.$route.path
      }
    ])
  },

  computed: {
    photos () {
      const albumId = this.$route.params.albumId
      return this.$store.getters.photos(albumId)
    },

    album () {
      const albumId = this.$route.params.albumId
      return this.$store.getters.album(albumId)
    }
  },

  methods: {
  },

  components: {
  }
}
</script>

<style scoped>
  .header {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  [class*="col-"] {
    margin-bottom: 30px;

    .card {
      position: relative;
      height: 100%;
      overflow: hidden;
    }
  }

  .card-img-top {
    cursor: pointer;
	height: 200px;
  }

  .photos-amount {
    font-style: italic;
  }
</style>
<style>
  .close-btn {
    font-size: 2.4rem !important;
    font-weight: bold !important;
    margin: 25px !important;
    cursor: pointer !important;
  }
  .slider {
    background-color: rgba(17, 17, 17, 0.95) !important;
  }
</style>