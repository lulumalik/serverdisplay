<template>
  <div>
    <div class="mb-4">
      <div class="font-bold text-6xl text-center">
        {{ area }}
      </div>
      <div class="text-4xl text-center mt-3" v-if="forecast.length > 0">
        <!-- {{forecast[0].data.date}} -->
        {{
          returningTimeZone(new Date(forecast[0].data.date))
            .split(' ')
            .splice(4, 4)[0]
            .split(':')
            .splice(0, 2)
            .join(':')
        }}
        {{ getTimeZone == 7 ? 'WIB' : getTimeZone == 6 ? 'WITA' : 'WIT' }}
      </div>
    </div>
    <table class="w-full text-2xl mt-6">
      <tr style="background: #303030" class="text-white">
        <th class="text-left"><div class="pl-2">Nama Lokasi</div></th>
        <th class="text-center">Cuaca</th>
        <th class="text-center">Angin</th>
        <th class="text-center">Suhu</th>
        <th class="text-center">Kelembaban</th>
      </tr>
      <tr
        v-for="(b, i) in forecast"
        :key="i"
        style="background: rgba(48, 48, 48, 0.4)"
        class="text-white"
      >
        <td class="px-6">
          {{ b.location.location }}
        </td>
        <td class="text-center font-semibold px-2 py-4">
          <div class="flex items-center justify-center space-x-2">
            <div class="w-14">
              <img
                :src="'/Archive/' + b.data.weather_code + '.svg'"
                class="w-10"
              />
            </div>
            <div class="w-44 text-left">
              {{ weather_code[b.data.weather_code] }}
            </div>
          </div>
        </td>
        <td class="text-center font-semibold">{{ b.data.wSpd }} km/jam</td>
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
      allNDF: {},
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
  mounted() {
    this.getData()

    setInterval(() => {
      this.getData()
    }, 3600000)
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
    async getData() {
      var parentDisplay = this.$parent.$parent.$parent
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj.idtemplate

        this.forecast.length = 0
        this.allNDF = {}

        this.area = setting[obj][0].value.area
        // console.log(setting[obj][0].value.value)
        var allndf = []
        setting[obj][0].value.value.forEach((el) => {
          allndf.push(el.ndf)
        })
        const ndf2 = await this.$axios.$post(
          'https://weather.circlegeo.com/api/cgms/weather/ndf/getMany',
          {
            location: allndf,
            date: new Date().toISOString(),
          }
        )

        ndf2.data.forEach((el) => {
          if (!this.allNDF[el.location.locationId]) {
            this.allNDF[el.location.locationId] = []
          }
          this.allNDF[el.location.locationId].push(el)
        })

        setting[obj][0].value.value.forEach((el) => {
          var datares = this.allNDF[el.ndf]
          if (datares && datares.length > 0) {
            this.forecast.push({
              location: el,
              data: datares[0],
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
  padding: 15px !important;
}
</style>