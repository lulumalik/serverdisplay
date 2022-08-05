<template>
  <div>
    <div
      class="
        rounded
        text-4xl
        leading-relaxed
        text-center
        font-bold
        text-orange-700
        bg-orange-200
        shadow-lg
        w-full
        p-10
      "
    >
      Kondisi Wilayah Perairan Indonesia
    </div>
    <client-only>
      <div>
        <Map
          ref="map"
          @mapready="onmapready"
          style="height: calc(100vh - 138px)"
          class="w-full"
        />
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      legend: ['#E59C68', '#E6E942', '#33D370', '#A8D9F3', '#4EA6EC'],
    }
  },
  methods: {
    onmapready() {
      var map = this.$refs['map'].map
      var self = this
      this.$axios
        .$get(
          'https://maritim.bmkg.go.id/public_api/static/wilayah_perairan.json'
        )
        .then((response) => {
          response.features.forEach((el) => {
            if (el.properties.simbol == 'A') {
              el.properties.color = self.legend[0]
            } else if (el.properties.simbol == 'B') {
              el.properties.color = self.legend[1]
            } else if (el.properties.simbol == 'C') {
              el.properties.color = self.legend[2]
            } else if (el.properties.simbol == 'D') {
              el.properties.color = self.legend[3]
            } else if (el.properties.simbol == 'E') {
              el.properties.color = self.legend[4]
            } else {
              el.properties.color = '#fff'
            }
          })
          map.addSource('uploaded-source', {
            type: 'geojson',
            data: response,
          })
          map.addLayer({
            id: 'uploaded-polygons',
            type: 'fill',
            source: 'uploaded-source',
            paint: {
              'fill-color': ['get', 'color'],
              'fill-outline-color': '#000',
              'fill-opacity': 0.4,
            },
            // filter for (multi)polygons; for also displaying linestrings
            // or points add more layers with different filters
          })
        })
    },
  },
}
</script>
    