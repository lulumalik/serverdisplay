<template>
  <div>
    <client-only>
      <div class="text-6xl mb-6 font-bold text-center" :class="currentDate >= 18 ? 'text-white' : 'text-black'">{{showData && showData.value && showData.value.name}}</div>
      <div class="w-full overflow-hidden bg-black/60" style="height: 730px !important">
        <VueSlickCarousel
          v-bind="settings"
          v-if="Object.keys(listperairan).length > 0"
        >
          <template #prevArrow="arrowOption">
            <div v-show="false">{{ arrowOption }}</div>
          </template>
          <template #nextArrow="arrowOption">
            <div v-show="false">
              {{ arrowOption }}
            </div>
          </template>
          <div v-for="(l, i) in listperairan" :key="i" >
            <table class="w-full">
              <tr>
                <td
                  colspan="5"
                  class="text-left rounded-t-md bg-black text-2xl text-white"
                >
                  <div>{{ i.split('_')[1] }}</div>
                </td>
              </tr>
              <tr>
                <td class="text-white text-2xl">Waktu</td>
                <td class="text-white text-2xl">Cuaca</td>
                <td class="text-white text-2xl">Gelombang</td>
                <td class="text-white text-2xl">Angin</td>
                <td class="text-white text-2xl">Arah Angin</td>
              </tr>
              <tr
                v-for="(forecast, index) in l"
                v-show="index < 2"
                :key="index"
              >
                <td
                  class="text-white text-2xl"
                  :class="index == 1 ? 'rounded-bl-md' : ''"
                >
                  {{ forecast.time_desc }}
                </td>
                <td
                  class="text-white text-2xl"
                >
                  {{ forecast.weather || '-' }}
                </td>
                <td
                  class="text-white text-2xl"
                >
                  <div>{{ forecast.wave_desc || '-' }}</div>
                </td>
                <td
                  class="text-white text-2xl"
                >
                  <div class="flex">
                    <div>{{ forecast.wind_speed_min || '-' }}</div>
                    <div>-</div>
                    <div>{{ forecast.wind_speed_max || '-' }} knots</div>
                  </div>
                </td>
                <td
                  class="text-white text-2xl"
                  :class="index == 1 ? 'rounded-br-md' : ''"
                >
                  <div>{{ forecast.wind_from || '-' }}</div>
                </td>
              </tr>
            </table>
          </div>
        </VueSlickCarousel>
      </div>
    </client-only>
  </div>
</template>

<style scoped>
td {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
}
table {
  border-radius: 15px;
}
</style>

<script>
import VueSlickCarousel from 'vue-slick-carousel'

export default {
  data() {
    return {
      showData: null,
      listperairan: {},
      currentDate: new Date().getHours(),
      settings: {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 4000,
      },
    }
  },
  components: {
    VueSlickCarousel,
  },

  methods: {
    async getData() {
      var self = this
      var parentDisplay = this.$parent.$parent.$parent
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj.idtemplate
        var result = {}

      this.currentDate = new Date().getHours()
        setting[obj].map((el) => {
          // console.log(el)
          var key = el.key.split('_')[1]
          if (key == 'WidgetMaritimPerairan') {
            // arr.push(el)
            result = el
          }
        })
        this.showData = result
        // console.log(arr)
        // https://maritim.bmkg.go.id/geojson-update/T.json
        this.$axios
          .post('https://sena.circlegeo.com/api/sena/research/forward', {
            url:
              'https://maritim.bmkg.go.id/geojson-update/' +
              result.value.id.split('.')[0] +
              '.json',
          })
          .then((res) => {
            res.data.features.forEach((el) => {
              self.$set(
                self.listperairan,
                el.properties.WP_1 + '_' + el.properties.WP_IMM,
                []
              )
            })

            Object.keys(self.listperairan).forEach((el) => {
              this.$axios
                .post('https://sena.circlegeo.com/api/sena/research/forward', {
                  url:
                    'https://maritim.bmkg.go.id/public_api/perairan/' +
                    el.split(' ').join('%20') +
                    '.json',
                })
                .then((res) => {
                  self.$set(self.listperairan, el, res.data.data)
                })
            })
          })
      }
    },
  },
  async mounted() {
    this.getData()
    setInterval(() => {
      this.getData()
    }, 3600000)
  },
}
</script>
