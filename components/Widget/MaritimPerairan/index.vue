<template>
  <div class="flex space-x-4">
    <client-only>
      <div class="w-9/12 relative">
        <div class="
              absolute
              top-0
              z-50
              text-3xl
              px-4
              py-2
              bg-white
              rounded-md
              w-full
            ">
          Peta {{ showData && showData.value && showData.value.name }}
        </div>
        <MapPenyebrangan
          v-if="idtemplate"
          style="height: 650px;width:100%;"
          class="rounded-md relative shadow-md border-2 border-white"
          ref="map"
          :idMap="'mapPerairan' + idtemplate"
          @mapready="getData"
        />
      </div>
      <div
        class="w-full overflow-hidden bg-black/60"
        style="height: 650px !important"
      >
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
          <div
            v-for="(l, i) in listperairan"
            :key="i"
          >
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
                <td class="text-white text-2xl">
                  {{ forecast.weather || '-' }}
                </td>
                <td class="text-white text-2xl">
                  <div>{{ forecast.wave_desc || '-' }}</div>
                </td>
                <td class="text-white text-2xl">
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
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 1px solid white;
}
table {
  border-radius: 15px;
}
</style>

<script>
var maplibregl = require('maplibre-gl')
import VueSlickCarousel from 'vue-slick-carousel'
const turf = require('turf')

export default {
  data() {
    return {
      showData: null,
      listperairan: {},
      idtemplate: null,
      currentDate: new Date().getHours(),
      allGeojson: null,
      marker: {},
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
    initialMap(geojson) {
      var self = this
      var map = this.$refs['map'].map

      if (map.getSource('perairan')) {
        map.removeSource('perairan')
      }

      if (map.getLayer('outline')) {
        map.removeLayer('outline')
      }

      if (map.getLayer('perairan')) {
        map.removeLayer('perairan')
      }

      for (var key in this.marker) {
        if (this.marker.hasOwnProperty(key)) {
          this.marker[key].remove()
        }
      }

      map.addSource('perairan', {
        type: 'geojson',
        data: geojson,
      })

      map.addLayer({
        id: 'perairan',
        type: 'fill',
        source: 'perairan',
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.8,
        },
      })
      map.addLayer({
        id: 'outline',
        type: 'line',
        source: 'perairan',
        layout: {},
        paint: {
          'line-color': '#fff',
          'line-width': 2,
        },
      })

      // zoom to geojson
      var bounds = new maplibregl.LngLatBounds()
      geojson.features.forEach(function (feature, i) {
        feature.geometry.coordinates[0].forEach(function (coord) {
          bounds.extend(coord)
        })

        // }
      })
      map.fitBounds(bounds, {
        padding: { top: 80, bottom: 150, left: 0, right: 0 },
      })
    },
    async getData() {
      var self = this
      var parentDisplay = this.$parent.$parent.$parent
      this.idtemplate = parentDisplay.obj && parentDisplay.obj.idtemplate

      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var result = {}

        this.currentDate = new Date().getHours()
        setting[self.idtemplate].map((el) => {
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
            this.initialMap(res.data)
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
      } else {
        if (
          this.$store.state.displayWidget.widgetSaved[
            self.idtemplate + '_WidgetMaritimPerairan_wilpel'
          ]
        ) {
          var data =
            this.$store.state.displayWidget.widgetSaved[
              self.idtemplate + '_WidgetMaritimPerairan_wilpel'
            ]
          // console.log(el)
          this.showData = {
            value: data,
          }
          // console.log(arr)
          // https://maritim.bmkg.go.id/geojson-update/T.json
          this.$axios
            .post('https://sena.circlegeo.com/api/sena/research/forward', {
              url:
                'https://maritim.bmkg.go.id/geojson-update/' +
                data.id.split('.')[0] +
                '.json',
            })
            .then((res) => {
              this.initialMap(res.data)
              res.data.features.forEach((el) => {
                self.$set(
                  self.listperairan,
                  el.properties.WP_1 + '_' + el.properties.WP_IMM,
                  []
                )
              })

              Object.keys(self.listperairan).forEach((el) => {
                this.$axios
                  .post(
                    'https://sena.circlegeo.com/api/sena/research/forward',
                    {
                      url:
                        'https://maritim.bmkg.go.id/public_api/perairan/' +
                        el.split(' ').join('%20') +
                        '.json',
                    }
                  )
                  .then((res) => {
                    self.$set(self.listperairan, el, res.data.data)
                  })
              })
            })
        }
      }
    },
  },
  async mounted() {
    var parentDisplay = this.$parent.$parent.$parent
    this.idtemplate = parentDisplay.obj && parentDisplay.obj.idtemplate
    setInterval(() => {
      this.getData()
    }, 3600000)
  },
}
</script>
