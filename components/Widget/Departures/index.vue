<template>
  <div class="from-sky-100 flex justify-center items-center">
    <div class="flex items-start space-x-4 w-full">
      <div class="w-full">
        <div >
          <div class="rounded-md bg-white/70 shadow-md">
            <div
              class="text-black px-6 py-3 font-semibold text-center text-4xl"
            >
              Keberangkatan
            </div>
            <div class="flex pb-6">
              <div
                class="
                  flex-grow
                  text-black
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
            class="h-80 w-full mt-6 border-4 border-white shadow-md relative bg-gray-100 rounded-md shadow-md"
            :style="{
              backgroundImage: 'url(' + url + ')',
              backgroundSize: 'cover',
            }"
          ></div>
          <div class="py-4">
            <div
              class="
                font-bold
                flex-none
                text-3xl
                flex
                items-center
                text-gray-700
                bg-white/70
                p-4
                shadow-md
                rounded-md
              "
            >
              <div class="flex-grow text-center">{{ result.weather }}</div>
            </div>
          </div>
        </div>
        <div
          class="flex justify-center text-2xl bg-white/70 rounded px-12 py-4 rounded-md shadow-md"
        >
          <div class="flex-grow">
            <div class="font-bold flex space-x-4">
              <div class="text-gray-700 font-semibold">Suhu</div>
              <div>{{ result.temperature }}<sup>o</sup>C</div>
            </div>
            <div class="mt-0.5">
              <div class="text-gray-700 font-semibold">Jarak Pandang</div>
            </div>
            <div class="font-bold mt-0.5">
              {{ result.visibility }} kilometers
            </div>
          </div>
          <div class="flex-grow">
            <div class="text-gray-700"><b>Angin</b></div>
            <div class="mt-0.5 font-semibold">
              (dari) {{ result.windDirection }},
            </div>
            <div class="mt-0.5 font-semibold">
              {{ result.windSpeed }} km/jam
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
    }
  },
  methods: {
    async getData() {
      var parentDisplay = this.$parent.$parent.$parent
      if (parentDisplay.production) {
        this.allNDF = {}
        var self = this
        var ndflistener = this.allNDF
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj.idtemplate
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