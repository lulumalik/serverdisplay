<template>
  <div>
    <div class="mb-4" :class="currentDate >= 18 ? 'text-white' : 'text-black'">
      <div class="font-bold text-6xl text-center stroke_white">
        {{ area }}
      </div>
      <div class="text-5xl text-center mt-3 stroke_white font-bold" v-if="forecast.length > 0">
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
    <div class="flex space-x-4 justify-center">
      <table class="w-full text-2xl mx-auto mt-6">
        <tr class="text-white">
          <th class="text-3xl bg-black/80 rounded-tl-lg text-left">
            <div class="pl-2">Nama Lokasi</div>
          </th>
          <th class="text-3xl bg-black/80 text-center">Cuaca</th>
          <th class="text-3xl bg-black/80 text-center">Angin</th>
          <th class="text-3xl bg-black/80 text-center">Suhu</th>
          <th class="text-3xl bg-black/80 rounded-tr-lg text-center">
            Kelembaban
          </th>
        </tr>
        <tr v-for="(b, i) in forecast" :key="i" class="text-white">
          <td class="bg-black/60" :class="i == forecast.length - 1 ? 'rounded-bl-lg' : ''">
            <div class="text-3xl" :style="{ width: forecast2.length == 0 ? '600px' : 'auto' }">
              <b>{{ b.location.subdistrict }}</b>
            </div>
          </td>
          <td class="text-center bg-black/60 font-semibold px-2 py-4">
            <div class="flex items-center justify-center space-x-2"
              :style="{ width: forecast2.length == 0 ? '500px' : 'auto' }">
              <div class="w-32 relative">
                <img :src="'/Archive/' + b.data.weather_code + '.gif'" class="w-32 absolute left-0 -top-16 pb-3" />
              </div>
              <div class="w-56 text-3xl text-left">
                {{ weather_code[b.data.weather_code] }}
              </div>
            </div>
          </td>
          <td class="text-center bg-black/60 font-semibold">
            <div class="text-3xl" :style="{ width: forecast2.length == 0 ? '300px' : 'auto' }">{{ b.data.wSpd }} km/jam
            </div>
          </td>
          <td class="text-center bg-black/60 font-semibold">
            <div class="text-3xl" :style="{ width: forecast2.length == 0 ? '100px' : 'auto' }">{{ b.data.temp }}
              <sup>o</sup>C
            </div>
          </td>
          <td :class="i == forecast.length - 1 ? 'rounded-br-lg' : ''" class="text-center bg-black/60 font-semibold">
            <div class="text-3xl" :style="{ width: forecast2.length == 0 ? '300px' : 'auto' }">{{ b.data.rh }} %</div>
          </td>
        </tr>
      </table>
      <table class="w-full text-2xl mx-auto mt-6" v-if="forecast2.length > 0">
        <tr class="text-white">
          <th class="text-3xl bg-black/80 rounded-tl-lg text-left">
            <div class="pl-2">Nama Lokasi</div>
          </th>
          <th class="text-3xl bg-black/80 text-center">Cuaca</th>
          <th class="text-3xl bg-black/80 text-center">Angin</th>
          <th class="text-3xl bg-black/80 text-center">Suhu</th>
          <th class="text-3xl bg-black/80 rounded-tr-lg text-center">
            Kelembaban
          </th>
        </tr>
        <tr v-for="(b, i) in forecast2" :key="i" class="text-white">
          <td class="bg-black/60" :class="i == forecast.length - 1 ? 'rounded-bl-lg' : ''">
            <div class="text-3xl" :style="{ width: forecast2.length == 0 ? '600px' : 'auto' }">
              <b>{{ b.location.subdistrict }}</b>
            </div>
          </td>
          <td class="text-center bg-black/60 font-semibold px-2 py-4">
            <div class="flex items-center justify-center space-x-2"
              :style="{ width: forecast2.length == 0 ? '500px' : 'auto' }">
              <div class="w-32 relative">
                <img :src="'/Archive/' + b.data.weather_code + '.gif'" class="w-32 absolute left-0 -top-16 pb-3" />
              </div>
              <div class="w-56 text-3xl text-left">
                {{ weather_code[b.data.weather_code] }}
              </div>
            </div>
          </td>
          <td class="text-center bg-black/60 font-semibold">
            <div class="text-3xl" :style="{ width: forecast2.length == 0 ? '300px' : 'auto' }">{{ b.data.wSpd }} km/jam
            </div>
          </td>
          <td class="text-center bg-black/60 font-semibold">
            <div class="text-3xl" :style="{ width: forecast2.length == 0 ? '100px' : 'auto' }">{{ b.data.temp }}
              <sup>o</sup>C
            </div>
          </td>
          <td :class="i == forecast.length - 1 ? 'rounded-br-lg' : ''" class="text-center bg-black/60 font-semibold">
            <div class="text-3xl" :style="{ width: forecast2.length == 0 ? '300px' : 'auto' }">{{ b.data.rh }} %</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { weather_code, dirTo, parseNameDir } from '../../../utils/helperNDF.js'
