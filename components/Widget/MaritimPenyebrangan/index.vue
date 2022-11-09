<template>
  <div>
    <client-only>
      <div class="flex space-x-4 w-full relative">
        <div class="w-full relative">
          <div class="
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
            ">
            Peta Penyebrangan Maritim
          </div>
          <MapPenyebrangan
            v-if="idtemplate"
            style="height: 650px;width:800px;"
            class="rounded-md relative shadow-md border-2 border-white"
            ref="map"
            :idMap="'mapPenyebrangan' + idtemplate"
            @mapready="getData"
          />
        </div>
        <div class="w-full bg-white/70 rounded-md p-6">
          <div
            v-for="(data, i) in showData"
            :class="i == 0 ? '' : 'mt-4 border-t-2 border-dashed pt-4 border-gray-800'"
            :key="i"
          >
            <div class="flex items-end relative">
              <div class="flex space-x-2 text-3xl flex-grow font-semibold">
                <div class="flex w-full">
                  <div class="flex-grow">{{ data.name }}</div>
                </div>
              </div>
            </div>
            <div class="text-xl">
              <div class="flex-none relative pl-6 flex space-x-4 mt-2 font-bold text-2xl">
                <img
                  class="w-16 absolute -left-4 -top-4"
                  :src="'/Archive/' + weather_codeParsed[data.data[0].weather] + '.gif'"
                />
                <div>
                  {{ data.data[0].weather }}</div>
              </div>
              <div class="mt-0.5">
                <div
                  v-if="data.data[0]"
                  class="text-2xl"
                >
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
                class="leading-tight h-32 bg-white/40 p-4 rounded overflow-hidden"
                v-html="data.data[0].warning_desc"
              ></div>
            </div>
            <!-- <div class="flex space-x-4 mt-3">
              <div class="mt-2">
                <div class="text-2xl font-bold flex items-center space-x-2">
                  <div>
                    <img
                      src="/general3/wind.svg"
                      class="w-8"
                    />
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
                      <img
                        src="/weatherheadline/wave.svg"
                        class="w-8"
                      />
                    </div>
                    <div>Gelombang</div>
                  </div>
                  <div class="text-3xl flex items-end mt-2">
                    {{ data.data[0].wave_desc }}
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
var maplibregl = require('maplibre-gl')
import { weather_parsed } from '../../../utils/helperNDF.js'
export default {
  data() {
    return {
      showData: [],
      idtemplate: null,
      loc1: null,
      loc2: null,
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
    weather_codeParsed() {
      return weather_parsed
    },
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

      this.idtemplate = parentDisplay.obj && parentDisplay.obj.idtemplate
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var result = {}
        this.showData.length = 0
        setting[self.idtemplate].map((el) => {
          // console.log(el)
          var key = el.key.split('_')[1]
          var key2 = el.key.split('_')[2]
          if (key == 'WidgetMaritimPenyebrangan') {
            // arr.push(el)
            // console.log(el)
            if (key2 == 'from') {
              result['from'] = el.value
            } else if (key2 == 'to') {
              result['to'] = el.value
            }
            // result.push(el)
          }
        })

        var resultArr = []

        resultArr.push({
          value: result.from,
        })
        resultArr.push({
          value: result.to,
        })

        this.initialMap(resultArr)
      } else {
        var from = null
        var to = null
        if (
          this.$store.state.displayWidget.widgetSaved[
            self.idtemplate + '_WidgetMaritimPenyebrangan_from'
          ]
        ) {
          from = {
            value:
              this.$store.state.displayWidget.widgetSaved[
                self.idtemplate + '_WidgetMaritimPenyebrangan_from'
              ],
          }
        }
        if (
          this.$store.state.displayWidget.widgetSaved[
            self.idtemplate + '_WidgetMaritimPenyebrangan_to'
          ]
        ) {
          to = {
            value:
              this.$store.state.displayWidget.widgetSaved[
                self.idtemplate + '_WidgetMaritimPenyebrangan_to'
              ],
          }
        }
        if (from && to) {
          var result = []
          this.showData.length = 0
          result.push(from)
          result.push(to)
          this.initialMap(result)
        }
      }
    },
    initialMap(result) {
      var self = this
      var map = this.$refs['map'].map

      if (this.loc1) {
        this.loc1.remove()
      }

      if (this.loc2) {
        this.loc2.remove()
      }

      if (map.getSource('departure')) {
        map.removeSource('departure')
      }

      if (map.getLayer('departure')) {
        map.removeLayer('departure')
      }

      if (map.getSource('arrival')) {
        map.removeSource('arrival')
      }

      if (map.getLayer('arrival')) {
        map.removeLayer('arrival')
      }

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
        var el = document.createElement('div')
        el.className = 'rounded-lg p-3'
        el.style.background = 'rgba(255,255,255, 0.7)'
        // angin
        var div2 = document.createElement('div')
        div2.className = 'text-2xl font-bold'
        div2.innerHTML = `<div>
            <div class="flex space-x-4"> <img
                      src="/general3/wind.svg"
                      class="w-8"
                    /> <div>Angin</div></div>
            <div>${res.data.data[0].wind_speed_min} - ${res.data.data[0].wind_speed_max} Knots</div>
          </div>`
        // Gelombang
        var div3 = document.createElement('div')
        div3.className = 'text-2xl font-bold mt-2'
        div3.innerHTML = `<div>
            <div class="flex space-x-4">
                      <img
                        src="/weatherheadline/wave.svg"
                        class="w-8"
                      />
                    <div>Gelombang</div></div>
            <div>${res.data.data[0].wave_desc}</div>
          </div>`

        el.appendChild(div2)
        el.appendChild(div3)

        var el2 = document.createElement('div')
        el2.className = 'rounded-lg px-4 py-1 text-2xl font-bold'
        el2.style.background = 'rgba(255,255,255, 0.7)'
        el2.innerHTML = `<div>${res.data.name}</div>`

        self.loc1 = new maplibregl.Marker(el2, {
          offset: [0, 30],
        })
          .setLngLat([result[i].value.coor[1], result[i].value.coor[0]])
          .addTo(map)

        // marker
        self.loc2 = new maplibregl.Marker(el, {
          offset: [-180, -80],
        })
          .setLngLat([result[i].value.coor[1], result[i].value.coor[0]])
          .addTo(map)
        // cuaca
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
            'icon-size': 0.3,
            'icon-overlap': 'always',
            'icon-offset': [0, -250],
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
            'icon-size': 0.3,
            'icon-overlap': 'always',
            'icon-offset': [0, -250],
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
        padding: { top: 270, bottom: 100, left: 200, right: 200 },
      })
    },
  },
  mounted() {
    // this.getData()
    var self = this

    var parentDisplay = this.$parent.$parent.$parent
    this.idtemplate = parentDisplay.obj && parentDisplay.obj.idtemplate

    setInterval(() => {
      this.getData()
    }, 3600000)
  },
}
</script>
