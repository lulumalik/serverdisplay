<template>
  <div>
    <div class="mb-4">
      <div class="font-bold text-6xl text-center stroke_white">
        {{ area }}
      </div>
      <div class="text-5xl text-center mt-3 font-bold stroke_white" v-if="forecast.length > 0">
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
    <div>
      <div class="grid grid-cols-3 relative" style="width:1920px;right:280px">
        <div v-for="(b, i) in forecast" :key="i" class="arrow my-2 basis-1/3 rounded-l-lg right-arrow"
          :style="{ 'z-index': i - (i - 2) }">
          <div class="text-gray-800">
            <div>
              <div class="text-3xl" :style="{ width: forecast2.length == 0 ? '600px' : 'auto' }">
                <b>{{ b.location.subdistrict }}</b>
              </div>
            </div>
            <div class="flex items-end">
              <div class="text-center ">
                <div class=" items-center justify-center space-x-2">
                  <div class="w-32 relative">
                    &nbsp;
                    <img :src="'/Archive/' + b.data.weather_code + '.gif'" class="w-32 absolute -left-8 -top-2" />
                  </div>
                  <div class="w-64 text-3xl font-semibold pl-20 text-left">
                    {{ weather_code[b.data.weather_code] }}
                  </div>
                </div>
              </div>
              <div class="text-center  items-end font-semibold">
                <div class="text-2xl">Kec. Angin</div>
                <div class="flex">
                  <div class="text-3xl">{{ b.data.wSpd }}</div>
                  <div class="text-xl">km/jam</div>
                </div>
              </div>
              <div class="text-center ml-12 items-end font-semibold">
                <div class="text-2xl">Suhu</div>
                <div class="flex">
                  <div class="text-3xl">{{ b.data.temp }}</div>
                  <div class="text-xl"><sup>o</sup>C</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 
          </div>
          <div class="text-center bg-black/60 font-semibold">
            <div
              class="text-3xl"
            >{{ b.data.wSpd }} km/jam</div>
          </div>
          <div class="text-center bg-black/60 font-semibold">
            <div
              class="text-3xl"
            >{{ b.data.temp }} <sup>o</sup>C</div>
          </div>
          <div
            :class="i == forecast.length - 1 ? 'rounded-br-lg' : ''"
            class="text-center bg-black/60 font-semibold"
          >
            <div
              class="text-3xl"
            >{{ b.data.rh }} %</div>
          </div> -->
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
      this.idTemplate = parentDisplay.obj.idtemplate
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj && parentDisplay.obj.idtemplate

        this.forecast.length = 0
        this.forecast2.length = 0
        setting[obj].forEach(async (el) => {
          var key = el.key.split('_')[2]
          var key1 = el.key.split('_')[1]
          if (key == 'kotkab' && key1 == 'WidgetWeatherArrow') {
            this.allNDF = {}
            this.area = el.value.kotkab
            var res2 = await this.$axios.get(
              'https://weather.circlegeo.com/api/cgms/weather/ndf/location?_id=' +
              el.value._id
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
          this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWeatherArrow_kotkab'
          ]
        ) {
          var el =
            this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWeatherArrow_kotkab'
            ]

          this.allNDF = {}
          this.area = el.kotkab
          var res2 = await this.$axios.get(
            'https://weather.circlegeo.com/api/cgms/weather/ndf/location?_id=' +
            el._id
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
  -webkit-text-fill-color: black; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: white;
}
.breadcramb-container {
  display: flex;
  align-items: center;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 150px;
  padding-left: 85px;
  margin-left: 5px;
  background: rgba(255, 255, 255, 0.8);
  position: relative;
  color: white;
}

.left-arrow:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 35px solid rgba(255, 255, 255, 0.7);
  border-top: 80px solid transparent;
  border-bottom: 80px solid transparent;
}

.right-arrow:before {
  content: "";
  position: absolute;
  right: -35px;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 35px solid rgba(255, 255, 255, 0.8);
  z-index: 1000;
  border-top: 75px solid transparent;
  border-bottom: 75px solid transparent;
}

.left-rounded {
  border-radius: 25px 0 0 25px;
}

.right-rounded {
  border-radius: 0 25px 25px 0;
}
</style>