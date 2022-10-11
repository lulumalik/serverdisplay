<template>
  <div>
    <div class="h-full w-full flex items-center justify-center font-color">
      <!-- <div
        class="
          fixed
          left-0
          mx-auto
          flex
          items-center
          justify-center
          w-full
          right-0
          top-10
        "
      >
         v-for="(val,i) in weatherFiltered 
        :class="[i == 1 ? 'rounded-bl-lg' : i == 4 ? 'rounded-br-lg' : '']""
        :key="i"
        <div
          v-if="weatherFiltered[0]"
          class="
            bg-sky-700
            border
            rounded-b-xl
            border-sky-500
            px-6
            py-2
            font-semibold
            text-white
          "
        >
          {{
            new Date(weatherFiltered[0].date)
              .toString()
              .split(' ')
              .splice(0, 3)
              .join(' ')
          }}
        </div>
      </div> -->
      <div class="flex space-x-4 text-gray-700" v-if="forecast.length > 0">
        <div v-for="(w, i) in forecast" :key="i">
          <div
            class="mb-3 font-bold text-2xl text-center"
            :class="currentDate >= 18 ? 'text-white' : 'text-black'"
          >
            <!-- {{ w.date.split('T')[1].replace('.000Z', ' UTC') }} -->
            {{ returningTimeZone(new Date(w.date)) }}
            {{ getTimeZone == 7 ? 'WIB' : getTimeZone == 6 ? 'WITA' : 'WIT' }}
          </div>
          <div
            class="
              rounded-t-3xl
              border-4 border-white
              shadow-md
              flex
              items-center
              justify-center
              bg-gradient-to-b from-indigo-500 to-blue-800
              w-44
              h-36
            "
          >
            <img
              :src="'/Archive/' + w.weather_code + '.gif'"
              class="w-44 mx-auto"
            />
          </div>
          <div class="p-6 bg-white rounded-b-3xl shadow-md">
            <div class="font-semibold text-center">
              {{ weather_code[w.weather_code] }}
            </div>
            <div class="flex space-x-4 items-center mt-8">
              <div class="w-6">
                <img src="/svg/temp.svg" class="w-4" />
              </div>
              <div>{{ w.temp }} <sup>o</sup>C</div>
            </div>
            <div class="flex space-x-4 items-center mt-4">
              <div class="w-6">
                <img src="/svg/precip.svg" class="w-4" />
              </div>
              <div>{{ w.rh }} %</div>
            </div>
            <div class="flex space-x-4 items-center mt-4">
              <div class="w-6">
                <img src="/svg/wind.svg" class="w-6 relative right-1" />
              </div>
              <div>{{ w.wSpd }} km/jam</div>
            </div>
            <div class="flex space-x-4 items-center mt-4">
              <div class="w-6">
                <img
                  src="/svg/dir.svg"
                  class="w-5 relative right-0.5"
                  :style="{
                    transform: 'rotate(' + dirTo[w.wDir] + 'deg)',
                  }"
                />
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
    returningTimeZone(date) {
      var parsed = (
        date.toString().split(' ').splice(0, 5).join(' ') +
        ' GMT+0' +
        this.getTimeZone +
        '00'
      )
        .toString()
        .split(' ')
        .splice(4, 4)
      return parsed[0] ? parsed[0].split(':').splice(0, 2).join(':') : ''
    },
    async getData() {
      var parentDisplay = this.$parent.$parent.$parent
      this.currentDate = new Date().getHours()
      if (parentDisplay.production) {
        this.forecast.length = 0
        this.allNDF = {}
        var ndflistener = this.allNDF
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj.idtemplate

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
                for (var i = 0; i < 3; i++) {
                  var comp = ndflistener[el.value.ndf][i]
                  this.forecast.push(comp)
                }
              }
              break
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
