<template>
  <div class="h-44 w-full">
    &nbsp;
    <div :style="backgroundnize" class="fixed -top-24 w-full left-0" style="z-index: -1"></div>
    <div class="fixed top-0 right-4 border-l-8 z-50 px-16 py-6 backdrop-blur-md"
      :style="{ 'border-color': backgroundColor }">
      <div class="uppercase text-2xl">
        prakiraan cuaca wisata
      </div>
      <div class="font-bold text-center text-5xl" :style="{ color: color }">
        {{ name !== '' ? name : 'No Name of location' }}
      </div>
    </div>
    <div class="
        rounded-tr-full
        pt-10
        pb-12
        pr-12
        pl-12
        w-full
        absolute
        -bottom-4
        left-0
        items-center
      ">
      <!-- <div class="w-full mb-10 relative" :style="{ color: color }">
      </div> -->
      <div class="w-full flex justify-center mx-auto space-x-6 px-2 relative items-center " v-if="forecast.length > 0">
        <div v-for="(f, i) in forecast" :key="i" class="relative w-full flex space-x-4 items-center h-36 rounded-xl"
          :style="{ 'background-color': 'rgba(' + hexToRgb(backgroundColor, 0.6).join(',') + ')' }">
          <div class="w-full h-full p-3">
            <div :style="{ 'background-color': 'rgba(' + hexToRgb(backgroundColor, 0.8).join(',') + ')' }"
              class="rounded-xl h-full flex items-end justify-center">
              <img :src="'/Archive/' + f.weather_code + '.gif'" class="w-36 mx-auto absolute -top-2.5 left-0"
                alt="imgdata" />
              <div class="font-semibold text-sm text-center mb-2" :style="{ color: color }">{{
                  weather_code[f.weather_code]
              }}</div>
            </div>
          </div>
          <div class="w-full text-right" :style="{ color: color }">
            <div class="text-4xl absolute -top-12 left-0" style="font-weight: 400 !important">
              <div>{{ returningTimeZone(new Date(f.date)).split(' ')
                  .splice(4, 4)[0]
                  .split(':')
                  .splice(0, 2)
                  .join(':')
              }} <small>{{ getTimeZone == 7 ? 'WIB' : getTimeZone == 6 ? 'WITA' : 'WIT' }}</small>
                <small>({{ returningTimeZone(new Date(f.date)).split(' ')[0] }})</small>
              </div>
            </div>
            <div class="text-lg relative right-4 whitespace-nowrap">
              <div :style="{ 'background-color': 'rgba(' + hexToRgb(backgroundColor, 0.8).join(',') + ')' }"
                class="text-3xl mb-2 px-4 py-2 flex rounded-xl">
                <div class="relative w-1/2">
                  <img src="/weatherheadline/compass.svg" alt="img" />
                  <img src="/weatherheadline/arrow.svg" :style="{ transform: 'rotate(' + dirTo[f['wDir']] + 'deg)' }"
                    alt="img2" class="absolute z-30 top-0 -left-1 right-0 mx-auto" />
                </div>
                <div class="flex-none w-1/2 relative">
                  <div class="text-2xl">{{ f.wSpd }}</div>
                  <div class="text-xs absolute bottom-0 right-0">Knots</div>
                </div>
              </div>
              <div :style="{ 'background-color': 'rgba(' + hexToRgb(backgroundColor, 0.8).join(',') + ')' }"
                class=" text-3xl px-4 py-2 rounded-xl">
                {{ f.temp }} <sup>o</sup>C
              </div>
            </div>
          </div>
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
      name: '',
      desc: '',
      forecast: [],
      color: '#000000',
      backgroundColor: '#ffffff',
      img: '',
      backgroundnize: {},
      allNDF: {},
      resultData: {},
      idTemplate: null,
    }
  },
  computed: {
    weather_code: function () {
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
    hexToRgb(hex, transparent) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
          transparent ? transparent : 0.8,
        ]
        : null
    },
    returningTimeZone(date) {
      return (
        date.toString().split(' ').splice(0, 5).join(' ') +
        ' GMT+0' +
        this.getTimeZone +
        '00'
      )
    },
    async getData() {
      var self = this
      var parentDisplay = self.$parent.$parent.$parent
      if (parentDisplay.production) {
        this.allNDF = {}

        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj && parentDisplay.obj.idtemplate
        setting[obj].forEach(async (el) => {
          var comp = el.key.split('_')[1]
          if (comp == 'WidgetWisataBottombarForecast') {
            var key = el.key.split('_')[2]
            if (key == 'kecamatan') {

              const datares = await this.$axios.$get(
                'https://weather.circlegeo.com/api/cgms/weather/ndf/get?locationId=' +
                el.value.locationId
              )
              this.allNDF = datares.data
              if (datares.data.length > 0) {
                for (var i = 0; i < 4; i++) {

                  var comp = datares.data[i]
                  this.forecast.push(comp)

                }
              }
            }
          }
        })
      }
    },
  },
  mounted() {
    var parentDisplay = this.$parent.$parent.$parent
    this.idTemplate = parentDisplay.obj && parentDisplay.obj.idtemplate

    if (parentDisplay.production) {
      var setting = parentDisplay.responseDisplay.properties.allSetting
      var obj = parentDisplay.obj && parentDisplay.obj.idtemplate
      setting[obj].forEach((el) => {
        var comp = el.key.split('_')[1]
        if (comp == 'WidgetWisataBottombarForecast') {
          var key = el.key.split('_')[2]
          if (key == 'name') {
            this.name = el.value
          } else if (key == 'kecamatan') {
            this.forecast.length = 0
            this.getData()
          } else if (key == 'description') {
            this.desc = el.value
          } else if (key == 'color') {
            this.color = el.value
          } else if (key == 'background') {
            this.backgroundColor = el.value
          } else if (key == 'img') {
            this.img = el.value
            this.backgroundnize = {
              'background-image': 'url(' + this.img + ')',
              'background-size': 'cover',
              'background-position': 'center',
              'background-repeat': 'no-repeat',
              height: '120%',
            }
          }
        }
      })

      setInterval(() => {
        this.forecast.length = 0
        this.getData()
      }, 3600000)
    } else {
      if (
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombarForecast_img'
        ]
      ) {
        this.img =
          this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombarForecast_img'
          ]
        this.backgroundnize = {
          'background-image': 'url(' + this.img + ')',
          'background-size': 'cover',
          'background-position': 'center',
          'background-repeat': 'no-repeat',
          height: '120%',
        }
      }

      if (
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombarForecast_description'
        ]
      ) {
        this.desc =
          this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombarForecast_description'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombarForecast_kecamatan'
        ]
      ) {
        this.forecast.length = 0
        this.allNDF = {}
        var id = this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombarForecast_kecamatan'
        ].locationId
        this.$axios.$get(
          'https://weather.circlegeo.com/api/cgms/weather/ndf/get?locationId=' +
          id
        ).then(datares => {
          this.allNDF = datares.data
          if (datares.data.length > 0) {
            for (var i = 0; i < 4; i++) {

              var comp = datares.data[i]
              this.forecast.push(comp)

            }
          }
        })

      }
      if (
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombarForecast_name'
        ]
      ) {
        this.name =
          this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombarForecast_name'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombarForecast_color'
        ]
      ) {
        this.color =
          this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombarForecast_color'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombarForecast_background'
        ]
      ) {
        this.backgroundColor =
          this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombarForecast_background'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombarForecast_img'
        ]
      ) {
        this.img =
          this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombarForecast_img'
          ]
      }
    }
  },
}
</script>

<style scoped>
.font-color {
  color: #4e256c;
}
</style>