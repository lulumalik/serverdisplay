<template>
  <div
    class="
      rounded-md
      bg-black/70
      text-white
      shadow-md
      flex
      justify-center
      items-center
    "
  >
    <div class="flex items-start space-x-4 w-full">
      <div class="w-full">
        <div>
          <div>
            <div class="px-6 pb-3 pt-6 font-semibold text-center text-4xl">
              Keberangkatan
            </div>
            <div class="flex pb-6">
              <div
                class="
                  flex-grow
                  font-thin
                  text-center
                  font-semibold
                  text-2xl
                  truncate
                "
              >
                {{ result.tagname }}
              </div>
            </div>
          </div>
          <div
            class="h-80 w-full mt-6 relative flex items-center justify-center"
          >
            <div>
              <div>
                <img
                  :src="'/departures/' + result.symbol + '.png'"
                  class="w-44 mx-auto"
                />
              </div>
              <div
                class="
                  font-bold
                  flex-none
                  text-4xl
                  flex
                  mt-3
                  items-center
                  text-white
                "
              >
                <div class="flex-grow text-center">{{ result.weather }}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="
            flex
            mt-6
            justify-center
            text-2xl
            px-12
            pb-8
            px-8
            pt-0
            rounded-md
          "
        >
          <div class="flex-grow">
            <div class="font-bold flex space-x-4">
              <div class="font-semibold flex items-center space-x-3">
                <div class="ml-2">
                  <img
                    class="w-4"
                    src="/weatherheadlineWhite/Temperature.svg"
                  />
                </div>
                <div class="pl-1">Suhu</div>
              </div>
            </div>
            <div class="mt-4 flex space-x-2 items-center">
              <div><img class="w-8" src="/weatherheadlineWhite/eye.svg" /></div>
              <div class="font-semibold">Jarak Pandang</div>
            </div>

            <div class="text-white mt-4 flex items-center space-x-4">
              <div class="ml-2">
                <img class="w-4" src="/weatherheadlineWhite/WDir.svg" />
              </div>
              <div><b>Angin</b></div>
            </div>
          </div>
          <div class="flex-grow">
            <div class="font-bold text-2xl">
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
  </div>
</template>
  <script>
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
              .post('https://sena.circlegeo.com/api/sena/research/forward', {
                url: 'http://aviation.bmkg.go.id/latest/observation.xml.php',
              })
              .then((res) => {
                const json = xml.parse(res.data)
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
            .post('https://sena.circlegeo.com/api/sena/research/forward', {
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
    this.getData()
    setInterval(() => {
      this.getData()
    }, 3600000)
  },
}
</script>