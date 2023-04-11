<template>
  <div>
    <div>

      <div v-if="showData && showData.value && showData.value.portname" class="text-center font-bold mb-8 text-5xl"
        :class="isDark ? 'text-white' : 'text-black'">Prakiraan Cuaca Pelabuhan {{ showData.value.portname }}
      </div>

      <div class="h-full w-full flex items-center justify-center font-color">
        <div class="text-gray-700" v-if="listpelabuhan.length > 0" style="width:750px">
          <div v-for="(w, i) in listpelabuhan" :key="i">
            <div class="
                  rounded-t-3xl
                  border-4 border-white
                  shadow-md
                  flex
                  items-center
                  justify-center
                  bg-gradient-to-b
                  from-indigo-500
                  to-blue-800
                  h-32
                  w-full
                  space-x-6
                ">

              <div class="flex-none">
                <div class="font-bold text-2xl px-12 text-white flex space-x-4 justify-center">
                  <div>{{ spliting(new Date(
                    returningTimeZone(new Date(w.valid_from))
                  ).toLocaleDateString('id'))
                  }}</div>
                  <div>
                    {{
                      returningTimeZone(new Date(w.valid_from))
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
                <div class="font-bold text-2xl px-12 text-white flex space-x-4 justify-center">
                  <div>Berlaku Sampai </div>
                  <div>{{ spliting(new Date(
                    returningTimeZone(new Date(w.valid_to))
                  ).toLocaleDateString('id'))
                  }}</div>
                  <div>
                    {{
                      returningTimeZone(new Date(w.valid_to))
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
              </div>
            </div>
            <div class="px-4 pb-3 pt-3 bg-white w-full text-lg rounded-b-3xl shadow-md">
              <div class="p-6 rounded-md">
                <div class="text-4xl text-center font-bold pb-4">
                  {{ w.jalur_name }}
                </div>
                <div class="text-xl mt-12">
                  <div class="relative mt-2 flex space-x-8 justify-center font-bold text-2xl">
                    <div class="relative">
                      <div class="w-36 h-12"><img class="w-64 absolute right-0 -top-14"
                          :src="'/Archive/' + weather_codeParsed[w.cuaca.name] + '.gif'" />
                      </div>
                    </div>
                    <div class="text-center text-3xl">{{ w.cuaca.name }}</div>
                  </div>
                </div>
                <div class="flex space-x-4 mt-14">
                  <div class="flex space-x-4 w-52 items-start ">
                    <img src="/weatherheadline/wave.svg" class="w-6 relative top-1" />
                    <div class="text-2xl font-bold">Gelombang</div>
                  </div>
                  <div class="text-2xl ">
                    <div>
                      {{ w.gelombang.name }}
                    </div>
                    <div class="flex space-x-4">
                      <div>{{ w.gelombang.gelombang_min }}</div>
                      <div>{{ w.gelombang.gelombang_max }}</div>
                      <div>m</div>
                    </div>
                  </div>
                </div>
                <div class="flex space-x-4 mt-4">
                  <div class="flex items-start space-x-4 w-52"> <img src="/general3/wind.svg" class="w-6 mt-1.5" />
                    <div class="text-2xl font-bold">Angin</div>
                  </div>
                  <div class="text-2xl">
                    <div>Dari {{ w.angin.from.name }} ke {{ w.angin.to.name }}</div>
                    <div>{{ w.angin_from }} - {{ w.angin_to
                    }} Knots</div>
                  </div>
                </div>
                <div class="mt-4 text-2xl">

                </div>
              </div>
              <!-- <div class="flex space-x2">
                <div class="flex-none">
                  <img :src="'/Archive/' + weather_codeParsed[w.weather] + '.gif'" class="w-32 mx-auto" />
                </div>
                <div class="w-full text-left">
                  <div class="font-semibold mb-3 mt-2 text-3xl">
                    {{ w.weather }}
                  </div>
                </div>
              </div>

              <div class="flex space-x-4 ml-3 text-xl items-center">
                <div>{{ w.wave_desc }}</div>
              </div>
              <div class="flex space-x-4 ml-3 text-xl items-center mt-4">
                <div>{{ w.wind_speed_min }} - {{
                    w.wind_speed_max
                }} Knots</div>
              </div> -->


              <!-- <div class="mt-4">
                <div class="w-full bg-indigo-500 w-full font-bold text-2xl py-2 text-white rounded px-4">
                  Deskripsi Cuaca
                </div>
                <div class="leading-tight px-6 py-2 text-justify leading-normal text-xl rounded overflow-hidden"
                  v-html="w.weather_desc">
                </div>
              </div> -->
              <!-- <div class="flex space-x-4 ml-3 items-center mt-4">
                <div class="w-6">
                  <img src="/svg/wind.svg" class="w-6 relative right-1" />
                </div>
                <div>{{ w.wind_to }}</div>
              </div> -->
              <!-- <div class="flex space-x-4 ml-3 items-center mt-4">
                <div class="w-6">
                  <img src="/svg/dir.svg" class="w-5 relative right-0.5" :style="{
                    transform:
                      'rotate(' + parseInt(dirTo[w.wDir] - 180) + 'deg)',
                  }" />
                </div>
                <div>
                  {{ parseNameDir[w.wDir] }}
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
td {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
  border: 1px solid white;
}

table {
  border-radius: 15px;
}

.stroke_white {
  -webkit-text-fill-color: black;
  /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: white;
}
</style>
  
<script>
var maplibregl = require('maplibre-gl')
import VueSlickCarousel from 'vue-slick-carousel'

import { weather_parsed } from '../../../utils/helperNDF.js'

export default {
  data() {
    return {
      loc1: null,
      idtemplate: null,
      showData: null,
      listpelabuhan: [],
      isDark: false
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
    spliting(date) {
      if (date) {
        var dateing = date.split('/')
        return dateing[0] + ' ' + this.parseMonth(parseInt(dateing[1]) - 1) + ' ' + dateing[2]
      } else {
        return ''
      }
    },
    parseMonth(month) {
      var monthres;
      switch (month) {
        case 0:
          monthres = 'Jan'
          break
        case 1:
          monthres = 'Feb'
          break
        case 2:
          monthres = 'Mar'
          break
        case 3:
          monthres = 'Apr'
          break
        case 4:
          monthres = 'Mei'
          break
        case 5:
          monthres = 'Jun'
          break
        case 6:
          monthres = 'Jul'
          break
        case 7:
          monthres = 'Agu'
          break
        case 8:
          monthres = 'Sep'
          break
        case 9:
          monthres = 'Okt'
          break
        case 10:
          monthres = 'Nov'
          break
        case 11:
          monthres = 'Des'
          break
      }
      return monthres
    },
    returningTimeZone(date) {
      return (
        date.toString().split(' ').splice(0, 5).join(' ') +
        ' GMT+0' +
        this.getTimeZone +
        '00'
      )
    },
    // returningTimeZone(date) {
    //   var parsed = date.split(' ')[0]
    //   return parsed.split('-')
    // },
    initialMap(obj) {
      var self = this
      var map = this.$refs['map2'].map

      if (this.loc1) {
        this.loc1.remove()
      }
      // marker
      var el = document.createElement('div')
      el.style.width = '90px'
      el.style.height = '95px'
      el.style.backgroundImage = 'url(/defaultMarker.png)'

      self.loc1 = new maplibregl.Marker(el, {
        color: '#000',
        draggable: false,
        offset: [0, -50],
      })
        .setLngLat([obj.longitude, obj.latitude])
        .addTo(map)

      map.flyTo({
        center: [obj.longitude, obj.latitude],
        zoom: 10,
        essential: true,
      })
    },
    async getData() {
      var self = this

      var parentDisplay = this.$parent.$parent.$parent
      this.idtemplate = parentDisplay.obj && parentDisplay.obj.idtemplate
      if (parentDisplay.isHujan) {
        this.isDark = true
      } else if (new Date().getHours() >= 18 || new Date().getHours() <= 5) {
        this.isDark = true
      } else {
        this.isDark = false
      }
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var result = {}

        this.currentDate = new Date().getHours()
        setting[self.idtemplate].map((el) => {
          // console.log(el)
          var key = el.key.split('_')[1]
          if (key == 'WidgetMaritimPenyebrangan2') {
            // arr.push(el)
            result = el
          }
        })
        this.showData = result
        this.listpelabuhan.length = 0
        // console.log(arr)
        this.$axios
          .post(`${this.$baseUrlNdf}/cgms/weather/forward`, {
            url:
              'https://maritim.bmkg.go.id/public_api/pelabuhan/' +
              result.value.name.split('.')[0] +
              '.json',
          })
          .then((res) => {
            self.listpelabuhan = res.data.data
            self.initialMap(res.data)
          })
      } else {
        if (
          this.$store.state.displayWidget.widgetSaved[
          self.idtemplate + '_WidgetMaritimPenyebrangan2_port'
          ]
        ) {
          var el =
            this.$store.state.displayWidget.widgetSaved[
            self.idtemplate + '_WidgetMaritimPenyebrangan2_port'
            ]

          this.showData = {
            value: el,
          }
          this.listpelabuhan.length = 0
          // console.log(arr)
          // console.log(el)
          this.$axios
            .post(`${this.$baseUrlNdf}/cgms/weather/forward`, {
              url: 'https://maritim.bmkg.go.id/ajax/bindpopup_penyeberangan?id=' + el.id,
            })
            .then((res) => {
              // console.log(res)
              self.listpelabuhan = [res.data]
              self.initialMap([res.data])
            })
        }
      }
    },
  },
  async mounted() {
    this.getData()

    var parentDisplay = this.$parent.$parent.$parent
    this.idtemplate = parentDisplay.obj && parentDisplay.obj.idtemplate

    setInterval(() => {
      this.getData()
    }, 3600000)
  },
}
</script>
  