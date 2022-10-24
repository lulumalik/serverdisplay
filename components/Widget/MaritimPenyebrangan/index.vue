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
                <div class="flex w-full">
                  <div class="flex-grow">{{ data.name }}</div>
                  <div class="flex-none font-bold text-2xl text-blue-500">
                    {{ data.data[0].weather }}
                  </div>
                </div>
              </div>
            </div>
            <div class="text-xl">
              <div class="flex space-x-2 mt-3">
                <div>Berlaku</div>
                <div v-if="data.data[0]">
                  {{
                    new Date(
                      returningTimeZone(new Date(data.data[0].valid_from))
                    ).toLocaleDateString('id')
                  }}
                  {{
                    returningTimeZone(new Date(data.data[0].valid_from))
                      .split(' ')
                      .splice(4, 4)[0]
                      .split(':')
                      .splice(0, 2)
                      .join(':')
                  }}

                  -
                  {{
                    new Date(
                      returningTimeZone(new Date(data.data[0].valid_to))
                    ).toLocaleDateString('id')
                  }}
                  {{
                    returningTimeZone(new Date(data.data[0].valid_to))
                      .split(' ')
                      .splice(4, 4)[0]
                      .split(':')
                      .splice(0, 2)
                      .join(':')
                  }}
                  {{
                    getTimeZone == 7 ? 'WIB' : getTimeZone == 6 ? 'WITA' : 'WIT'
                  }}
                </div>
              </div>
              <div class="mt-3 font-bold text-2xl text-red-500">Warning</div>
              <div
                class="leading-tight"
                v-html="data.data[0].warning_desc"
              ></div>
            </div>
            <div class="flex space-x-4 mt-3">
              <div class="mt-2">
                <div class="text-2xl font-bold flex items-center space-x-2">
                  <div>
                    <img src="/general3/wind.svg" class="w-8" />
                  </div>
                  <div>Angin</div>
                </div>
                <div class="text-3xl mt-2">
                  <div>
                    {{ data.data[0].wind_speed_min }} knots -
                    {{ data.data[0].wind_speed_max }} knots
                  </div>
                  <div>
                    {{ data.data[0].wind_from }} ke
                    {{ data.data[0].wind_to }}
                  </div>
                </div>
              </div>
              <div class="flex space-x-4 text-xl mt-2">
                <div class="flex-grow">
                  <div class="text-2xl font-bold flex items-center space-x-2">
                    <div>
                      <img src="/weatherheadline/wave.svg" class="w-8" />
                    </div>
                    <div>Gelombang</div>
                  </div>
                  <div class="text-3xl flex items-end mt-2">
                    {{ data.data[0].wave_desc }}
                  </div>
                </div>
                <!-- <div class="flex-grow">
                  <div class="text-2xl font-bold">Jarak Pandang</div>
                  <div class="text-3xl flex items-end">
                    {{ data.data[0].visibility }} <small>KM</small>
                  </div>
                </div> -->
              </div>
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
    }
  },
  components: {
    VueSlickCarousel,
  },
  computed: {
    getTimeZone() {
      var date = new Date().getTimezoneOffset()
      if (date == -420) {
        return 7
      } else if (date == -480) {
        return 6
      } else if (date == -540) {
        return 5
      }
    },
  },
  methods: {
    returningTimeZone(date) {
      return (
        date.toString().split(' ').splice(0, 5).join(' ') +
        ' GMT+0' +
        this.getTimeZone +
        '00'
      )
    },
    async getData() {
      var self = this
      var parentDisplay = this.$parent.$parent.$parent

      var obj = parentDisplay.obj && parentDisplay.obj.idtemplate
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
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
        this.initialMap(result)
      } else {
        var from = null
        var to = null
        if (
          this.$store.state.displayWidget.widgetSaved[
            obj + '_WidgetMaritimPenyebrangan_from'
          ]
        ) {
          from = {
            value: this.$store.state.displayWidget.widgetSaved[
              obj + '_WidgetMaritimPenyebrangan_from'
            ]
          }
        }
        if (
          this.$store.state.displayWidget.widgetSaved[
            obj + '_WidgetMaritimPenyebrangan_to'
          ]
        ) {
          to = {
            value: this.$store.state.displayWidget.widgetSaved[
              obj + '_WidgetMaritimPenyebrangan_to'
            ]
          }
        }
        if (from && to) {
          var result = []
          this.showData.length = 0
          result[0] = from
          result[1] = to
          this.initialMap(result)
        }
      }
    },
    initialMap(result) {
      var self = this
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
            'icon-offset': [0, -10],
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
            'icon-offset': [0, -10],
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
        padding: { top: 150, bottom: 150, left: 200, right: 200 },
      })
    },
  },
  mounted() {
    // this.getData()
    var self = this

    setInterval(() => {
      this.getData()
    }, 3600000)
  },
}
</script>
