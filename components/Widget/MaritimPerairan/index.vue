<template>
  <div>
    <client-only>
      <div class="flex space-x-4 relative">
        <div class="w-7/12 relative">
        <div class="font-bold absolute top-0 z-50 text-3xl px-12 py-6 bg-white/60 rounded-b-md w-full">
          Peta Perairan Maritim
        </div>
          <Map
            style="height: 800px"
            class="w-full rounded-md shadow-md border-2 border-white"
            ref="map"
            @mapready="getData"
          />
        </div>
        <div class="w-5/12 bg-white/70 rounded-md p-6">
          <div v-if="!showData" class="text-center">
            Tidak ada data di temukan
          </div>
          <div v-else>
            <div v-html="showData.berlaku" class="text-lg"></div>
          <div class="pt-3">
            <div class="text-2xl font-semibold">Peringatan</div>
            <div class="mt-1 text-xl" v-html="showData.remark"></div>
          </div>
          <div class="pt-3">
            <div class="text-2xl font-semibold">Kondisi Sinoptik</div>
            <div class="text-xl" v-html="showData.kondisi_cuaca"></div>
          </div>
          <div class="text-2xl pt-6">
            <div class="font-semibold">Prakiraan Area Pelayanan</div>
            <div
              v-if="showData && showData.cuaca"
              class="flex mt-1 items-start justify-center space-x-12 mt-6"
            >
              <div class="text-center">
                <div class="text-4xl font-semibold">Cuaca</div>
                <div>
                  <img
                    :src="showData.cuaca.icon"
                    class="w-28 mx-auto"
                  />
                </div>
                <div class="text-3xl font-semibold">{{ showData.cuaca.name }}</div>
              </div>
              <div class="text-center">
                <div class="text-4xl font-semibold">Gelombang</div>
                <div class="text-6xl h-28 flex items-center">
                  {{ showData.gelombang.name }}
                </div>
                <div class="text-3xl font-semibold">
                  {{ showData.gelombang.gelombang_min }} -
                  {{ showData.gelombang.gelombang_max }} m
                </div>
              </div>
            </div>
            <div v-if="showData && showData.cuaca" class="text-center mt-6">
              <div class="text-4xl font-semibold">Angin</div>
              <div class="h-28 flex justify-center items-center">
                <span class="text-6xl"
                  >{{ showData.angin_from }} - {{ showData.angin_to }}</span
                >
                <span class="text-3xl"><sup>KTS</sup></span>
              </div>
              <div class="text-3xl font-semibold">
                {{ showData.angin.from.name }} - {{ showData.angin.to.name }}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
var maplibregl = require('maplibre-gl')
export default {
  data() {
    return {
      showData: null,
    }
  },
  methods: {
    async getData() {
      var self = this
      var parentDisplay = this.$parent.$parent.$parent
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj.idtemplate
        var result = {}
        setting[obj].map((el) => {
          // console.log(el)
          var key = el.key.split('_')[1]
          if (key == 'WidgetMaritimPerairan') {
            // arr.push(el)
            result = el
          }
        })
        // console.log(arr)
        // https://maritim.bmkg.go.id/geojson-update/T.json
        this.$axios
          .post('https://sena.circlegeo.com/api/sena/research/forward', {
            url:
              'https://maritim.bmkg.go.id/geojson-update/' +
              result.value.id.split('.')[0] +
              '.json',
          })
          .then((res) => {
            var features = []
            res.data.features.forEach((el) => {
              if (el.properties.WP_1 == result.value.id) {
                el.properties.color = 'rgb(83,211,116)'
                features.push(el)
              } else {
                el.properties.color = 'rgba(0,0,0,0.2)'
                features.push(el)
              }
            })
            var geojson = {
              type: 'FeatureCollection',
              features: features,
            }
            var map = this.$refs['map'].map
            map.addSource('maritim', {
              type: 'geojson',
              data: geojson,
            })
            // console.log(geojson)
            map.addLayer({
              id: 'maritim',
              type: 'fill',
              source: 'maritim',
              paint: {
                'fill-color': ['get', 'color'],
                'fill-opacity': 0.8,
              },
            })
            // maplibre
            for (var i = 0; i < geojson.features.length; i++) {
              if (geojson.features[i].properties.WP_1 == result.value.id) {
                var coordinates = geojson.features[i].geometry.coordinates[0]
                var bounds = coordinates.reduce(function (bounds, coord) {
                  return bounds.extend(coord)
                }, new maplibregl.LngLatBounds(coordinates[0], coordinates[0]))
                map.fitBounds(bounds, {
                  padding: 100,
                })
              }
            }
          })
        this.$axios
          .post('https://sena.circlegeo.com/api/sena/research/forward', {
            url:
              'https://maritim.bmkg.go.id/ajax/bindpopup_pelayanan?kode=' +
              result.value.id +
              '&hari=1',
          })
          .then((res) => {
            // console.log(res)
            this.showData = res.data
          })
      }
    },
  },
  async mounted() {
    // this.getData()
    setInterval(() => {
      this.getData()
    }, 3600000)
  },
}
</script>
