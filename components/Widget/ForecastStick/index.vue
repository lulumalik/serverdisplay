<template>
  <div>
    <div class="h-full w-full flex items-center justify-center font-color">
      <div class="flex space-x-4 text-gray-700" v-if="forecast.length > 0">
        <div v-for="(w, i) in forecast" :key="i">
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
              w-44
              h-36
            ">
            <img :src="'/Archive/' + w.weather_code + '.gif'" class="w-44 mx-auto" />
          </div>
          <div class="px-4 py-6 bg-white text-lg rounded-b-3xl shadow-md">
            <div class="font-bold text-center text-lg text-black">
              <!-- {{ w.date.split('T')[1].replace('.000Z', ' UTC') }} -->
              {{ returningTimeZone(w.date)[2] + ' ' + parseMonth(parseInt(returningTimeZone(w.date)[1]) - 1) + ' ' + returningTimeZone(w.date)[0]}}
              <!-- {{ getTimeZone == 7 ? 'WIB' : getTimeZone == 6 ? 'WITA' : 'WIT' }} -->
            </div>
            <div class="font-semibold mb-3 text-lg text-center">
              {{ weather_code[w.weather_code] }}
            </div>

            <div class="flex space-x-4 ml-3  items-center mt-8">
              <div class="w-6">
                <img src="/svg/temp.svg" class="w-4" />
              </div>
              <div>{{ w.temp }} <sup>o</sup>C</div>
            </div>
            <div class="flex space-x-4 ml-3 items-center mt-4">
              <div class="w-6">
                <img src="/svg/precip.svg" class="w-4" />
              </div>
              <div>{{ w.rh }} %</div>
            </div>
            <div class="flex space-x-4 ml-3 items-center mt-4">
              <div class="w-6">
                <img src="/svg/wind.svg" class="w-6 relative right-1" />
              </div>
              <div>{{ w.wSpd }} km/jam</div>
            </div>
            <div class="flex space-x-4 ml-3 items-center mt-4">
              <div class="w-6">
                <img src="/svg/dir.svg" class="w-5 relative right-0.5" :style="{
                  transform:
                    'rotate(' + parseInt(dirTo[w.wDir] - 180) + 'deg)',
                }" />
              </div>
              <div>
                {{ parseNameDir[w.wDir] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { weather_code, dirTo, parseNameDir } from '../../../utils/helperNDF.js'
export default {
  data() {
    return {
      allNDF: {},
      currentDate: new Date().getHours(),
      forecast: [
        {
          _id: '62e1d18fe1ec873f27342d0b',
          location: '625c7d97c1a1102fc994072e',
          date: '2022-08-12T00:00:00.000Z',
          rh: 0,
          temp: 0,
          weather_code: 1,
          wDir: 'SE',
          wSpd: 0,
        },
        {
          _id: '62e1d18fe1ec873f27342d0c',
          location: '625c7d97c1a1102fc994072e',
          date: '2022-08-12T00:00:00.000Z',
          rh: 0,
          temp: 0,
          weather_code: 1,
          wDir: 'SE',
          wSpd: 0,
        },
        {
          _id: '62e1d18fe1ec873f27342d0d',
          location: '625c7d97c1a1102fc994072e',
          date: '2022-08-12T00:00:00.000Z',
          rh: 0,
          temp: 0,
          weather_code: 1,
          wDir: 'E',
          wSpd: 0,
        },
      ],
      listData: {
        Weather: 'weather_code',
        Temperature: 'temp',
        Humidity: 'rh',
        'Wind Speed': 'wSpd',
        'Wind Direction': 'wDir',
      },
      parseSatuan: {
        Weather: '',
        Temperature: ' ᵒC',
        Humidity: ' %',
        'Wind Speed': ' km/jam',
        'Wind Direction': ' ᵒ',
      },
    }
  },
  computed: {
    weather_code() {
      return weather_code
    },
    dirTo() {
      return dirTo
    },
    parseNameDir() {
      return parseNameDir
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
      var parsed = date.split('T')[0]
      return parsed.split('-')
    },
    async getData() {
      var parentDisplay = this.$parent.$parent.$parent
      this.currentDate = new Date().getHours()
      var obj = parentDisplay.obj && parentDisplay.obj.idtemplate

      this.allNDF = {}
      var ndflistener = this.allNDF
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        this.forecast.length = 0

        for (var i = 0; i < setting[obj].length; i++) {
          var el = setting[obj][i]
          var key = el.key.split('_')[2]
          var comp = el.key.split('_')[1]
          if (comp == 'WidgetForecastStick') {
            if (key == 'kecamatan') {
              const datares = await this.$axios.$get(
                'https://weather.circlegeo.com/api/cgms/weather/ndf/get?locationId=' +
                el.value.locationId
              )
              this.$set(ndflistener, el.value.ndf, datares.data)
              if (ndflistener[el.value.ndf].length > 0) {
                // for (var i = 0; i < 5; i++) {
                //   var comp = ndflistener[el.value.ndf][i]
                //   this.forecast.push(comp)
                // }
                
                var obj = {}
                ndflistener[el.value.ndf].forEach((item) => {
                  if (!obj[new Date(item.date).getUTCDate()]) {
                    obj[new Date(item.date).getUTCDate()] = []
                    obj[new Date(item.date).getUTCDate()].push(item)
                  } else {
                    obj[new Date(item.date).getUTCDate()].push(item)
                  }
                })
                var result = {}
                // console.log(obj, 'obj')
                for (var k in obj) {
                  var max = Math.max(...obj[k].map((o) => o.weather_code))
                  result[k] = obj[k].find((o) => o.weather_code === max)
                }
                Object.values(result).forEach((el, i) => {
                  if (i < 5) {
                    this.forecast.push(el)
                  }
                })
              }
              break
            }
          }
        }
      } else {
        if (
          this.$store.state.displayWidget.widgetSaved[
          obj + '_WidgetForecastStick_kecamatan'
          ]
        ) {
          this.forecast.length = 0
          var el =
            this.$store.state.displayWidget.widgetSaved[
            obj + '_WidgetForecastStick_kecamatan'
            ]
          const datares = await this.$axios.$get(
            'https://weather.circlegeo.com/api/cgms/weather/ndf/get?locationId=' +
            el.locationId
          )

          this.$set(ndflistener, el.locationId, datares.data)

          if (ndflistener[el.locationId].length > 0) {
            for (var i = 0; i < 5; i++) {
              var comp = ndflistener[el.locationId][i]
              this.forecast.push(comp)
            }
          }
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
