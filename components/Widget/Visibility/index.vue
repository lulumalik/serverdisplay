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
      <div class="w-9/12" :style="{ color: color }">
        <div class="font-bold text-5xl">
          {{ name !== '' ? name : 'No Name of location' }}
        </div>
        <hr class="w-32 mt-3" style="border-color: #b6b6b6" />
        <div class="text-sm mt-3 w-11/12">
          {{ desc !== '' ? desc : 'No Data' }}
        </div>
      </div>
      <div class="w-3/12 flex mx-auto space-x-4 relative items-center">
        <div class="flex-grow" :style="{ color: color }">
          <div class="text-6xl text-left" style="font-weight: 200 !important">
            <div class="text-xl">Visibility</div>
            <div class="flex space-x-2 items-end">
              <div class="relative">
                {{ commify(meters) }}
                <div
                  class="w-4 h-4 absolute top-0 -right-6 rounded-full"
                  :style="{ background: indikator }"
                ></div>
              </div>
              <div class="text-xl">meters</div>
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
      var parts = n.toString().split('.')
      const numberPart = parts[0]
      const decimalPart = parts[1]
      const thousands = /\B(?=(\d{3})+(?!\d))/g
      return (
        numberPart.replace(thousands, '.') +
        (decimalPart ? '.' + decimalPart : '')
      )
    },
    async getData() {
      var self = this
      var parentDisplay = self.$parent.$parent.$parent
      if (parentDisplay.production) {
        this.allNDF = {}
        var ndflistener = this.allNDF
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj.idtemplate
        setting[obj].forEach(async (el) => {
          var key = el.key.split('_')[2]
          if (key == 'bandara') {
            const datares = await this.$axios.$get(
              'https://rami.bmkg.go.id/api/siam/code/current_or_latest/metar?icaoId=' +
                el.value['Kode ']
            )
            // console.log(datares)
            var keys = Object.keys(datares.data)[0]
            var obj = datares.data[keys]

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
        })
      }
    },
  },
  mounted() {
    var parentDisplay = this.$parent.$parent.$parent
    this.idTemplate = parentDisplay.obj && parentDisplay.obj.idtemplate

    if (parentDisplay.production) {
      var setting = parentDisplay.responseDisplay.properties.allSetting
      var obj = parentDisplay.obj.idtemplate
      setting[obj].forEach((el) => {
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
            height: '100%',
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