export default {
  data() {
    return {
      forecast: [],
      forecast2: [],
      area: '',
      allNDF: {},
      idTemplate: null,
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
      this.idTemplate = parentDisplay.obj && parentDisplay.obj.idtemplate
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj && parentDisplay.obj.idtemplate

        this.forecast.length = 0
        this.forecast2.length = 0
        setting[obj].forEach(async (el) => {
          var key = el.key.split('_')[2]
          var key1 = el.key.split('_')[1]
          if (key == 'kotkab' && key1 == 'WidgetWeatherTable2') {
            this.allNDF = {}
            this.area = el.value.kotkab
            var res2 = await this.$axios.get(
              `${this.$baseUrlNdf}/get?locationId=` +
              el.value._id
            )
            var allndf = res2.data.data.map((a) => {
              return a.locationId
            })
            const ndf2 = await this.$axios.$post(
              `${this.$baseUrlNdf}/getMany?locationId=`,
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

            res2.data.data.forEach((el, i) => {
              var datares = this.allNDF[el.locationId]
              if (datares && datares.length > 0) {
                if (i <= 12) {
                  this.forecast.push({
                    location: el,
                    data: datares[0],
                  })
                } else {
                  this.forecast2.push({
                    location: el,
                    data: datares[0],
                  })
                }
              }
            })
          }
        })
      } else {
        if (
          this.idTemplate &&
          this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWeatherTable2_kotkab'
          ]
        ) {
          var el =
            this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWeatherTable2_kotkab'
            ]

          this.allNDF = {}
          this.area = el.kotkab
          var res2 = await this.$axios.get(
            `${this.$baseUrlNdf}/get?locationId=` +
            el._id
          )
          var allndf = res2.data.data.map((a) => {
            return a.locationId
          })
          const ndf2 = await this.$axios.$post(
            `${this.$baseUrlNdf}/getMany?locationId=`,
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

          res2.data.data.forEach((el, i) => {
            var datares = this.allNDF[el.locationId]
            if (datares && datares.length > 0) {
              if (i <= 12) {
                this.forecast.push({
                  location: el,
                  data: datares[0],
                })
              } else {
                this.forecast2.push({
                  location: el,
                  data: datares[0],
                })
              }
            }
          })
        } else {
          var el = {
            "_id": "5eaf0a5e3ffd2807236959de",
            "type": "kotkab",
            "provinsi": "Kepulauan Bangka Belitung",
            "provinsi_code": "19",
            "kotkab": "Belitung Timur",
            "kotkab_code": "1906",
            "createdAt": "2020-05-03T18:15:58.687Z",
            "updatedAt": "2020-05-03T18:15:58.687Z"
          }


          this.allNDF = {}
          this.area = el.kotkab
          var res2 = await this.$axios.get(
            `${this.$baseUrlNdf}/get?locationId=` +
            el._id
          )
          var allndf = res2.data.data.map((a) => {
            return a.locationId
          })
          const ndf2 = await this.$axios.$post(
            `${this.$baseUrlNdf}/getMany?locationId=`,
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

          res2.data.data.forEach((el, i) => {
            var datares = this.allNDF[el.locationId]
            if (datares && datares.length > 0) {
              if (i <= 12) {
                this.forecast.push({
                  location: el,
                  data: datares[0],
                })
              } else {
                this.forecast2.push({
                  location: el,
                  data: datares[0],
                })
              }
            }
          })
        }
      }
    },
  },
}
</script>

<style scoped>
th {
  padding: 25px !important;
  height: 30px !important;
}

td {
  white-space: nowrap;
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 20px;
  padding-bottom: 20px;
  border: 0.1px solid rgba(0, 0, 0, 0.1);
}

.stroke_white {
  -webkit-text-fill-color: black;
  /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: white;
}
</style>