<template>
  <div>
    <div class="mb-4" :class="isDark ? 'text-white' : 'text-black'">
      <div class="font-bold text-6xl text-center">
        {{ area }}
      </div>
      <div class="text-5xl text-center mt-3 font-bold" v-if="forecast.length > 0">
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
      <div class="grid grid-cols-3 relative" style="width:1920px;right:280px" v-if="forecast.length <= 12">
        <div v-for="(b, i) in forecast" :key="i" class="arrow my-2 rounded-l-lg rounded-r-lg"
          :style="{ 'z-index': i - (i - 2) }">
          <div class="text-gray-800">
            <div>
              <div
                class="text-3xl bg-indigo-500 w-full rounded-lg px-5 text-center py-2 text-white absolute left-0 top-0">
                <b>{{ b.location.subdistrict }}</b>
              </div>
            </div>
            <div class="grid grid-cols-3 mt-2 absolute bottom-5 left-5 w-full">
              <div class="text-center">
                <div class=" items-start justify-center space-x-2">
                  <div class="w-32 relative">
                    <img :src="'/Archive/' + b.data.weather_code + '.gif'" class="w-32 absolute left-14"
                      style="top:-6.2rem" />
                  </div>
                  <div class="w-56 text-3xl font-semibold text-center mt-12 pt-1 text-left">
                    {{ weather_code[b.data.weather_code] }}
                  </div>
                </div>
              </div>
              <div class="text-left pl-16 font-semibold">
                <div class="text-2xl">Kec. Angin</div>
                <div class="flex mt-2">
                  <div class="text-5xl">{{ b.data.wSpd }}</div>
                  <div class="text-xl ml-1.5">km/jam</div>
                </div>
              </div>
              <div class="text-left pl-12 font-semibold">
                <div class="text-2xl">Suhu</div>
                <div class="flex mt-2">
                  <div class="text-5xl">{{ b.data.temp }}</div>
                  <div class="text-2xl ml-1.5"><sup>o</sup>C</div>
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
      <div v-else>
        <div>
          <carousel :vertical="true" :autoPlay="true" :playSpeed="4000" :itemsToShow="1" 
          :wheelControl="false"
          :hoverPause="false"
            style="height: 1000px;width:1920px;right:280px" class="relative">
            <carouselitem v-for="(forecast2, i) in parsedforecast" :key="i" style="height:900px;">
              <div class="grid grid-cols-3">
                <div v-for="(b, k) in forecast2" :key="k" class="arrow my-2 w-full h-80 rounded-l-lg rounded-r-lg"
                  :style="{ 'z-index': i - (i - 2) }">
                  <div class="text-gray-800">
                    <div>
                      <div
                        class="text-3xl bg-indigo-500 w-full rounded-lg px-5 text-center py-2 text-white absolute left-0 top-0">
                        <b>{{ b.location.subdistrict }}</b>
                      </div>
                    </div>
                    <div class="grid grid-cols-3 mt-2 absolute bottom-5 left-5 w-full">
                      <div class="text-center">
                        <div class=" items-start justify-center space-x-2">
                          <div class="w-32 relative">
                            <img :src="'/Archive/' + b.data.weather_code + '.gif'" class="w-32 absolute left-14"
                              style="top:-6.2rem" />
                          </div>
                          <div class="w-56 text-3xl font-semibold text-center mt-12 pt-1 text-left">
                            {{ weather_code[b.data.weather_code] }}
                          </div>
                        </div>
                      </div>
                      <div class="text-left pl-16 font-semibold">
                        <div class="text-2xl">Kec. Angin</div>
                        <div class="flex mt-2">
                          <div class="text-5xl">{{ b.data.wSpd }}</div>
                          <div class="text-xl ml-1.5">km/jam</div>
                        </div>
                      </div>
                      <div class="text-left pl-12 font-semibold">
                        <div class="text-2xl">Suhu</div>
                        <div class="flex mt-2">
                          <div class="text-5xl">{{ b.data.temp }}</div>
                          <div class="text-2xl ml-1.5"><sup>o</sup>C</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </carouselitem>
          </carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import VueSlickCarousel from 'vue-slick-carousel'

