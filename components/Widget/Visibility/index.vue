<template>
  <div class="h-44 w-full">
    &nbsp;
    <div
      :style="backgroundnize"
      class="fixed -top-24 w-full -left-6"
      style="z-index: -1"
    ></div>
    <!-- <img :src="img" class="fixed -top-24 w-full left-0" style="z-index: -1" /> -->
    <div class="
        absolute
        -bottom-10
        left-0
        w-full
      ">
      <div
        class=" 
        pt-8
        pb-12
        pr-12
        pl-16
        w-full
        h-60
         "
        :style="{ color: color, 'background-image': `linear-gradient(to bottom, rgba(${hexToRgb(backgroundColor, 0.4).join(',')}) , rgba(${hexToRgb(backgroundColor, 1).join(',')}) )` }"
      >
        <div class="font-bold text-5xl">
          {{ name !== '' ? name : 'No Name of location' }}
        </div>
        <div class="text-2xl h-56 mt-3 w-8/12">
          {{ desc !== '' ? desc : '' }}
        </div>
      </div>
      <div
        class="w-96 absolute right-12 top-8 mb-4 h-48 mx-auto rounded-full "
        :style="{ color: color, background: 'rgb(' + hexToRgb(backgroundColor).join(',') + ')' }"
      >
        <div
          class="flex items-center h-full w-full justify-center"
          :style="{ color: color }"
        >
          <div
            class=" text-left"
            style="font-weight: 200 !important"
          >
            <div class="text-5xl text-center font-semibold flex space-x-4 items-center">
              <div>Visibility</div>
            </div>
            <div class="flex space-x-3 mt-4 justify-center items-center">
              <div class=" font-semibold text-6xl ">
                <!-- :style="{color: indikator}" -->
                {{ commify(meters) }}
              </div>
              <div class="text-4xl text-center font-thin">Kilometers</div>
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
      desc: '',
      forecast: [],
      color: '#000000',
      backgroundColor: '#ffffff',
      img: '',
      backgroundnize: {},
      indikator: '#3eeb53',
      meters: 8000,
      idTemplate: null,
    }
  },
  computed: {
    weather_code: function () {
      return weather_code
    },
  },
  methods: {
    commify(n) {
      return n / 1000
    },
    hexToRgb(hex, opacity) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
            opacity || 1,
          ]
        : null
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
          if (comp == 'WidgetVisibility') {
            var key = el.key.split('_')[2]
            if (key == 'bandara') {
              const datares = await this.$axios.$get(
                'https://rami.bmkg.go.id/api/siam/code/current_or_latest/metar?icaoId=' +
                  el.value['Kode ']
              )
              // console.log(datares)
              var keys = Object.keys(datares.data)[0]
              var obj = datares.data[keys]

              this.meters = obj.parsed.visibility.meters
              if (obj.parsed && obj.parsed.cavok) {
                this.indikator = '#3eeb53'
              } else {
                if (obj.parsed && obj.parsed.visibility) {
                  this.meters = obj.parsed.visibility.meters
                  if (obj.parsed.visibility.meters > 8000) {
                    this.indikator = '#3eeb53'
                  } else if (
                    obj.parsed.visibility.meters <= 8000 &&
                    obj.parsed.visibility.meters > 4800
                  ) {
                    this.indikator = '#03c1d9'
                  } else if (
                    obj.parsed.visibility.meters <= 4800 &&
                    obj.parsed.visibility.meters > 1600
                  ) {
                    this.indikator = '#f3dd2f'
                  } else if (obj.parsed.visibility.meters <= 1600) {
                    this.indikator = '#f34f2f'
                  }
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
        if (comp == 'WidgetVisibility') {
          var key = el.key.split('_')[2]
          if (key == 'name') {
            this.name = el.value
          } else if (key == 'bandara') {
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
              height: '140%',
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
          this.idTemplate + '_WidgetVisibility_description'
        ]
      ) {
        this.desc =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetVisibility_description'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetVisibility_name'
        ]
      ) {
        this.name =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetVisibility_name'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetVisibility_color'
        ]
      ) {
        this.color =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetVisibility_color'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetVisibility_background'
        ]
      ) {
        this.backgroundColor =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetVisibility_background'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetVisibility_img'
        ]
      ) {
        this.img =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetVisibility_img'
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