<template>
  <div>
    <table class="w-full rounded text-lg">
      <tr class="bg-sky-500 text-white font-semibold">
        <td>
          Time ({{
            getTimeZone == 7 ? 'WIB' : getTimeZone == 6 ? 'WITA' : 'WIT'
          }})
        </td>
        <td class="text-center" v-for="(f, i) in forecast" :key="i">
          {{ returningTimeZone(new Date(f.date)).split(' ').splice(4, 4)[0] }}
        </td>
      </tr>
      <tr v-for="(val, key, ind) in listData" :key="key">
        <td
          class="bg-sky-400 text-white"
          :class="ind % 2 == 0 ? 'bg-sky-300/80' : 'bg-sky-400/80'"
        >
          <div class="whitespace-nowrap">{{ key }}</div>
        </td>
        <td
          class="text-center text-2xl"
          v-for="(f, i) in forecast"
          :key="i"
          :class="ind % 2 == 0 ? 'bg-sky-100/80' : 'bg-sky-300/80'"
        >
          <div class="whitespace-nowrap">
            {{
              key == 'Weather'
                ? weather_code[f.weather_code]
                : key == 'Wind Direction'
                ? dirTo[f[val]]
                : f[val]
            }}
            <small>{{ parseSatuan[key] }}</small>
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
      var parent = this.$parent.$parent.$parent
      if (parent.currentId) {
        this.forecast.length = 0
        var ndf = parent.obj.properties.widgetndf
        if (parent.obj.properties.widgetndf) {
          ndf.forEach((el) => {
            if (el.key == '_WidgetForecastWeather_subdistrict') {
              // console.log(this.ndflistener[el.value.ndf], 'ea')
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
      }
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<style scoped>
td {
  padding: 16px 14px 16px 14px !important;
}
</style>