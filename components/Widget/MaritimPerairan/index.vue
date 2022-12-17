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
              bg-indigo-500
              text-white
              rounded-md
              w-full
              font-bold text-center
            ">
          Prakiraan Wilayah Perairan <br> {{ showData && showData.value && showData.value.name }}
        </div>

        <MapPenyebrangan v-if="idtemplate" style="height: 650px;width:100%;"
          class="rounded-md relative shadow-md border-2 border-white" ref="map" :idMap="'mapPerairan' + idtemplate"
          @mapready="getData" />
        <div class="absolute bg-white rounded p-2 text-xs bottom-4 left-4">
          <div class="mb-1">Legenda</div>
          <div v-for="(l, i) in legenda" :key="i" class="flex items-center space-x-2">
            <div class="h-3 w-3 rounded-full" :style="{ background: l.color }"></div>
            <div>{{ l.kategori }}</div>
          </div>
        </div>
      </div>
      <div class="w-full overflow-hidden" style="height: 650px !important">
        <VueSlickCarousel v-bind="settings" v-if="Object.keys(listperairan).length > 0">
          <template #prevArrow="arrowOption">
            <div v-show="false">{{ arrowOption }}</div>
          </template>
          <template #nextArrow="arrowOption">
            <div v-show="false">
              {{ arrowOption }}
            </div>
          </template>
          <div v-for="(l, i) in listperairan" :key="i">
            <div class="w-full bg-white rounded-md mb-4 text-black">
              <div class="bg-indigo-500 px-4 py-2 rounded-md font-bold">
                <div class="text-left rounded-t-md text-white font-semibold text-3xl">
                  <div>{{ i }}</div>
                </div>
              </div>
              <div class="px-4 pb-4 pt-6">
                <div v-if="l && l[0]">
                  <!-- <div class="text-2xl pb-4 text-center" :class="index == 1 ? 'rounded-bl-md' : ''">
                    <div class=" w-32 mx-auto">{{ forecast.time_desc }}</div>
                  </div> -->
                  <div class="grid grid-cols-4 h-28 pt-3">
                    <div class="text-2xl relative">
                      <div>
                        <img :src="'/Archive/' + weather_code[l[0].weather] + '.gif'"
                          class="w-32 absolute -top-14 left-4 mx-auto" alt="cerah" />
                      </div>
                      <div class="mt-8 pt-2.5 text-center mr-6">{{ l[0].weather || '-' }}</div>
                    </div>
                    <div class="text-2xl mt-2">
                      <div class="text-2xl font-bold">Gelombang</div>
                      <div class="mt-1">{{ l[0].wave_desc || '-' }}</div>
                    </div>
                    <div class="text-2xl mt-2">
                      <div class="text-2xl font-bold">Kec. Angin</div>
                      <div class="flex mt-1">
                        <div>{{ l[0].wind_speed_min || '-' }}</div>
                        <div>-</div>
                        <div>{{ l[0].wind_speed_max || '-' }} knots</div>
                      </div>
                    </div>
                    <div class="text-2xl mt-2" :class="i == 1 ? 'rounded-br-md' : ''">

                      <div class="text-2xl font-bold">Arah Angin</div>
                      <div class="mt-1">{{ l[0].wind_from || '-' }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </VueSlickCarousel>
      </div>
    </client-only>
  </div>
</template>

<style scoped>
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
      weather_code: {
        'Cerah': 0,
        'Cerah Berawan': 1,
        'Berawan': 3,
        'Berawan Tebal': 4,
        'Udara Kabur': 5,
        'Asap': 10,
        'Kabut': 45,
        'Hujan Ringan': 60,
        'Hujan Sedang': 61,
        'Hujan Lebat': 63,
        'Hujan Lokal': 80,
        'Hujan Petir': 95,
      },
      legenda: [
        {
          kategori: 'Tenang 0.1 - 0.5 m',
          color: '#2793f2',
          gelombang: '0.1 - 0.5 m'
        },
        {
          kategori: 'Rendah 0.5 - 1.25 m',
          color: '#00d342',
          gelombang: '0.5 - 1.25 m'
        },
        {
          kategori: 'Sedang 1.25 - 2.50 m',
          color: '#fff200',
          gelombang: '1.25 - 2.50 m'
        },
        {
          kategori: 'Tinggi 2.50 - 4.0 m',
          color: '#fd8436',
          gelombang: '2.50 - 4.0 m'
        },
        {
          kategori: 'Sangat Tinggi 4.0 - 6.0 m',
          color: '#fb0b15',
          gelombang: '4.0 - 6.0 m'
        },
        {
          kategori: 'Ekstrem 6.0 - 9.0 m',
          color: '#ef38ce',
          gelombang: '6.0 - 9.0 m'
        },
        {
          kategori: 'Sangat Ekstrem 2.50 - 4.0 m',
          color: '#000000',
          gelombang: '2.50 - 4.0 m'
        },

      ]
    }
  },
  components: {
    VueSlickCarousel,
  },
  methods: {
    initialMap(geojson, id) {
      // console.log(geojson)
      var self = this
      var map = this.$refs['map'].map

      if (map.getSource(id)) {
        map.removeSource(id)
      }

      if (map.getLayer(id + 'outline')) {
        map.removeLayer(id + 'outline')
      }

      if (map.getLayer(id)) {
        map.removeLayer(id)
      }

      for (var key in this.marker) {
        if (this.marker.hasOwnProperty(key)) {
          this.marker[key].remove()
        }
      }

      map.addSource(id, {
        type: 'geojson',
        data: geojson,
      })
      // console.log(geojson)
      // console.log()
      map.addLayer({
        id: id,
        type: 'fill',
        source: id,
        paint: {
          'fill-color': this.legenda.filter((val) => val.gelombang == geojson.properties.gelombang)[0].color || '#088',
          'fill-opacity': 0.8,
        },
      })
      map.addLayer({
        id: id + 'outline',
        type: 'line',
        source: id,
        layout: {},
        paint: {
          'line-color': '#fff',
          'line-width': 2,
        },
      })
    },
    async getData() {
      var self = this
      var parentDisplay = this.$parent.$parent.$parent
      this.idtemplate = parentDisplay.obj && parentDisplay.obj.idtemplate
      this.listperairan = {}
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
          .post('https://weather.circlegeo.com/api/cgms/weather/forward', {
            url:
              'https://maritim.bmkg.go.id/geojson-update/' +
              result.value.id.split('.')[0] +
              '.json',
          })
          .then(async (res) => {
            var features = {
              type: 'FeatureCollection',
              features: [],
            }
            await new Promise((resolve, reject) => {
              res.data.features.forEach(async (el, i) => {
                const res2 = await this.$axios
                  .post('https://weather.circlegeo.com/api/cgms/weather/forward', {
                    url:
                      'https://maritim.bmkg.go.id/public_api/perairan/' +
                      el.properties.WP_1 + '_' + el.properties.WP_IMM +
                      '.json',
                  })

                el.properties.gelombang = res2.data.data[0].wave_desc
                self.initialMap(el, el.properties.WP_1 + '_' + el.properties.WP_IMM)

                self.$set(self.listperairan, el.properties.WP_IMM, res2.data.data)
                if (i == res.data.features.length - 1) {
                  resolve('done')
                }
              })
            })

            var map = this.$refs['map'].map
            // zoom to geojson
            var bounds = new maplibregl.LngLatBounds()
            res.data.features.forEach(function (feature, i) {
              feature.geometry.coordinates[0].forEach(function (coord) {
                bounds.extend(coord)
              })

              // }
            })
            map.fitBounds(bounds, {
              padding: { top: 150, bottom: 150, left: 0, right: 0 },
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
            .post('https://weather.circlegeo.com/api/cgms/weather/forward', {
              url:
                'https://maritim.bmkg.go.id/geojson-update/' +
                data.id.split('.')[0] +
                '.json',
            })
            .then((res) => {
              this.initialMap(res.data, 'perairan')
              res.data.features.forEach((el) => {
                self.$set(
                  self.listperairan,
                  el.properties.WP_1 + '_' + el.properties.WP_IMM,
                  {
                    geometry: el
                  }
                )
              })

              Object.keys(self.listperairan).forEach((el) => {
                this.$axios
                  .post(
                    'https://weather.circlegeo.com/api/cgms/weather/forward',
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
