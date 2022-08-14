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
        pb-16
        pr-12
        pl-16
        w-full
        absolute
        -bottom-4
        left-0
        flex
        items-end
      "
      :style="{ background: backgroundColor }"
    >
      <div class="w-8/12" :style="{ color: color }">
        <div class="font-bold text-5xl">
          {{ name !== '' ? name : 'No Name of location' }}
        </div>
        <hr class="w-32 mt-3" style="border-color: #b6b6b6" />
        <div class="text-sm mt-3 w-11/12">
          {{ desc !== '' ? desc : 'No Data' }}
        </div>
      </div>
      <div
        class="w-4/12 flex mx-auto space-x-4 items-center"
        v-if="forecast.length > 0"
      >
        <div class="flex-none">
          <img
            :src="'/Archive/' + forecast[0].weather_code + '.svg'"
            class="w-32 mx-auto"
            alt="imgdata"
          />
        </div>
        <div class="flex-grow" :style="{ color: color }">
          <div class="text-6xl text-left" style="font-weight: 200 !important">
            <div>{{ forecast[0].temp }}<sup>o</sup>C</div>
          </div>
          <div class="relative left-5">
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
    }
  },
  computed: {
    weather_code: function () {
      return weather_code
    },
    ndflistener() {
      return this.$store.state.ndfData.allNDF
    },
  },
  methods: {
    getData() {
      var parent = this.$parent.$parent.$parent
      if (parent.currentId) {
        this.forecast.length = 0
        var ndf = parent.obj.properties.widgetndf
        if (parent.obj.properties.widgetndf) {
          ndf.forEach((el) => {
            if (el.key == '_WidgetWisataBottombar_subdistrict') {
              // console.log(this.ndflistener[el.value.ndf], 'ea')
              var datares = this.ndflistener[el.value.ndf]
              for (var i = 0; i < datares.length; i++) {
                var comp = datares[i]
                // if (comp.date.split('T')[1].split(':')[0] == '12') {
                this.forecast.push(comp)
                break
                // }
              }
            }
          })
        }
      }
    },
  },
  mounted() {
    if (this.$parent.$parent && this.$parent.$parent.$parent) {
      var parent = this.$parent.$parent.$parent
      if (parent.currentId) {
        // this.forecast.length = 0
        var ndf = parent.obj.properties.widgetndf
        if (parent.obj.properties.widgetndf) {
          ndf.forEach((el) => {
            if (el.key == '_WidgetWisataBottombar_name') {
              this.name = el.value
            } else if (el.key == '_WidgetWisataBottombar_subdistrict') {
              this.forecast.length = 0
              this.getData()
            } else if (el.key == '_WidgetWisataBottombar_description') {
              this.desc = el.value
            } else if (el.key == '_WidgetWisataBottombar_color') {
              this.color = el.value
            } else if (el.key == '_WidgetWisataBottombar_background') {
              this.backgroundColor = el.value
            } else if (el.key == '_WidgetWisataBottombar_img') {
              this.img = el.value
              this.backgroundnize = {
                'background-image': 'url(' + this.img + ')',
                'background-size': 'length',
                'background-position': 'center',
                'background-repeat': 'no-repeat',
                'height': '100%',
              }
            }
          })
        }
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