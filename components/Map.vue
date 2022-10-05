<template>
  <div>
    <div id="map" class="h-full w-full rounded-md"></div>
  </div>
</template>

<script>
var maplibregl
import 'maplibre-gl/dist/maplibre-gl.css'
if (process.client) {
  maplibregl = require('maplibre-gl')
}
export default {
  data() {
    return {
      map: null,
    }
  },
  mounted() {
    process.nextTick(() => {
      this.map = new maplibregl.Map({
        container: 'map', // container id
        style:
          'https://gis.co.id/tiles/circlegeo_3d',
        center: [115, 0], // starting position
        zoom: 4, // starting zoom
      })
      this.map.on('load', () => {
        this.$emit('mapready', true)
        // Insert the layer beneath any symbol layer.
      })
    })
  },
}
</script>