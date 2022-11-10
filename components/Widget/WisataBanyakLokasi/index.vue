<template>
  <div class="w-full">

    <!-- {{listWisata}} -->
    <div class="grid grid-cols-2 w-full gap-4">
      <div
        v-for="data in 4"
        :key="data"
        class="rounded-md p-8 shadow-md"
        :style="{background: listWisata['img' + data] ? 'url(' + listWisata['img' + data] + ')' : 'rgba(255,255,255,0.7)', backgroundSize: 'cover' }"
      >
        <div class="bg-white/70 rounded-lg px-3 py-2">
          <div class="text-4xl">{{listWisata['name' + data] }}</div>
        </div>
        <div
          class="flex space-x-4"
          v-if="listWisata['kecamatan' + data] && listWisata['kecamatan' + data].length > 0"
        >
          <div
            v-for="i in 2"
            :key="i"
          >

            <div
              :class="i == 1 ? 'border-t-2 border-gray-200' : ''"
              class="text-4xl mt-6 pt-7  mb-3"
            ><span class="py-1 px-3 rounded-lg bg-white/70">{{returningTimeZone(new Date(listWisata['kecamatan' + data][i].date)).split(' ')
              .splice(4, 4)[0]
              .split(':')
              .splice(0, 2)
              .join(':')}} {{ getTimeZone == 7 ? 'WIB' : getTimeZone == 6 ? 'WITA' : 'WIT' }}</span></div>
            <!-- <div class="flex items-center mb-3">
              <div class="flex-none text-xl">Kecepatan <br> Angin</div>
              <div class="flex-grow text-right text-4xl">{{listWisata['kecamatan' + data][i].wSpd}} Knots</div>
            </div> -->
            <div class="flex space-x-2 items-end ">
              <div class="text-2xl">
                <div class="flex-grow relative w-32 h-20 bg-white/70 flex items-center rounded-lg px-3">
                  &nbsp;
                  <img
                    :src="'/Archive/' + listWisata['kecamatan' + data][i].weather_code + '.gif'"
                    class="w-32 absolute right-1 -top-6"
                    alt="imgdata"
                  />
                </div>
              </div>
              <div class="text-6xl bg-white/70 px-3 py-1 h-20 flex items-center justify-center rounded-lg">{{listWisata['kecamatan' + data][i].temp}}<sup>o</sup>C</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <img :src="img" class="fixed -top-24 w-full left-0" style="z-index: -1" /> -->
    <!--  -->

    <!-- <div class="font-bold text-6xl mb-6 px-12 relative bottom-24">
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
    </div> -->
  </div>
</template>
    
    <script>
import { weather_code } from '../../../utils/helperNDF.js'
export default {
  data() {
    return {
      allNDF: {},
      idTemplate: null,
      listWisata: {
        name1: '',
        name2: '',
        name3: '',
        name4: '',
        img1: '',
        img2: '',
        img3: '',
        img4: '',
        kecamatan1: null,
        kecamatan2: null,
        kecamatan3: null,
        kecamatan4: null,
      },
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
    async getDataFirst(el) {
      var self = this
      var parentDisplay = self.$parent.$parent.$parent
      if (parentDisplay.production) {
        // setting[obj].forEach(async (el) => {
        var comp = el.key.split('_')[1]
        if (comp == 'WidgetWisataBanyakLokasi') {
          var key = el.key.split('_')[2]
          //
          if (key.includes('kecamatan')) {
            const datares = await self.$axios.$get(
              'https://weather.circlegeo.com/api/cgms/weather/ndf/get?locationId=' +
                el.value.locationId
            )
            self.listWisata[key] = datares.data
          }
        }
      }
    },
    async getData() {
      var self = this
      var parentDisplay = self.$parent.$parent.$parent
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj && parentDisplay.obj.idtemplate
        setting[obj].forEach(async (el) => {
          var comp = el.key.split('_')[1]
          if (comp == 'WidgetWisataBanyakLokasi') {
            var key = el.key.split('_')[2]
            //
            if (key.includes('kecamatan')) {
              const datares = await self.$axios.$get(
                'https://weather.circlegeo.com/api/cgms/weather/ndf/get?locationId=' +
                  el.value.locationId
              )
              self.listWisata[key] = datares.data
            }
            // }
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
        if (comp == 'WidgetWisataBanyakLokasi') {
          var key = el.key.split('_')[2]
          this.listWisata[key] = el.value
          this.getDataFirst(el)
        }
      })

      setInterval(() => {
        this.listWisata['kecamatan1'] = null
        this.listWisata['kecamatan2'] = null
        this.listWisata['kecamatan3'] = null
        this.listWisata['kecamatan4'] = null
        this.getData()
      }, 3600000)
    } else {
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBanyakLokasi_name'
        ]
      ) {
        this.name =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWisataBanyakLokasi_name'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBanyakLokasi_img'
        ]
      ) {
        this.img =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWisataBanyakLokasi_img'
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