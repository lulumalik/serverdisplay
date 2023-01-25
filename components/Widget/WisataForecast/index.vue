<template>
  <div class="h-44 w-full">
    &nbsp;
    <div
      :style="backgroundnize"
      class="fixed -top-32 -left-24"
      style="z-index: -1"
    ></div>
    <!-- <img :src="img" class="fixed -top-24 w-full left-0" style="z-index: -1" /> -->
    <!--  -->

    <div class="font-bold text-6xl mb-6 px-12 relative bottom-24">
      {{ name !== '' ? name : 'No Name of location' }}
    </div>
    <div class="flex w-full space-x-4 px-6 relative bottom-24">
      <div
        v-for="(val, i) in forecast"
        :key="i"
        class="flex-grow rounded-lg px-6 py-2.5"
        :style="{ background: 'rgb(' + hexToRgb(backgroundColor).join(',') + ')' }"
      >
        <div class="text-4xl mb-3">
          {{
          returningTimeZone(new Date(val.date))
            .split(' ')
            .splice(4, 4)[0]
            .split(':')
            .splice(0, 2)
            .join(':')
        }}
          {{ getTimeZone == 7 ? 'WIB' : getTimeZone == 6 ? 'WITA' : 'WIT' }}
        </div>
        <div class="relative flex">
          <div class="flex-grow">
            &nbsp;
            <img
              :src="'/Archive/' + val.weather_code + '.gif'"
              class="w-44 mx-auto absolute -left-44 -top-12 right-0"
              alt="imgdata"
            />
          </div>
          <div
            class="flex-none"
            :style="{ color: color }"
          >
            <div
              class="text-6xl text-left"
              style="font-weight: 200 !important"
            >
              <div>{{ val.temp }}<sup>o</sup>C</div>
            </div>
            <div class="text-2xl">
              <div class="">{{ weather_code[val.weather_code] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { weather_code } from '../../../utils/helperNDF.js'
export default {
  data() {
    return {
      name: '',
      forecast: [
        {
          geometry: {
            type: 'Point',
            coordinates: [107.6351667, -2.594833333],
          },
          _id: '6369c6451ada890764c59aaa',
          location: '6304a042cbb66b6ddf5b2fe4',
          date: '2022-11-08T09:00:00.000Z',
          minTemp: -9999,
          maxTemp: -9999,
          minRh: -9999,
          maxRh: -9999,
          rh: 80,
          temp: 27,
          weather_code: 1,
          wDir: 'NW',
          wSpd: 10,
          postcode: '33414',
        },
        {
          geometry: {
            type: 'Point',
            coordinates: [107.6351667, -2.594833333],
          },
          _id: '6369c6451ada890764c59aab',
          location: '6304a042cbb66b6ddf5b2fe4',
          date: '2022-11-08T12:00:00.000Z',
          minTemp: 23,
          maxTemp: 33,
          minRh: 65,
          maxRh: 100,
          rh: 80,
          temp: 26,
          weather_code: 3,
          wDir: 'W',
          wSpd: 10,
          postcode: '33414',
        },
        {
          geometry: {
            type: 'Point',
            coordinates: [107.6351667, -2.594833333],
          },
          _id: '6369c6451ada890764c59aac',
          location: '6304a042cbb66b6ddf5b2fe4',
          date: '2022-11-08T15:00:00.000Z',
          minTemp: -9999,
          maxTemp: -9999,
          minRh: -9999,
          maxRh: -9999,
          rh: 90,
          temp: 26,
          weather_code: 95,
          wDir: 'NW',
          wSpd: 10,
          postcode: '33414',
        },
        {
          geometry: {
            type: 'Point',
            coordinates: [107.6351667, -2.594833333],
          },
          _id: '6369c6451ada890764c59aad',
          location: '6304a042cbb66b6ddf5b2fe4',
          date: '2022-11-08T18:00:00.000Z',
          minTemp: -9999,
          maxTemp: -9999,
          minRh: -9999,
          maxRh: -9999,
          rh: 90,
          temp: 25,
          weather_code: 60,
          wDir: 'W',
          wSpd: 10,
          postcode: '33414',
        },
      ],
      color: '#000000',
      backgroundColor: '#ffffff',
      img: '',
      backgroundnize: {},
      allNDF: {},
      idTemplate: null,
    }
  },
  computed: {
    weather_code: function () {
      return weather_code
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
    hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
            0.8,
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
        var ndflistener = this.allNDF
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj && parentDisplay.obj.idtemplate
        setting[obj].forEach(async (el) => {
          var comp = el.key.split('_')[1]
          if (comp == 'WidgetWisataForecast') {
            var key = el.key.split('_')[2]
            if (key == 'kecamatan') {
              // console.log(this.ndflistener[el.value.ndf], el)
              const datares = await this.$axios.$get(
                `${this.$baseUrlNdf}/get?locationId=` +
                  el.value.locationId
              )

              self.$set(ndflistener, el.value.ndf, datares.data)
              // ndflistener[el.value.ndf] = datares.data

              if (ndflistener[el.value.ndf].length > 0) {
                for (var i = 0; i < 4; i++) {
                  var comp = ndflistener[el.value.ndf][i]
                  // if (comp.date.split('T')[1].split(':')[0] == '12') {
                  this.forecast.push(comp)

                  // }
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
        if (comp == 'WidgetWisataForecast') {
          var key = el.key.split('_')[2]
          if (key == 'name') {
            this.name = el.value
          } else if (key == 'kecamatan') {
            this.forecast.length = 0
            this.getData()
          } else if (key == 'color') {
            this.color = el.value
          } else if (key == 'background') {
            this.backgroundColor = el.value
          } else if (key == 'img') {
            this.img = el.value
            this.backgroundnize = {
              'background-image': 'url(' + this.img + ')',
              'background-size': 'cover',
              'background-repeat': 'no-repeat',
              height: '100vh',
              width: '100vw',
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
          this.idTemplate + '_WidgetWisataForecast_name'
        ]
      ) {
        this.name =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWisataForecast_name'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataForecast_color'
        ]
      ) {
        this.color =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWisataForecast_color'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataForecast_background'
        ]
      ) {
        this.backgroundColor =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWisataForecast_background'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataForecast_img'
        ]
      ) {
        this.img =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWisataForecast_img'
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