<template>
  <div>
      <div class="mb-4">
      <div class="font-bold text-4xl text-center">
        {{ area }}
      </div>
      <div class="text-2xl text-center mt-3" v-if="forecast.length > 0">
        <!-- {{forecast[0].data.date}} -->
        {{
          returningTimeZone(new Date(forecast[0].data.date))
            .split(' ')
            .splice(4, 4)[0]
        }}
        {{ getTimeZone == 7 ? 'WIB' : getTimeZone == 6 ? 'WITA' : 'WIT' }}
      </div>
    </div>
    <table class="w-full text-2xl mt-6">
      <tr>
        <th>Nama Lokasi</th>
        <th>Cuaca</th>
        <th>Angin</th>
        <th>Suhu</th>
        <th>Kelembaban</th>
      </tr>
      <tr
        v-for="(b, i) in forecast"
        :key="i"
        :class="i % 2 == 0 ? 'bg-sky-100/80' : 'bg-sky-300/80'"
      >
        <td class="px-6">
          {{ b.location.location }}
        </td>
        <td class="text-center font-semibold">
          <div class="flex items-center justify-center space-x-2">
            <div class="w-14">
              <img
                :src="'/Archive/' + b.data.weather_code + '.svg'"
                class="w-12"
              />
            </div>
            <div class="w-44 text-left">{{ weather_code[b.data.weather_code] }}</div>
          </div>
        </td>
        <td class="text-center font-semibold">{{ b.data.wSpd }} km/h</td>
        <td class="text-center font-semibold">
          {{ b.data.temp }} <sup>o</sup>C
        </td>
        <td class="text-center font-semibold">{{ b.data.rh }} %</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { weather_code, dirTo, parseNameDir } from '../../../utils/helperNDF.js'
export default {
  data() {
    return {
      forecast: [],
      area: '',
    }
  },
  computed: {
    ndflistener() {
      return this.$store.state.ndfData.allNDF
    },
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
  mounted() {
    this.getData()
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

        ndf.forEach((el) => {
          if (el.key == '_WidgetWeatherTable_arrayNDF') {
            this.area = el.value.area
            el.value.value.forEach((el) => {
              var datares = this.ndflistener[el.ndf]
              this.forecast.push({
                location: el,
                data: datares[0],
              })
            })
          }
        })
      }
    },
  },
}
</script>

<style scoped>
th {
  padding: 10px;
  background-color: rgba(0, 105, 255, 0.8);
}
</style>