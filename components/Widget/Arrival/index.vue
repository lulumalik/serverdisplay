<template>
  <div>
    <div
      class="flex items-start space-x-4 justify-start"
      v-for="(val, i) in bandaras"
      :key="i"
      :class="i >= 1 ? 'mt-3.5' : ''"
    >
      <div>
        <div
          class="bg-gray-300/70 border-4 border-white shadow-md w-56 h-56 rounded-md"
          :style="{
            backgroundImage: 'url(' + val.url + ')',
            backgroundSize: 'cover',
          }"
        ></div>
      </div>
      <div
        style="width:500px;"
        class="bg-white/70 rounded-md shadow-md p-6 h-56 text-gray-800"
      >
        <div class="mb-2">
          <div class="text-3xl">
            <b>{{ val.tagname }}</b>
          </div>
        </div>
        <div>
          <div class="text-xl">
            <div class="mt-2 font-bold">{{ val.weather }}</div>
            <div class="font-semibold">
              Angin: (dari) {{ val.windDirection }}, {{ val.windSpeed }} km/jam
            </div>
            <div class="font-semibold">Jarak Pandang: {{ val.visibility || '-' }} Kilometers</div>
            <div class="font-semibold">Suhu: {{ val.temperature }} <sup>o</sup>C</div>
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
      if (parentDisplay.production) {
        this.allNDF = {}
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj.idtemplate
        this.bandaras.length = 0
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
                    console.log(tagname)
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