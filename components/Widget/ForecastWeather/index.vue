<template>
  <div>
    <table class="w-full rounded-md text-lg">
      <tr class="text-white font-semibold">
        <td style="background: #303030" class="rounded-tl-lg">
          {{ getTimeZone == 7 ? 'WIB' : getTimeZone == 6 ? 'WITA' : 'WIT' }}
        </td>
        <td
          style="background: #303030"
          :class="i == forecast.length - 1 ? 'rounded-tr-lg' : ''"
          class="text-center"
          v-for="(f, i) in forecast"
          :key="i"
        >
          {{ returningTimeZone(new Date(f.date)).split(' ').splice(4, 4)[0] }}
        </td>
      </tr>
      <tr v-for="(val, key, ind) in listData" :key="key">
        <td
          class="bg-sky-400"
          :class="[
            ind % 2 == 0 ? 'bg-gray-300/80' : 'bg-gray-400/80',
            ind == Object.keys(listData).length - 1 ? 'rounded-bl-lg' : '',
          ]"
        >
          <div class="whitespace-nowrap">{{ key }}</div>
        </td>
        <td
          class="text-center text-2xl"
          v-for="(f, i) in forecast"
          :key="i"
          :class="[
            ind % 2 == 0 ? 'bg-gray-100/80' : 'bg-gray-300/80',
            ,
            ind == Object.keys(listData).length - 1 && i == forecast.length - 1
              ? 'rounded-br-lg'
              : '',
          ]"
        >
          <div class="whitespace-nowrap">
            <div
              v-if="key == 'Arah Angin'"
              class="relative flex items-center justify-center space-x-2"
            >
              <div class="relative">
                <img src="/weatherheadline/compass.svg" alt="img" />
                <img src="/weatherheadline/arrow.svg" :style="{transform: 'rotate(' + dirTo[f[val]] + 'deg)'}" alt="img2" class="absolute z-30 top-0 left-0 right-0 mx-auto" />
              </div>
              <div>{{ dirTo[f[val]] }} <sup>o</sup></div>
            </div>
            <div v-else>
              {{
                key == 'Cuaca'
                  ? weather_code[f.weather_code]
                  : f[val]
              }}
              <small>{{ parseSatuan[key] }}</small>
            </div>
          </div>
        </td>
      </tr>
    </table>
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
        Cuaca: 'weather_code',
        Temperature: 'temp',
        Kelembapan: 'rh',
        'Kecepatan Angin': 'wSpd',
        'Arah Angin': 'wDir',
      },
      parseSatuan: {
        Cuaca: '',
        Temperature: ' ᵒC',
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
      this.idTemplate = parentDisplay.obj && parentDisplay.obj.idtemplate
      this.allNDF = {}
      var ndflistener = this.allNDF
      this.forecast.length = 0
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj.idtemplate
        setting[obj].forEach(async (el) => {
          var key = el.key.split('_')[2]
          var key1 = el.key.split('_')[1]
          if (key == 'kecamatan' && key1 == 'WidgetForecastWeather') {
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
          }
        })
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