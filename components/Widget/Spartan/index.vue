<template>
  <div>
    <Map ref="map" @mapready="mapReady" style="width: 640px; height: 360px" />
  </div>
</template>

<script>
import { spartan } from '../../../utils/helperSpartan.js'
export default {
  data() {
    return {
      modelrun: null,
    }
  },
  methods: {
    parseTime(date) {
      var split = date.split('T')
      var date = split[0]
      var time = split[1]
      var splitDate = date.split('-').join('')
      var splitTime = time.split(':').splice(0, 2).join('')
      return splitDate + splitTime
    },
    getRasterSource(val) {
      return {
        type: 'raster',
        tiles: [val],
        scheme: 'tms',
        attribution:
          'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
      }
    },
    async mapReady() {
      this.modelrun = await this.$axios.$get(
        'https://spartan.bmkg.go.id/map/modelrun'
      )
      var map = this.$refs['map'].map
      var currentDate = new Date().toISOString().split('T')[0] + 'T00:00:00Z'
      // console.log(this.parseTime(this.modelrun['spartan'][0]))
      var obj = this.getRasterSource(
        'https://spartan.bmkg.go.id/map/rgb_req/spartan/fwi/0/' +
          this.parseTime(this.modelrun['spartan'][0]) +
          '/' +
          this.parseTime(
            currentDate
          ) +
          '/{z}/{x}/{y}.png'
      )
      map.addSource('spartan', obj)
      map.addLayer({
        id: 'spartan',
        type: 'raster',
        source: 'spartan',
        paint: {
          'raster-opacity': 0.8,
        },
      }, 'place_label_other')
      //   https://spartan.bmkg.go.id/map/rgb_req/spartanobs/fwi/0/202209080000/202209080000/5/25/17.png
    },
  },
}
</script>