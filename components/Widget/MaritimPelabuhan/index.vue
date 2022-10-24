<template>
  <div>
    <client-only>
      <div
        class="text-6xl mb-12 font-bold text-center"
        :class="currentDate >= 18 ? 'text-white' : 'text-black'"
      >
        {{ showData && showData.value && showData.value.portname }}
      </div>
      <div>
        <!-- <div>
            Warning
        </div>
        <div>
            {{data.warning_desc}}
        </div> -->
        <table class="w-full">
          <tr>
            <td class="text-left rounded-tl-md bg-black text-2xl text-white">
              Valid
            </td>
            <td class="text-left bg-black text-2xl text-white">Cuaca</td>
            <td class="text-left bg-black text-2xl text-white">Angin</td>
            <td class="text-left bg-black text-2xl text-white">Arah Angin</td>
            <td class="text-left rounded-tr-md bg-black text-2xl text-white">
              Gelombang
            </td>
          </tr>
          <tbody v-for="(data, i) in listpelabuhan" :key="i">
            <tr>
              <td class="text-left bg-black/70 text-2xl text-white">
                <!-- {{
                  new Date(
                    returningTimeZone(new Date(data.valid_from))
                  ).toLocaleDateString('id')
                }}
                {{
                  returningTimeZone(new Date(data.valid_from))
                    .split(' ')
                    .splice(4, 4)[0]
                    .split(':')
                    .splice(0, 2)
                    .join(':')
                }}
                - -->
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
              <td class="text-left bg-black/70 text-2xl text-white">
                {{ data.weather }}
              </td>
              <td class="text-left bg-black/70 text-2xl text-white">
                {{ data.wind_speed_min }} - {{ data.wind_speed_max }} Knots
              </td>
              <td class="text-left bg-black/70 text-2xl text-white">
                {{ data.wind_from }}
              </td>
              <td class="text-left bg-black/70 text-2xl text-white">
                {{ data.wave_desc }}
              </td>
            </tr>
            <tr>
              <td
                colspan="5"
                :class="i == 1 ? 'rounded-b-md' : ''"
                class="text-left bg-black/70 text-2xl text-white"
              >
                <div class="flex space-x-2 text-2xl">
                  <div>Warning</div>
                  <div v-html="data.warning_desc"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
    async getData() {
      var self = this
      var parentDisplay = this.$parent.$parent.$parent

      var obj = parentDisplay.obj && parentDisplay.obj.idtemplate
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var result = {}

        this.currentDate = new Date().getHours()
        setting[obj].map((el) => {
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
          })
      } else {
        if (
          this.$store.state.displayWidget.widgetSaved[
            obj + '_WidgetMaritimPelabuhan_port'
          ]
        ) {
          var el =
            this.$store.state.displayWidget.widgetSaved[
              obj + '_WidgetMaritimPelabuhan_port'
            ]

          this.showData = {
            value: el
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
            })
        }
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
  