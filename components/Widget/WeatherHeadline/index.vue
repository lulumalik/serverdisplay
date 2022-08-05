<template>
  <div class="w-full">
    <div class="bg-white rounded p-3 flex items-center space-x-6 w-full">
      <div class="flex-none">
        <img
          :src="'/Archive/' + forecast[0].weather_code + '.svg'"
          class="w-32"
          alt="imgdata"
        />
      </div>
      <div class="font-bold flex-grow">
        <div class="uppercase text-3xl">
          {{ weather_code[forecast[0].weather_code] }}
        </div>
        <div class="text-3xl mt-2">{{ forecast[0].temp }}<sup>o</sup>C</div>
      </div>
      <div class="flex-grow text-xl">
        <table>
          <tr>
            <td>Humidity</td>
            <td class="font-bold">: {{ forecast[0].rh }} %</td>
          </tr>
          <tr>
            <td>Wind Speed</td>
            <td class="font-bold">: {{ forecast[0].wSpdf }} km/hours</td>
          </tr>
          <tr>
            <td>Wind Direction</td>
            <td class="font-bold">: {{ forecast[0].wDir }}</td>
          </tr>
        </table>
      </div>
      <div class="flex-grow text-xl">
        <table>
          <tr>
            <td>Min. Temperature</td>
            <td class="font-bold">: {{ forecast[0].minTemp }} <sup>o</sup>C</td>
          </tr>
          <tr>
            <td>Max. Temperature</td>
            <td class="font-bold">: {{ forecast[0].maxTemp }} <sup>o</sup>C</td>
          </tr>
        </table>
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
            if (el.key == 'WidgetWeatherHeadlinesubdistrict') {
              this.forecast.length = 0
              this.$axios
                .$get(
                  'https://api.gis.co.id/api/cgms/weather/ndf/get?locationId=' +
                    el.value.ndf
                )
                .then((res) => {
                  // console.log(res)
                  for (var i = 0; i < 1; i++) {
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