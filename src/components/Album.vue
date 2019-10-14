<template>
  <div>
    <div class="container">
      <div class="header">
        <h1><strong>{{album.title}}</strong></h1>
        <p><i>{{photos.length}} photos</i></p>
		<br />
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-4 col-sx-12" v-for="(photo, index) in photos" :key="photo.id" @click="showPhoto(index)">
          <div class="card" :ref="`grid-img-${index}`" >
            <img :src="photo.url" class="card-img-top" style="height: 220px">
            <div class="card-body">
              <h5 class="card-description">{{photo.title}}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <image-viewer ref="image-viewer" v-model="photos"
                  :selectedIndex="displayedPhotoIndex"
                  :show="showViewer"
                  @closed="handleClose"
                  @nextImg="onNextImg"
                  @prevImg="onPrevImg"/>
  </div>
</template>

<script>
import ImageViewer from './ImageViewer.vue'

export default {
  name: 'Album',

  data () {
    return {
      showViewer: false,
      displayedPhotoIndex: 0
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
    showPhoto (index) {
      const viewportOffset = this.$refs[`grid-img-${index}`][0].getBoundingClientRect()

      this.$refs['image-viewer'].setStartingOffset(
        viewportOffset.left,
        viewportOffset.top
      )

      this.showViewer = true
      this.displayedPhotoIndex = index
    },

    handleClose () {
      this.showViewer = false
    },

    onNextImg () {
      this.displayedPhotoIndex++
    },

    onPrevImg () {
      this.displayedPhotoIndex--
    }
  },

  components: {
    ImageViewer
  }
}
</script>

<style scoped>
  @keyframes display {
    100% { top: 0%; }
  }

  [class*="col-"] {
    margin-bottom: 30px;

    .card {
      position: relative;
      height: 100%;
      cursor: pointer;
      overflow: hidden;

      &:hover {
        .card-body {
          animation: display .2s ease forwards;
        }
      }

      .card-body {
        display: flex;
        position: absolute;
        background-color: rgba(0, 0, 0, .25);
        height: 100%;
        width: 100%;
        color: #fff;
        flex-direction: column;
        justify-content: flex-end;

        top: 100%;

        .card-title { flex: 1; }
      }
    }
  }
</style>
