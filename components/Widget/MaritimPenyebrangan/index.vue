<template>
  <div>
    <client-only>
      <div class=" w-full relative">
        <div class="w-full relative">
          <div class="
              absolute
              top-0
              right-0
              w-72
              z-50
              h-full
              px-6
              py-6
              bg-white/80
              rounded-b-md
              w-full
            ">
            <div class="text-3xl font-bold">Peta Penyebrangan Maritim</div>
            <div class="text-xl mt-2 mb-1">Berlaku Mulai</div>
            <div class="text-xl font-semibold" v-if="showData.length > 0 && showData[0] && showData[0].data">
              <!-- {{showData[0].data[0].valid_from}} -->
              {{
                  new Date(
                    returningTimeZone(new Date(showData[0].data[0].valid_from))
                  ).toLocaleDateString('id')
              }}
              {{
                  returningTimeZone(new Date(showData[0].data[0].valid_from))
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
            <div class="text-xl my-1">Sampai Dengan</div>
            <div v-if="showData.length > 0 && showData[0] && showData[0].data" class="text-xl font-semibold">{{
                new Date(
                  returningTimeZone(new Date(showData[0].data[0].valid_to))
                ).toLocaleDateString('id')
            }}
              {{
                  returningTimeZone(new Date(showData[0].data[0].valid_to))
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
          <MapPenyebrangan v-if="idtemplate" style="height: 280px;width:100%;"
            class="rounded-md relative shadow-md border-2 border-white" ref="map"
            :idMap="'mapPenyebrangan' + idtemplate" @mapready="getData" />
        </div>
        <div class="w-full bg-white rounded-md p-6 mt-2 flex space-x-3">
          <div v-for="(data, i) in showData" :class="i == 0 ? '' : 'border-l border-dashed pl-4 border-gray-800'"
            :key="i" class="flex-grow ">
            <div>
              <div class="flex space-x-4">
                <div class="flex-grow">
                  <div class="flex items-end relative">
                    <div class="flex space-x-2 text-3xl flex-grow font-semibold">
                      <div class="flex w-full">
                        <div class="flex-grow">{{ data.name }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="text-xl">
                    <div class="flex-none relative flex items-center space-x-4 mt-2 font-bold text-2xl">
                      <div class="w-20 h-12"><img
                          class="w-28 absolute -left-3 -top-8"
                          :src="'/Archive/' + weather_codeParsed[data.data[0].weather] + '.gif'" /></div>
                      <div>
                        {{ data.data[0].weather }}</div>
                    </div>
                  </div>

                  <div class="mt-6 font-bold text-2xl text-red-500">Warning</div>
                </div>

                <div v-if="data.data[0]" class="flex-none">
                  <div class="shadow bg-white/20 px-3 py-1.5 rounded">
                    <div class="flex space-x-4 ">
                      <img src="/weatherheadline/wave.svg" class="w-6 " />
                      <div class="text-2xl">Gelombang</div>
                    </div>
                    <div class="text-2xl">{{ data.data[0].wave_desc }}</div>
                  </div>
                  <div class="shadow bg-white/20 px-3 py-1.5 mt-2 rounded">
                    <div class="flex space-x-4"> <img src="/general3/wind.svg" class="w-6" />
                      <div class="text-2xl">Angin</div>
                    </div>
                    <div class="text-2xl">{{ data.data[0].wind_speed_min }} - {{ data.data[0].wind_speed_max }} Knots
                    </div>
                  </div>
                </div>


              </div>

              <div class="leading-tight h-36 bg-white/40 px-4 py-2 mt-2 rounded overflow-hidden"
                v-html="data.data[0].warning_desc"></div>
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
      positionfrom: null,
      positionto: null,
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
            } else if (key2 == 'positionto') {
              self.positionto = el.value
            } else if (key2 == 'positionfrom') {
              self.positionfrom = el.value
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
        // positionfrom
        if (
          this.$store.state.displayWidget.widgetSaved[
          this.idtemplate + '_WidgetMaritimPenyebrangan_positionfrom'
          ]
        ) {
          this.positionfrom =
            this.$store.state.displayWidget.widgetSaved[
            this.idtemplate + '_WidgetMaritimPenyebrangan_positionfrom'
            ]
        }
        if (
          this.$store.state.displayWidget.widgetSaved[
          this.idtemplate + '_WidgetMaritimPenyebrangan_positionto'
          ]
        ) {
          this.positionto =
            this.$store.state.displayWidget.widgetSaved[
            this.idtemplate + '_WidgetMaritimPenyebrangan_positionto'
            ]
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
        // var el = document.createElement('div')
        // el.className = 'rounded-lg p-3'
        // el.style.background = 'rgba(255,255,255, 0.7)'
        // angin
        // var div2 = document.createElement('div')
        // div2.className = 'text-2xl font-bold'
        // div2.innerHTML = `<div>
        //     <div class="flex space-x-4"> <img
        //               src="/general3/wind.svg"
        //               class="w-8"
        //             /> <div>Angin</div></div>
        //     <div>${res.data.data[0].wind_speed_min} - ${res.data.data[0].wind_speed_max} Knots</div>
        //   </div>`
        // Gelombang
        // var div3 = document.createElement('div')
        // div3.className = 'text-2xl font-bold mt-2'
        // div3.innerHTML = `<div>
        //     <div class="flex space-x-4">
        //               <img
        //                 src="/weatherheadline/wave.svg"
        //                 class="w-8"
        //               />
        //             <div>Gelombang</div></div>
        //     <div>${res.data.data[0].wave_desc}</div>
        //   </div>`

        // el.appendChild(div2)
        // el.appendChild(div3)

        var el2 = document.createElement('div')
        el2.className = 'rounded-lg px-4 py-1 text-xl font-bold'
        el2.style.background = 'rgba(255,255,255, 0.7)'
        el2.innerHTML = `<div>${res.data.name}</div>`

        self.loc1 = new maplibregl.Marker(el2, {
          offset: [0, 30],
        })
          .setLngLat([result[i].value.coor[1], result[i].value.coor[0]])
          .addTo(map)

        // marker
        // var offseting
        // if (i == 0) {
        //   self.positionfrom.value == 'left'
        //     ? (offseting = [-180, -80])
        //     : (offseting = [180, -80])
        // } else if (i == 1) {
        //   self.positionto.value == 'left'
        //     ? (offseting = [-180, -80])
        //     : (offseting = [180, -80])
        // }
        // self.loc2 = new maplibregl.Marker(el, {
        //   offset: offseting,
        // })
        //   .setLngLat([result[i].value.coor[1], result[i].value.coor[0]])
        //   .addTo(map)
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
            'icon-size': 0.18,
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
            'icon-size': 0.18,
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
        padding: { top: 120, bottom: 70, left: 20, right: 200 },
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
