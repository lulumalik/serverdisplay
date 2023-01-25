<template>
  <div>
    <div class="w-full rounded-md text-lg">
      <div class="text-white grid grid-cols-4 font-semibold">
        <div class="rounded-tl-lg bg-indigo-500">
          <div class="text-3xl pl-6 py-3">Parameter</div>
        </div>
        <div :class="i == forecast.length - 1 ? 'rounded-tr-lg' : ''" class="text-center  
              bg-indigo-500" v-for="(f, i) in forecast" :key="i">
          <div class="text-3xl py-3"> {{
              getSecondOnly(
                returningTimeZone(new Date(f.date)).split(' ').splice(4, 4)[0]
              )
          }}
            {{ getTimeZone == 7 ? 'WIB' : getTimeZone == 6 ? 'WITA' : 'WIT' }}</div>
        </div>
      </div>
      <div>
        <div v-for="(val, key, ind) in listData" :key="key" class="flex">
          <div class="text-3xl flex-none bg-white mt-0.5 py-4" style="width:320px;" :class="[
            ind == Object.keys(listData).length - 1 ? 'rounded-bl-lg' : '',
          ]">
            <div class="whitespace-nowrap font-semibold pl-6">{{ key }}</div>
          </div>
          <div class="grid grid-cols-3 bg-white mt-0.5 py-4 flex-grow">
            <div class="text-center text-3xl" v-for="(f, i) in forecast" :key="i" :class="[
              ,
              ind == Object.keys(listData).length - 1 && i == forecast.length - 1
                ? 'rounded-br-lg'
                : '',
            ]">
              <div class="whitespace-nowrap">
                <div v-if="key == 'Arah Angin'" class="relative flex items-center justify-center space-x-2">
                  <div class="relative">
                    <img src="/weatherheadline/compass.svg" alt="img" />
                    <img src="/weatherheadline/arrow.svg" :style="{ transform: 'rotate(' + dirTo[f[val]] + 'deg)' }"
                      alt="img2" class="absolute z-30 top-0 left-0 right-0 mx-auto" />
                  </div>
                  <div class="text-3xl">{{ dirTo[f[val]] }} <sup>o</sup></div>
                </div>
                <div v-else class="text-3xl">
                  {{ key == 'Cuaca' ? weather_code[f.weather_code] : f[val] }}
                  <span>{{ parseSatuan[key] }}</span>
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
import { weather_code, dirTo, parseNameDir } from '../../../utils/helperNDF.js'
export default {
  data() {
    return {
      idTemplate: null,
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
        Cuaca: 'weather_code',
        Suhu: 'temp',
        Kelembapan: 'rh',
        'Kecepatan Angin': 'wSpd',
        'Arah Angin': 'wDir',
      },
      parseSatuan: {
        Cuaca: '',
        Suhu: ' ᵒC',
        Kelembapan: ' %',
        'Kecepatan Angin': ' km/jam',
        'Arah Angin': ' ᵒ',
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
    getSecondOnly(val) {
      if (val) {
        return val.split(':')[0] + ':' + val.split(':')[1]
      }
    },
    returningTimeZone(date) {
      return (
        date.toString().split(' ').splice(0, 5).join(' ') +
        ' GMT+0' +
        this.getTimeZone +
        '00'
      )
    },
    async getData() {
      var parentDisplay = this.$parent.$parent.$parent
      this.idTemplate = parentDisplay.obj && parentDisplay.obj.idtemplate
      this.allNDF = {}
      var ndflistener = this.allNDF
      if (parentDisplay.production) {
        this.forecast.length = 0
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj && parentDisplay.obj.idtemplate
        setting[obj].forEach(async (el) => {
          var key = el.key.split('_')[2]
          var key1 = el.key.split('_')[1]
          if (key == 'kecamatan' && key1 == 'WidgetForecastWeather') {
            const datares = await this.$axios.$get(
              `${this.$baseUrlNdf}/cgms/weather/ndf/get?locationId=` +
              el.value.locationId
            )

            this.$set(ndflistener, el.value.ndf, datares.data)

            if (ndflistener[el.value.ndf].length > 0) {
              for (var i = 0; i < 3; i++) {
                var comp = ndflistener[el.value.ndf][i]
                this.forecast.push(comp)
              }
            }
          }
        })
      } else {
        if (
          this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetForecastWeather_kecamatan'
          ]
        ) {
          var el =
            this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetForecastWeather_kecamatan'
            ]

          this.forecast.length = 0
          const datares = await this.$axios.$get(
            `${this.$baseUrlNdf}/cgms/weather/ndf/get?locationId=` +
            el.locationId
          )

          this.$set(ndflistener, el.locationId, datares.data)

          if (ndflistener[el.locationId].length > 0) {
            for (var i = 0; i < 3; i++) {
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
    }, 60000)
  },
}
</script>

<style scoped>
td {
  padding: 16px 14px 16px 14px !important;
}
</style>