import { weather_code, dirTo, parseNameDir } from '../../../utils/helperNDF.js'
export default {
  components: {
    VueSlickCarousel
  },
  data() {
    return {
      forecast: [],
      forecast2: [],
      area: '',
      allNDF: {},
      idTemplate: null,
      settings: {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        verticalSwiping: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 4000,
      },
      isDark: false,
    }
  },
  computed: {
    weather_code() {
      return weather_code
    },
    parsedforecast() {
      var arr = []
      this.forecast.forEach((el, i) => {
        if (i < 12) {
          if (!arr[0]) {
            arr[0] = []
          }
          arr[0].push(el)
        } else if (i < 24) {
          if (!arr[1]) {
            arr[1] = []
          }
          arr[1].push(el)
        } else if (i < 36) {
          if (!arr[2]) {
            arr[2] = []
          }
          arr[2].push(el)
        } else if (i < 48) {
          if (!arr[3]) {
            arr[3] = []
          }
          arr[3].push(el)
        } else if (i < 60) {
          if (!arr[4]) {
            arr[4] = []
          }
          arr[4].push(el)
        }
      })
      return arr
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
      this.idTemplate = parentDisplay.obj && parentDisplay.obj.idtemplate
      if (parentDisplay.isHujan) {
        this.isDark = true
      } else if (new Date().getHours() >= 18 || new Date().getHours() <= 5) {
        this.isDark = true
      } else {
        this.isDark = false
      }
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
              `${this.$baseUrlNdf}/cgms/weather/ndf/location?_id=` +
              el.value._id
            )
            var allndf = res2.data.data.map((a) => {
              return a.locationId
            })
            const ndf2 = await this.$axios.$post(
              `${this.$baseUrlNdf}/cgms/weather/ndf/getMany?locationId=`,
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
                // if (i <= 12) {
                this.forecast.push({
                  location: el,
                  data: datares[0],
                })
                // } else {
                //   this.forecast2.push({
                //     location: el,
                //     data: datares[0],
                //   })
                // }
              }
            })
          }
        })
      } else {
        if (
          this.idTemplate &&
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
            `${this.$baseUrlNdf}/cgms/weather/ndf/location?_id=` +
            el._id
          )
          var allndf = res2.data.data.map((a) => {
            return a.locationId
          })
          const ndf2 = await this.$axios.$post(
            `${this.$baseUrlNdf}/cgms/weather/ndf/getMany?locationId=`,
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
              // if (i <= 12) {
              this.forecast.push({
                location: el,
                data: datares[0],
              })
              // } else {
              //   this.forecast2.push({
              //     location: el,
              //     data: datares[0],
              //   })
              // }
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
            `${this.$baseUrlNdf}/cgms/weather/ndf/location?_id=` +
            el._id
          )
          var allndf = res2.data.data.map((a) => {
            return a.locationId
          })
          const ndf2 = await this.$axios.$post(
            `${this.$baseUrlNdf}/cgms/weather/ndf/getMany?locationId=`,
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
              // if (i <= 12) {
              this.forecast.push({
                location: el,
                data: datares[0],
              })
              // } else {
              //   this.forecast2.push({
              //     location: el,
              //     data: datares[0],
              //   })
              // }
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

.breadcramb-container {
  display: flex;
  align-items: center;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 190px;
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
  border-top: 85px solid transparent;
  border-bottom: 85px solid transparent;
}

.right-arrow:before {
  content: "";
  position: absolute;
  right: -35px;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 91px solid rgba(255, 255, 255, 0.8);
  z-index: 1000;
  border-top: 91px solid transparent;
  border-bottom: 91px solid transparent;
}

.left-rounded {
  border-radius: 25px 0 0 25px;
}

.right-rounded {
  border-radius: 0 25px 25px 0;
}
</style>