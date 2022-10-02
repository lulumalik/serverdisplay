<template>
  <div>
    <div class="mb-4" :class="currentDate >= 18 ? 'text-white' : 'text-black'">
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
    <table class="w-full text-2xl mx-auto mt-6">
      <tr class="text-white bg-black/80">
        <th class="text-3xl text-left"><div class="pl-2">Nama Lokasi</div></th>
        <th class="text-3xl text-center">Cuaca</th>
        <th class="text-3xl text-center">Angin</th>
        <th class="text-3xl text-center">Suhu</th>
        <th class="text-3xl text-center">Kelembaban</th>
      </tr>
      <tr v-for="(b, i) in forecast" :key="i" class="text-white bg-black/60">
        <td>
          <div class="text-3xl">
            <b>{{ b.location.subdistrict }}</b>
          </div>
        </td>
        <td class="text-center font-semibold px-2 py-4">
          <div class="flex items-center justify-center space-x-2">
            <div class="w-24 relative">
              <img
                :src="'/Archive/' + b.data.weather_code + '.gif'"
                class="w-32 absolute left-0 -top-14"
              />
            </div>
            <div class="w-56 text-3xl text-left">
              {{ weather_code[b.data.weather_code] }}
            </div>
          </div>
        </td>
        <td class="text-center font-semibold"><div class="text-3xl">{{ b.data.wSpd }} km/jam</div></td>
        <td class="text-center font-semibold">
          <div class=text-3xl>{{ b.data.temp }} <sup>o</sup>C</div>
        </td>
        <td class="text-center font-semibold"><div class="text-3xl">{{ b.data.rh }} %</div></td>
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
      currentDate: new Date().getHours(),
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
      this.currentDate = new Date().getHours()
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj.idtemplate

        this.forecast.length = 0
        this.allNDF = {}
        this.area = setting[obj][1].value.kotkab
        var res2 = await this.$axios.get(
          'https://weather.circlegeo.com/api/cgms/weather/ndf/location?_id=' +
            setting[obj][1].value._id
        )
        var allndf = res2.data.data.map((a) => {
          return a.locationId
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

        res2.data.data.forEach((el) => {
          var datares = this.allNDF[el.locationId]
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
  padding: 25px !important;
}
td {
  white-space: nowrap;
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>