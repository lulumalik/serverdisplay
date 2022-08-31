<template>
  <video
    autoplay
    muted
    loop
    id="myVideo"
    :src="source"
    class="h-full w-full"
  >
    Your browser does not support HTML5 video.
  </video>
</template>

<script>
export default {
  data() {
    return {
      source: '/video/berawan.mp4',
      interval: null
    }
  },
  mounted() {
    process.nextTick(() => {
      this.countint()
      this.interval = setInterval(() => {
        this.countint()
      },60000)
    })
  },
  methods: {
    countint() {
      var hour = new Date().getHours()
        if (hour >= 0 && hour < 5) {
          this.source = '/video/berawan_malam.mp4'
        } else if (hour >= 5 && hour < 10) {
          this.source = '/video/berawan_pagi.mp4'
        } else if (hour >= 10 && hour < 15) {
          this.source = '/video/berawan_siang.mp4'
        } else if (hour >= 15 && hour < 18) {
          this.source = '/video/berawan_sore.mp4'
        } else {
          this.source = '/video/berawan_malam.mp4'
        }
    }
  },
  destroyed() {
    clearInterval(this.interval)
  }
}
</script>

<style>
#myVideo {
  position: absolute;
  right: 0px;
  top: 0%;
  min-width: 100%; 
  min-height: 100%;
  z-index:-1;
}
</style>