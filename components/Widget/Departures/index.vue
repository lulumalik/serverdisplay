<template>
  <div class="from-sky-100 flex justify-center items-center">
    <div class="flex items-start space-x-4 w-full">
      <div
        class="
          bg-white/70
          shadow-md
          px-12
          rounded-md
          shadow-md
          w-full
          pt-4
          pb-12
        "
      >
        <div>
          <div class="text-black px-6 py-3 font-semibold text-center text-4xl">
            Keberangkatan
          </div>
          <div
            class="h-80 w-full relative bg-gray-100 rounded-md shadow-md"
            :style="{backgroundImage : 'url(' + url + ')', backgroundSize: 'cover'}"
          ></div>
          <div class="pt-3">
            <div
              class="
                font-bold
                flex-none
                text-2xl
                flex
                items-center
                text-gray-700
              "
            >
              <div class="flex-grow text-center">{{ result.weather }}</div>
            </div>
          </div>
          <div class="flex pt-3 pb-6">
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
          class="flex justify-center text-2xl border-t-2 pt-6 border-gray-300"
        >
          <div class="flex-grow">
            <div>
              <b class="text-gray-700">Suhu</b> {{ result.temperature
              }}<sup>o</sup>C
            </div>
            <div class="mt-2"><b class="text-gray-700">Jarak Pandang</b></div>
            <div class="mt-2">{{ result.visibility }} meters</div>
          </div>
          <div class="flex-grow">
            <div class="text-gray-700"><b>Angin</b></div>
            <div class="mt-2">(dari) {{ result.windDirection }},</div>
            <div class="mt-2">{{ result.windSpeed }} km/jam</div>
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