<template>
  <div class="
      rounded-md
      bg-white
      text-black
      shadow-md
    ">
    <div class="bg-indigo-500 text-white rounded-lg flex items-center px-6 py-4">
      <div class=" flex-grow font-semibold text-left text-4xl">
        Cuaca Bandara
      </div>
      <div class="flex justify-center">
        <div class="
                  flex-grow
                  font-thin
                  text-center
                  font-semibold
                  text-3xl
                ">
          {{ result.tagname }}
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2">
      <div class="w-full border-r-4 border-gray-300 border-dashed">
        <div>
          <div class="h-56 w-full mx-auto relative flex items-center justify-center">
            <div class="flex pb-12">
              <div class="absolute left-0 -top-6">
                <img :src="'/Archive/' + weather_codeParsed[result.weather] + '.gif'" class="w-64 mx-auto" />
              </div>
              <div class="
                  font-bold
                  flex-none
                  text-5xl
                  flex
                  items-center
                  text-black
                ">
                <div class="flex-grow relative left-12 text-left w-64">
                  <div>{{ result.weather }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="
            flex
            space-x-4
            justify-center
            text-3xl
            pl-12
            pb-7
            px-8
            pt-2
            relative
            bottom-8
            rounded-md
            w-full
          ">
            <div class="flex-grow w-full">
              <div class="font-bold flex space-x-4">
                <div class="font-semibold flex items-center space-x-3 mt-4">
                  <div class="pl-1">Suhu</div>
                </div>
              </div>
              <div class="mt-4 flex space-x-2 items-center mt-3">
                <div class="font-semibold">Visibilitas</div>
              </div>

              <div class=" mt-4 flex items-center space-x-4">
                <div><b>Angin</b></div>
              </div>
            </div>
            <div class="flex-none mt-4">
              <div class="font-bold">
                {{ result.temperature }}<sup>o</sup>C
              </div>
              <div class="font-bold mt-4">{{ result.visibility }} kilometers</div>
              <div class="mt-4 font-semibold">{{ result.windSpeed }} km/jam</div>
              <div class="mt-1.5 font-semibold">
                dari {{ result.windDirection }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="font-semibold text-xl p-8">Prakiraan Cuaca</div>
        <div class="grid grid-cols-2 gap-4 p-4">
          <div class="bg-gray-100 shadow-md rounded-lg h-32 p-4 relative" v-for="(data, i) in 4" :key="i">
            <div class="absolute top-0">
              <img :src="'/Archive/' + weather_codeParsed[result.weather] + '.gif'" class="w-32 mx-auto" />
            </div>
            <div class="
                  font-bold
                  flex-none
                  text-lg
                  flex
                  items-center
                  text-black
                ">
              <div class="flex-grow text-right">
                <div>Pukul 0{{ data }}:00</div>
                <div class="font-bold text-xl mt-10">
                  {{ result.temperature }}<sup>o</sup>C
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { weather_parsed } from '../../../utils/helperNDF.js'
const xml = require('txml')
export default {
  data() {
    return {
      allNDF: {},
      meters: 8000,
      indikator: '',
      result: {},
      url: '',
      idTemplate: null,
    }
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
    async getData() {
      var self = this
      var parentDisplay = this.$parent.$parent.$parent
      var obj = parentDisplay.obj && parentDisplay.obj.idtemplate
      this.idTemplate = obj
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting

        // console.log(setting[obj])
        var arr = []
        setting[obj].map((el) => {
          // console.log(el)
          var key = el.key.split('_')[1]
          if (key == 'WidgetDepartures') {
            arr.push(el)
          }
        })
        arr.forEach((el) => {
          var key2 = el.key.split('_')[2]
          if (key2 == 'airport') {
            this.$axios
              .post(`${this.$baseUrlNdf}/cgms/weather/forward`, {
                url: 'http://aviation.bmkg.go.id/latest/observation.xml.php',
              })
              .then((res) => {
                const json = xml.parse(res.data)
                if (json[1] && json[1].children) {
                  json[1].children.forEach((el2) => {
                    var icaoId = el2.children[0].children[0]
                    // console.log(el.value, icaoId)
                    if (el.value.icaoid == icaoId) {
                      var tagname = el2.children[1].children[0]
                      var latitude = el2.children[2].children[0]
                      var longitude = el2.children[3].children[0]
                      var elevation = el2.children[4].children[0]
                      var observationTime = el2.children[5].children[0]
                      var time_zone = el2.children[6].children[0]
                      var windDirection = el2.children[7].children[0]
                      var windSpeed = el2.children[8].children[0]
                      var windSpeedMax = el2.children[9].children[0]
                      var visibility = el2.children[10].children[0]
                      var weather = el2.children[12].children[0]
                      var temperature = el2.children[13].children[0]
                      var dewPoint = el2.children[14].children[0]
                      var pressure = el2.children[15].children[0]
                      var symbol = el2.children[16].children[0]

                      self.result = {
                        tagname,
                        latitude,
                        longitude,
                        elevation,
                        observationTime,
                        time_zone,
                        windDirection,
                        windSpeed,
                        windSpeedMax,
                        visibility,
                        weather,
                        temperature,
                        dewPoint,
                        pressure,
                        symbol,
                      }
                    }
                  })
                }
              })
          } else if (key2 == 'url') {
            // console.log(el.value)
            this.url = el.value
          }
        })
      } else {
        if (
          this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetDepartures_airport'
          ]
        ) {
          var el =
            this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetDepartures_airport'
            ]
          this.$axios
            .post(`${this.$baseUrlNdf}/cgms/weather/forward`, {
              url: 'http://aviation.bmkg.go.id/latest/observation.xml.php',
            })
            .then((res) => {
              const json = xml.parse(res.data)
              json[1].children.forEach((el2) => {
                var icaoId = el2.children[0].children[0]
                // console.log(el.value, icaoId)
                if (el.icaoid == icaoId) {
                  var tagname = el2.children[1].children[0]
                  var latitude = el2.children[2].children[0]
                  var longitude = el2.children[3].children[0]
                  var elevation = el2.children[4].children[0]
                  var observationTime = el2.children[5].children[0]
                  var time_zone = el2.children[6].children[0]
                  var windDirection = el2.children[7].children[0]
                  var windSpeed = el2.children[8].children[0]
                  var windSpeedMax = el2.children[9].children[0]
                  var visibility = el2.children[10].children[0]
                  var weather = el2.children[12].children[0]
                  var temperature = el2.children[13].children[0]
                  var dewPoint = el2.children[14].children[0]
                  var pressure = el2.children[15].children[0]
                  var symbol = el2.children[16].children[0]

                  self.result = {
                    tagname,
                    latitude,
                    longitude,
                    elevation,
                    observationTime,
                    time_zone,
                    windDirection,
                    windSpeed,
                    windSpeedMax,
                    visibility,
                    weather,
                    temperature,
                    dewPoint,
                    pressure,
                    symbol,
                  }
                }
              })
            })
          // console.log(el)
        }
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.getData()
    }, 2000)
    setInterval(() => {
      this.getData()
    }, 300000)
  },
}
</script>