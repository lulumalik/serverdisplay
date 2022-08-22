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
          <div class="mb-4 font-bold text-center">
            <!-- {{ w.date.split('T')[1].replace('.000Z', ' UTC') }} -->
            {{
              returningTimeZone(new Date(w.date)).split(' ').splice(4, 4)[0]
            }}
            {{
            getTimeZone == 7 ? 'WIB' : getTimeZone == 6 ? 'WITA' : 'WIT'
          }}
          </div>
          <div
            class="
              rounded-t-3xl
              border-4 border-white
              flex
              items-center
              justify-center
              bg-sky-400
              w-44
              h-36
            "
          >
            <img
              :src="'/Archive/' + w.weather_code + '.svg'"
              class="w-20 mx-auto"
            />
          </div>
          <div class="p-6 bg-white rounded-b-3xl">
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
              <div>{{ w.wSpd }} km/h</div>
            </div>
            <div class="flex space-x-4 items-center mt-4">
              <div class="w-6">
                <img
                  src="/svg/dir.svg"
                  class="w-4"
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
      forecast: [
        {
          _id: '62e1d18fe1ec873f27342d0b',
          location: '625c7d97c1a1102fc994072e',
          date: 'T00:00:00.000Z',
          rh: 0,
          temp: 0,
          weather_code: 1,
          wDir: 'SE',
          wSpd: 0,
        },
        {
          _id: '62e1d18fe1ec873f27342d0c',
          location: '625c7d97c1a1102fc994072e',
          date: 'T00:00:00.000Z',
          rh: 0,
          temp: 0,
          weather_code: 1,
          wDir: 'SE',
          wSpd: 0,
        },
        {
          _id: '62e1d18fe1ec873f27342d0d',
          location: '625c7d97c1a1102fc994072e',
          date: 'T00:00:00.000Z',
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
        'Wind Speed': ' km/h',
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
    ndflistener() {
      return this.$store.state.ndfData.allNDF
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
    getData() {
      var parentDisplay = this.$parent.$parent.$parent
      if (parentDisplay.production) {
        this.forecast.length = 0
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj.idtemplate
        // console.log(setting[obj])
        setting[obj].forEach((el) => {
          var key = el.key.split('_')[2]
          if (key == 'subdistrict') {
            var datares = this.ndflistener[el.value.ndf]
              for (var i = 0; i < 3; i++) {
                var comp = datares[i]
                // if (comp.date.split('T')[1].split(':')[0] == '12') {
                this.forecast.push(comp)
                // }
              }
          }
        })
      }
    },
    // getData() {
    //   var parent = this.$parent.$parent.$parent
    //   if (parent.currentId) {
    //     this.forecast.length = 0
    //     var ndf = parent.obj.properties.widgetndf
    //     if (parent.obj.properties.widgetndf) {
    //       ndf.forEach((el) => {
    //         if (el.key == '_WidgetForecastStick_subdistrict') {
    //           // console.log(this.ndflistener[el.value.ndf], 'ea')
    //           // console.log(this.ndflistener[el.value.ndf], this.ndflistener, el.value)
    //           var datares = this.ndflistener[el.value.ndf]
    //           for (var i = 0; i < 3; i++) {
    //             var comp = datares[i]
    //             // if (comp.date.split('T')[1].split(':')[0] == '12') {
    //             this.forecast.push(comp)
    //             // }
    //           }
    //         }
    //       })
    //     }
    //   }
    // },
  },
  mounted() {
    this.getData()
  },
}
</script>
