<template>
  <div>
    <client-only>
      <div class="flex space-x-4 relative">
        <div class="w-6/12 relative">
          <div
            class="
              font-bold
              absolute
              top-0
              z-50
              text-3xl
              px-12
              py-6
              bg-white/60
              rounded-b-md
              w-full
            "
          >
            Peta Penyebrangan Maritim
          </div>
          <MapPenyebrangan
            style="height: 800px"
            class="w-full rounded-md relative shadow-md border-2 border-white"
            ref="map"
            @mapready="getData"
          />

            <div
              class="absolute bottom-6 bg-white/40 w-full rounded-lg p-4 left-0 mx-4"
            >
              <div v-for="(data, i) in showData" :key="i">
                <div v-if="changing == i">
                  <div class="text-2xl font-semibold flex space-x-4">
                    <img
                      class="w-8"
                      :src="
                        '/maritim/' + (i == 0 ? 'DEPARTURE.png' : 'ARRIVAL.png')
                      "
                      :alt="'images' + i"
                    />
                    <div>Pelabuhan {{ data.name }}</div>
                  </div>
                  <div class="mt-4">
                    <div class="text-2xl font-bold">Angin</div>
                    <div class="text-3xl">
                      <div>
                        {{ data.data[0].wind_speed_min }} knot -
                        {{ data.data[0].wind_speed_max }} knot
                      </div>
                      <div>
                        {{ data.data[0].wind_from }} ke
                        {{ data.data[0].wind_to }}
                      </div>
                    </div>
                  </div>
                  <div class="flex space-x-4 text-xl mt-2">
                    <div class="flex-grow">
                      <div class="text-2xl font-bold">Kategori Ombak</div>
                      <div class="text-3xl flex items-end">
                        {{ data.data[0].wave_cat }}
                      </div>
                    </div>
                    <div class="flex-grow">
                      <div class="text-2xl font-bold">Jarak Pandang</div>
                      <div class="text-3xl flex items-end">
                        {{ data.data[0].visibility }} <small>KM</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="w-6/12 bg-white/70 rounded-md p-6">
          <div
            v-for="(data, i) in showData"
            :class="i == 0 ? '' : 'mt-4 border-t-2 pt-4 border-gray-800'"
            :key="i"
          >
            <div class="flex items-end relative">
              <div class="flex space-x-2 text-2xl flex-grow font-semibold">
                <img
                  class="w-8"
                  :src="
                    '/maritim/' + (i == 0 ? 'DEPARTURE.png' : 'ARRIVAL.png')
                  "
                  :alt="'images' + i"
                />
                <div>{{ data.name }}</div>
              </div>
              <div class="absolute right-0 top-3">
                <div>{{ data.latitude }} , {{ data.longitude }}</div>
              </div>
            </div>
            <div class="text-xl">
              <div class="flex space-x-2 mt-3">
                <div>Valid From</div>
                <div>
                  {{ data.data[0].valid_from }} - {{ data.data[0].valid_to }}
                </div>
              </div>
              <div class="mt-3 font-bold text-2xl text-blue-500">
                {{ data.data[0].weather }}
              </div>
              <small v-html="data.data[0].weather_desc"></small>
              <div class="mt-3 font-bold text-2xl text-red-500">Warning</div>
              <small v-html="data.data[0].warning_desc"></small>
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
var maplibregl = require('maplibre-gl')
export default {
  data() {
    return {
      showData: [],
      settings: {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
      },

      changing: 0,
    }
  },
  components: {
    VueSlickCarousel,
  },
  methods: {
    async getData() {
      var self = this
      var parentDisplay = this.$parent.$parent.$parent
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj.idtemplate
        var result = []
        this.showData.length = 0
        setting[obj].map((el) => {
          // console.log(el)
          var key = el.key.split('_')[1]
          if (key == 'WidgetMaritimPenyebrangan') {
            // arr.push(el)
            result.push(el)
          }
        })

        var map = this.$refs['map'].map

        var geojson = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [
                  [result[0].value.coor[1], result[0].value.coor[0]],
                  [result[1].value.coor[1], result[1].value.coor[0]],
                ],
              },
            },
          ],
        }

        var geojsonDeparture = {
          type: 'FeatureCollection',
          features: [],
        }
        var geojsonArrival = {
          type: 'FeatureCollection',
          features: [],
        }
        geojsonDeparture.features.push({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [result[0].value.coor[1], result[0].value.coor[0]],
          },
        })
        geojsonArrival.features.push({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [result[1].value.coor[1], result[1].value.coor[0]],
          },
        })

        result.forEach(async (el, i) => {
          const res = await this.$axios.post(
            'https://sena.circlegeo.com/api/sena/research/forward',
            {
              url:
                'https://maritim.bmkg.go.id/public_api/pelabuhan/' +
                el.value.name,
            }
          )
          this.showData.push(res.data)
        })

        map.loadImage('/maritim/DEPARTURE1.png', function (error, image) {
          if (error) throw error
          map.addImage('departure', image)
          map.addSource('departure', {
            type: 'geojson',
            data: geojsonDeparture,
          })
          map.addLayer({
            id: 'departure',
            type: 'symbol',
            source: 'departure',
            layout: {
              'icon-image': 'departure',
              'icon-size': 0.15,
            },
          })
        })

        map.loadImage('/maritim/ARRIVAL1.png', function (error, image) {
          if (error) throw error
          map.addImage('arrival', image)
          map.addSource('arrival', {
            type: 'geojson',
            data: geojsonArrival,
          })
          map.addLayer({
            id: 'arrival',
            type: 'symbol',
            source: 'arrival',
            layout: {
              'icon-image': 'arrival',
              'icon-size': 0.15,
            },
          })
        })
        // bounds
        var bounds = new maplibregl.LngLatBounds()
        geojson.features.forEach(function (feature) {
          if (feature.geometry.type === 'Point') {
            bounds.extend(feature.geometry.coordinates)
          } else if (feature.geometry.type === 'LineString') {
            feature.geometry.coordinates.forEach(function (coord) {
              bounds.extend(coord)
            })
          }
        })
        map.fitBounds(bounds, {
          padding: { top: 150, bottom: 400, left: 200, right: 200 },
        })
      }
    },
  },
  mounted() {
    // this.getData()
    var self = this
    setInterval(() => {
      if (self.changing == 0) {
        self.changing = 1
      } else {
        self.changing = 0
      }
    }, 7000)
    setInterval(() => {
      this.getData()
    }, 3600000)
  },
}
</script>
