<template>
  <div :class="['image-viewer-container', { 'show' : show }]">
    <span class="close-control" @click="close()">
      <i class="fas fa-times"></i>
    </span>
    <div class="image-viewer" :style="`left: ${startingOffset.x}px; top: ${startingOffset.y}px;`">
      <span class="switcher prev" @click="prevImg()" v-if="canShowPrevImg">
        <i class="fas fa-chevron-left"></i>
      </span>
      <span class="switcher next" @click="nextImg()" v-if="canShowNextImg">
        <i class="fas fa-chevron-right"></i>
      </span>
      <img :src="value[selectedIndex].url" class="card-img-top">
      <div class="description">
        {{value[selectedIndex].title}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'image-viewer',

  props: {
    value: {
      type: Array,
      required: true
    },
    selectedIndex: {
      type: Number,
      default: 0
    },
    show: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      startingOffset: { x: 0, y: 0 }
    }
  },

  created () {
    // Setup keypress-events for left/right arrows
    const keyPressMap = {
      37: this.prevImg,
      39: this.nextImg,
      27: this.close
    }

    window.addEventListener("keydown", event => {
      if (Object.keys(keyPressMap).indexOf(event.keyCode.toString()) > -1) {
        keyPressMap[event.keyCode]()
      }
    })
  },

  computed: {
    canShowNextImg() {
      return this.selectedIndex < this.value.length - 1
    },

    canShowPrevImg() {
      return this.selectedIndex > 0
    }
  },

  methods: {
    close() {
      this.$emit('closed')
    },

    nextImg() {
      if (!this.canShowNextImg)
        return

      this.$emit('nextImg')
    },

    prevImg() {
      if (!this.canShowPrevImg)
        return

      this.$emit('prevImg')
    },

    setStartingOffset(x, y) {
      this.startingOffset.x = x
      this.startingOffset.y = y
    }
  }
}
</script>

<style>
  .image-viewer-container {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0);
    display: none;

    &.show {
      animation: backgroundFade .5s ease forwards;

      display: flex;
    }

    .close-control {
      top: 0;
      right: 0;
      color: #fff;
      position: absolute;
      padding: 2em;
      z-index: 9999;

      i {
        width: 50px;
        font-size: 2em;
        cursor: pointer;
      }
    }

    .image-viewer {
      position: absolute;
      max-width: 255px;
      animation: imgZoom .5s ease forwards;

      .description {
        color: #fff;
        background-color: rgba(0,0,0,.25);
        padding: 1em;
      }

      span.switcher {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4em;
        color: #fff;

        width: 50px;
        height: 100%;
        position: absolute;

        i { cursor: pointer; }

        &.prev { left: -50px; }
        &.next { right: -50px; }

        @media screen and (max-width: 860px) {
          &.prev { left: 0 }
          &.next { right: 0 }
          background-color: rgba(0, 0, 0, .25);
        }
      }
    }
  }
</style>
