<template>
  <div>
    <div class="rounded-md bg-black/70 text-white shadow-md">
      <div class="text-white px-6 py-3.5 font-semibold text-center text-5xl">
        Tujuan
      </div>
    </div>
    <div
      class="overflow-auto mt-6"
      style="height: 610px"
    >
      <VueSlickCarousel v-bind="settings">
        <template #prevArrow="arrowOption">
          <div v-show="false">{{ arrowOption }}</div>
        </template>
        <template #nextArrow="arrowOption">
          <div v-show="false">
            {{ arrowOption }}
          </div>
        </template>

        <div
          class="flex space-x-4 mt-3.5"
          v-for="(val, i) in bandaras"
          :key="i"
        >
          <div
            style="width: 100px !important"
            class="bg-black/70 text-white rounded-md z-10 shadow-md p-6 h-64"
          >
            <div class="mb-2 flex space-x-4">
              <div class="text-3xl truncate">
                <b>{{ val.tagname }}</b>
              </div>
            </div>
            <div>
              <div class="text-xl">
                <div class="mt-2 text-2xl font-bold flex items-center space-x-4">
                  <img
                    :src="'/departures/' + val.symbol + '.png'"
                    class="w-12"
                  />
                  <div>{{ val.weather }}</div>
                </div>
                <div class="font-semibold flex w-full mt-4">
                  <div class="flex space-x-4 items-center w-1/2">
                    <div class="ml-2">
                      <img
                        class="w-4"
                        src="/weatherheadlineWhite/WDir.svg"
                      />
                    </div>
                    <div>Angin</div>
                  </div>
                  <div class="w-1/2">
                    {{ parseFloat(val.windSpeed) ? val.windSpeed + 'km/jam dari ' + val.windDirection : val.windSpeed }}
                  </div>
                </div>
                <div class="font-semibold flex w-full mt-1.5">
                  <div class="flex items-center space-x-3 w-1/2">
                    <img
                      class="w-6 ml-1"
                      src="/weatherheadlineWhite/eye.svg"
                    />
                    <div>Jarak Pandang</div>
                  </div>
                  <div class="w-1/2">
                    {{ val.visibility || '-' }} Kilometers
                  </div>
                </div>
                <div class="font-semibold flex w-full mt-1.5">
                  <div class="flex items-center space-x-4 w-1/2">
                    <div class="ml-2">
                      <img
                        class="w-3.5"
                        src="/weatherheadlineWhite/Temperature.svg"
                      />
                    </div>
                    <div>Suhu</div>
                  </div>
                  <div class="w-1/2">{{ val.temperature }} <sup>o</sup>C</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
const xml = require('txml')
export default {
  components: {
    VueSlickCarousel,
  },
  data() {
    return {
      settings: {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
      },
      idTemplate: null,
      bandaras: [
        {
          name: 'Bandara Internasional Soekarno-Hatta',
        },
        {
          name: 'Bandara Internasional Halim Perdanakusuma',
        },
        {
          name: 'Bandara Internasional Juanda',
        },
      ],
    }
  },
  methods: {
    async getData() {
      var self = this
      var parentDisplay = this.$parent.$parent.$parent
      var obj = parentDisplay.obj && parentDisplay.obj.idtemplate
      this.idTemplate = obj
      if (parentDisplay.production) {
        this.bandaras.length = 0
        this.allNDF = {}
        var setting = parentDisplay.responseDisplay.properties.allSetting

        var arr = []
        setting[obj].map((el) => {
          // console.log(el)
          var key = el.key.split('_')[1]
          if (key == 'WidgetArrival') {
            arr.push(el)
          }
        })
        this.$axios
          .post('https://sena.circlegeo.com/api/sena/research/forward', {
            url: 'http://aviation.bmkg.go.id/latest/observation.xml.php',
          })
          .then((res) => {
            arr.forEach((el) => {
              el.value.forEach((el2) => {
                const json = xml.parse(res.data)
                json[1].children.forEach((el3) => {
                  var icaoId = el3.children[0].children[0]
                  if (el2.value.icaoid == icaoId) {
                    // json[1].children.forEach((el2) => {
                    var tagname = el3.children[1].children[0]
                    var latitude = el3.children[2].children[0]
                    var longitude = el3.children[3].children[0]
                    var elevation = el3.children[4].children[0]
                    var observationTime = el3.children[5].children[0]
                    var time_zone = el3.children[6].children[0]
                    var windDirection = el3.children[7].children[0]
                    var windSpeed = el3.children[8].children[0]
                    var windSpeedMax = el3.children[9].children[0]
                    var visibility = el3.children[10].children[0]
                    var weather = el3.children[12].children[0]
                    var temperature = el3.children[13].children[0]
                    var dewPoint = el3.children[14].children[0]
                    var pressure = el3.children[15].children[0]
                    var symbol = el3.children[16].children[0]
                    // console.log(tagname)
                    self.bandaras.push({
                      url: el2.url,
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
                    })
                    // })
                  }
                })
              })
            })
          })
      } else {
        // console.log( this.$store.state.displayWidget.widgetSaved, this.idTemplate)
        if (
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetArrival_airport'
          ]
        ) {
          this.bandaras.length = 0
          var el =
            this.$store.state.displayWidget.widgetSaved[
              this.idTemplate + '_WidgetArrival_airport'
            ]

          this.$axios
            .post('https://sena.circlegeo.com/api/sena/research/forward', {
              url: 'http://aviation.bmkg.go.id/latest/observation.xml.php',
            })
            .then((res) => {
              // arr.forEach((el) => {
              el.forEach((el2) => {
                const json = xml.parse(res.data)
                json[1].children.forEach((el3) => {
                  var icaoId = el3.children[0].children[0]
                  if (el2.value.icaoid == icaoId) {
                    // json[1].children.forEach((el2) => {
                    var tagname = el3.children[1].children[0]
                    var latitude = el3.children[2].children[0]
                    var longitude = el3.children[3].children[0]
                    var elevation = el3.children[4].children[0]
                    var observationTime = el3.children[5].children[0]
                    var time_zone = el3.children[6].children[0]
                    var windDirection = el3.children[7].children[0]
                    var windSpeed = el3.children[8].children[0]
                    var windSpeedMax = el3.children[9].children[0]
                    var visibility = el3.children[10].children[0]
                    var weather = el3.children[12].children[0]
                    var temperature = el3.children[13].children[0]
                    var dewPoint = el3.children[14].children[0]
                    var pressure = el3.children[15].children[0]
                    var symbol = el3.children[16].children[0]
                    // console.log(tagname)
                    self.bandaras.push({
                      url: el2.url,
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
                    })
                    // })
                  }
                })
                // })
              })
            })
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