<template>
  <div class="h-44 w-full">
    &nbsp;
    <div
      :style="backgroundnize"
      class="fixed -top-24 w-full left-0"
      style="z-index: -1"
    ></div>
    <!-- <img :src="img" class="fixed -top-24 w-full left-0" style="z-index: -1" /> -->
    <div
      class="
        rounded-tr-full
        pt-10
        pb-12
        pr-12
        pl-24
        w-full
        absolute
        -bottom-4
        left-0
        flex
        items-center
      "
      :style="{ background: backgroundColor }"
    >
      <div
        class="w-9/12"
        :style="{ color: color }"
      >
        <div class="font-bold text-5xl">
          {{ name !== '' ? name : 'No Name of location' }}
        </div>
        <hr
          class="w-32 mt-3"
          style="border-color: #b6b6b6"
        />
        <div class="text-lg mt-3 w-11/12 line-clamp">
          {{ desc !== '' ? desc : 'No Data' }}
        </div>
      </div>
      <div
        class="w-3/12 flex mx-auto space-x-4 relative items-center"
        v-if="forecast.length > 0"
      >
        <div class="flex-none w-28">
          <img
            :src="'/Archive/' + forecast[0].weather_code + '.gif'"
            class="w-44 mx-auto absolute -left-44 -top-12 right-0"
            alt="imgdata"
          />
        </div>
        <div
          class="flex-grow"
          :style="{ color: color }"
        >
          <div
            class="text-6xl text-left"
            style="font-weight: 200 !important"
          >
            <div>{{ forecast[0].temp }}<sup>o</sup>C</div>
          </div>
          <div class="relative text-lg left-3">
            <div class="">{{ weather_code[forecast[0].weather_code] }}</div>
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
      desc: '',
      forecast: [],
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
  },
  methods: {
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
          if (comp == 'WidgetWisataBottombar') {
            var key = el.key.split('_')[2]
            if (key == 'kecamatan') {
              // console.log(this.ndflistener[el.value.ndf], el)
              const datares = await this.$axios.$get(
                'https://weather.circlegeo.com/api/cgms/weather/ndf/get?locationId=' +
                  el.value.locationId
              )

              self.$set(ndflistener, el.value.ndf, datares.data)
              // ndflistener[el.value.ndf] = datares.data

              if (ndflistener[el.value.ndf].length > 0) {
                for (var i = 0; i < ndflistener[el.value.ndf].length; i++) {
                  var comp = ndflistener[el.value.ndf][i]
                  // if (comp.date.split('T')[1].split(':')[0] == '12') {
                  this.forecast.push(comp)
                  break
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
        if (comp == 'WidgetWisataBottombar') {
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
              height: '100%',
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
          this.idTemplate + '_WidgetWisataBottombar_description'
        ]
      ) {
        this.desc =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWisataBottombar_description'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombar_name'
        ]
      ) {
        this.name =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWisataBottombar_name'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombar_color'
        ]
      ) {
        this.color =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWisataBottombar_color'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombar_background'
        ]
      ) {
        this.backgroundColor =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWisataBottombar_background'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombar_img'
        ]
      ) {
        this.img =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWisataBottombar_img'
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