<template>
  <div>
    <table class="w-full rounded text-lg">
      <tr class="bg-sky-500 text-white font-semibold">
        <td>Time (UTC)</td>
        <td class="text-center" v-for="(f, i) in forecast" :key="i">
          {{ f.date.split('T')[1].replace('.000Z', '') }}
        </td>
      </tr>
      <tr v-for="(val, key) in listData" :key="key">
        <td class="bg-sky-400 text-white">{{ key }}</td>
        <td
          class="bg-white text-center"
          v-for="(f, i) in forecast"
          :key="i"
        >
          {{ key == 'Weather' ? weather_code[f.weather_code] : f[val] }}
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
  },
  mounted() {
    if (this.$parent.$parent && this.$parent.$parent.$parent) {
      var parent = this.$parent.$parent.$parent
      if (parent.currentId) {
        // this.forecast.length = 0
        var ndf = parent.obj.properties.widgetndf
        if (parent.obj.properties.widgetndf) {
          ndf.forEach((el) => {
            if (el.key == 'WidgetForecastWeathersubdistrict') {
              this.forecast.length = 0
              this.$axios
                .$get(
                  'https://api.gis.co.id/api/cgms/weather/ndf/get?locationId=' +
                    el.value.ndf
                )
                .then((res) => {
                  // console.log(res)
                  for (var i = 0; i < 3; i++) {
                    this.forecast.push(res.data[i])
                  }
                })
            }
          })
        }
      }
    }
  },
}
</script>

<style scoped>
td {
  padding: 16px 10px 16px 10px !important;
}
</style>