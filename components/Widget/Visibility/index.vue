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
        -bottom-4
        left-0
        flex
        items-center
        space-x-6
      ">
      <div
        class="w-8/12 
        pt-8
        pb-12
        pr-12
        pl-12
        w-full rounded-xl
        h-60
         "
        :style="{ color: color, background: 'rgb(' + hexToRgb(backgroundColor).join(',') + ')' }"
      >
        <div class="font-bold text-5xl">
          {{ name !== '' ? name : 'No Name of location' }}
        </div>
        <hr
          class="w-32 mt-3"
          style="border-color: #b6b6b6"
        />
        <p class="text-3xl mt-3 line-clamp w-11/12">
          {{ desc !== '' ? desc : 'No Data' }}
        </p>
      </div>
      <div
        class="w-4/12 h-60 flex mx-auto rounded-xl 
        pt-8
        pb-8
        pr-12
        pl-12
        w-full space-x-4 relative"
        :style="{ color: color, background: 'rgb(' + hexToRgb(backgroundColor).join(',') + ')' }"
      >
        <div
          class="flex-grow"
          :style="{ color: color }"
        >
          <div
            class=" text-left"
            style="font-weight: 200 !important"
          >
            <div class="text-5xl font-semibold flex space-x-4 items-center">
              <div>Visibility</div>
            </div>

            <hr
              class="w-32 mt-3"
              style="border-color: #b6b6b6"
            />
            <div class="flex space-x-3 mt-4 items-center">
              <div class=" font-semibold text-8xl ">
                <!-- :style="{color: indikator}" -->
                {{ commify(meters) }}
              </div>
              <div class="text-6xl font-thin">Kilometers</div>
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