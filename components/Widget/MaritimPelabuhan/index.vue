<template>
  <div>
    <client-only>
      <div>
        <div class="relative">
          <div class="text-4xl absolute bg-white/70 text-black left-3 top-3 p-8 rounded-lg font-bold text-center"
            style="z-index:1000">
            {{ showData && showData.value && showData.value.portname }}
          </div>
          <MapPenyebrangan v-if="idtemplate" style="height: 240px;width:100%;"
            class="rounded-md relative shadow-md border-2 border-white" ref="map2" :idMap="'mapPelabuhan' + idtemplate"
            @mapready="getData" />
        </div>
        <div class="flex space-x-4">
          <table class="w-full mt-4" v-for="(data, i) in listpelabuhan" :key="i">
            <tr>
              <td class="text-left rounded-tl-md bg-black text-xl text-white">
                Valid
              </td>
              <td class="text-left bg-black text-xl text-white">Cuaca</td>
              <td class="text-left bg-black text-xl text-white">Angin</td>
              <td class="text-left bg-black text-xl text-white">Arah Angin</td>
              <td class="text-left rounded-tr-md bg-black text-xl text-white">
                Gelombang
              </td>
            </tr>
            <tbody>
              <tr>
                <td class="text-left bg-black/70 text-xl text-white">
                  {{
                      new Date(
                        returningTimeZone(new Date(data.valid_to))
                      ).toLocaleDateString('id')
                  }}
                  {{
                      returningTimeZone(new Date(data.valid_to))
                        .split(' ')
                        .splice(4, 4)[0]
                        .split(':')
                        .splice(0, 2)
                        .join(':')
                  }}
                  {{
                      getTimeZone == 7 ? 'WIB' : getTimeZone == 6 ? 'WITA' : 'WIT'
                  }}
                </td>
                <td class="text-left bg-black/70 text-xl text-white">
                  {{ data.weather }}
                </td>
                <td class="text-left bg-black/70 text-xl text-white">
                  {{ data.wind_speed_min }} - {{ data.wind_speed_max }} Knots
                </td>
                <td class="text-left bg-black/70 text-xl text-white">
                  {{ data.wind_from }}
                </td>
                <td class="text-left bg-black/70 text-xl text-white">
                  {{ data.wave_desc }}
                </td>
              </tr>
              <tr>
                <td colspan="5" :class="i == 1 ? 'rounded-b-md' : ''" class="text-left bg-black/70 text-xl text-white">
                  <div class="text-2xl">
                    <div class="text-red-500">Warning</div>
                    <div :class="data.warning_desc.length > 12 ? '' : 'h-32'" v-html="data.warning_desc"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
  border: 1px solid white;
}

table {
  border-radius: 15px;
}
</style>
  
<script>
var maplibregl = require('maplibre-gl')
import VueSlickCarousel from 'vue-slick-carousel'

export default {
  data() {
    return {
      loc1: null,
      idtemplate: null,
      showData: null,
      listpelabuhan: [],
      currentDate: new Date().getHours(),
    }
  },
  components: {
    VueSlickCarousel,
  },

  computed: {
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
    returningTimeZone(date) {
      return (
        date.toString().split(' ').splice(0, 5).join(' ') +
        ' GMT+0' +
        this.getTimeZone +
        '00'
      )
    },
    initialMap(obj) {
      var self = this
      var map = this.$refs['map2'].map

      if (this.loc1) {
        this.loc1.remove()
      }
      // marker
      var el = document.createElement('div')
      el.style.width = '90px'
      el.style.height = '95px'
      el.style.backgroundImage = 'url(/defaultMarker.png)'

      self.loc1 = new maplibregl.Marker(el, {
        color: '#000',
        draggable: false,
        offset: [0, -50],
      })
        .setLngLat([obj.longitude, obj.latitude])
        .addTo(map)

      map.flyTo({
        center: [obj.longitude, obj.latitude],
        zoom: 10,
        essential: true,
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
          if (key == 'WidgetMaritimPelabuhan') {
            // arr.push(el)
            result = el
          }
        })
        this.showData = result
        this.listpelabuhan.length = 0
        // console.log(arr)
        this.$axios
          .post('https://sena.circlegeo.com/api/sena/research/forward', {
            url:
              'https://maritim.bmkg.go.id/public_api/pelabuhan/' +
              result.value.name.split('.')[0] +
              '.json',
          })
          .then((res) => {
            self.listpelabuhan = res.data.data
            self.initialMap(res.data)
          })
      } else {
        if (
          this.$store.state.displayWidget.widgetSaved[
          self.idtemplate + '_WidgetMaritimPelabuhan_port'
          ]
        ) {
          var el =
            this.$store.state.displayWidget.widgetSaved[
            self.idtemplate + '_WidgetMaritimPelabuhan_port'
            ]

          this.showData = {
            value: el,
          }
          this.listpelabuhan.length = 0
          // console.log(arr)
          this.$axios
            .post('https://sena.circlegeo.com/api/sena/research/forward', {
              url:
                'https://maritim.bmkg.go.id/public_api/pelabuhan/' +
                el.name.split('.')[0] +
                '.json',
            })
            .then((res) => {
              self.listpelabuhan = res.data.data
              self.initialMap(res.data)
            })
        }
      }
    },
  },
  async mounted() {
    // this.getData()

    var parentDisplay = this.$parent.$parent.$parent
    this.idtemplate = parentDisplay.obj && parentDisplay.obj.idtemplate

    setInterval(() => {
      this.getData()
    }, 3600000)
  },
}
</script>
  