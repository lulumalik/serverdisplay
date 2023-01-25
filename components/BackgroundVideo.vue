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
// import { weather_code } from '../utils/helperNDF'
export default {
  data() {
    return {
      source: '/video/berawan.mp4',
      interval: null,
      intervalGet: null,
      dynamicWeather: null,
    }
  },
  mounted() {
    process.nextTick(async () => {
      this.getVideo()

      this.interval = setInterval(() => {
        this.getVideo()
      }, 60000)
    })
  },
  methods: {
    async getVideo() {
      if (this.$parent.responseDisplay.properties.video) {
        const datares = await this.$axios.$get(
          `${this.$baseUrlNdf}/get?locationId=` +
            this.$parent.responseDisplay.properties.video.locationId
        )
        // console.log(datares)
        this.dynamicWeather = datares.data[0]
        this.countint()
      }
    },
    countint() {
      var hour = new Date().getHours()
      if (
        this.dynamicWeather.weather_code >= 60 &&
        this.dynamicWeather.weather_code <= 80
      ) {
        this.$emit('hujan', true)
        this.source = '/video/hujan.mp4'
        return
      } else if (this.dynamicWeather.weather_code > 80) {

        this.$emit('hujan', true)
        this.source = '/video/hujan_petir.mp4'
        return
      }

      this.$emit('hujan', false)
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
    },
  },
  destroyed() {
    clearInterval(this.interval)
  },
}
</script>

<style>
#myVideo {
  position: absolute;
  right: 0px;
  top: 0%;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
}
</style>