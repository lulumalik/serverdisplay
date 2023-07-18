<template>
  <div>
    <div :id="idMap" class="h-full w-full rounded-md"></div>
  </div>
</template>
  
<script>
var maplibregl = require('maplibre-gl')
export default {
  props: {
    idMap: {
      type: String,
      default: 'map2',
    },
  },
  data() {
    return {
      map: null,
    }
  },
  mounted() {
    process.nextTick(() => {
      this.map = new maplibregl.Map({
        container: this.idMap, // container id
        style: 'https://gis.co.id/tiles/circlegeo_3d',
        center: [115, 0], // starting position
        zoom: 4, // starting zoom
      })
      this.map.on('load', () => {
        this.$emit('mapready', true)
        // 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        this.map.addSource('satellite', {
          type: 'raster',
          tiles: [
            'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
          ],
          tileSize: 256,
        })
        this.map.addLayer({
          id: 'satellite',
          type: 'raster',
          source: 'satellite',
          minzoom: 0,
          maxzoom: 22,
        })
        // Insert the layer beneath any symbol layer.
      })
    })
  },
}
</script>