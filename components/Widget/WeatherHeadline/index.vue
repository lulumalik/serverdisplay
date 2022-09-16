<template>
  <div class="w-full">
    <div
      class="bg-white/70 rounded py-3 px-6 flex items-center space-x-8 w-full"
    >
      <div class="flex-none rounded-full">
        <img
          :src="'/Archive/' + forecast[0].weather_code + '.svg'"
          class="w-32"
          alt="imgdata"
        />
      </div>
      <div class="font-bold flex-grow">
        <div class="uppercase text-4xl">
          {{ weather_code[forecast[0].weather_code] }}
        </div>
        <div class="text-4xl mt-2">{{ forecast[0].temp }}<sup>o</sup>C</div>
      </div>
      <div class="flex-grow text-2xl">
        <table>
          <tr>
            <td>
              <div class="flex items-center space-x-3">
                <div>
                  <img class="w-4" src="/weatherheadline/Humidity.svg" />
                </div>
                <div>Humidity</div>
              </div>
            </td>
            <td class="font-bold pl-6">: {{ forecast[0].rh }} %</td>
          </tr>
          <tr>
            <td>
              <div class="flex items-center space-x-3">
                <div><img class="w-5" src="/weatherheadline/WSpd.svg" /></div>
                <div class="relative right-1">Wind Speed</div>
              </div>
            </td>
            <td class="font-bold pl-6">: {{ forecast[0].wSpd }} km/jam</td>
          </tr>
          <tr>
            <td>
              <div class="flex items-center space-x-3">
                <div><img class="w-4" src="/weatherheadline/WDir.svg" /></div>
                <div>Wind Direction</div>
              </div>
            </td>
            <td class="font-bold pl-6">
              : {{ dirTo[forecast[0].wDir] }}<sup>o</sup>
            </td>
          </tr>
        </table>
      </div>
      <div class="flex-grow text-2xl">
        <table>
          <tr>
            <td>
              <div class="flex items-center space-x-3">
                <div>
                  <img class="w-3" src="/weatherheadline/Temperature.svg" />
                </div>
                <div>Min. Temperature</div>
              </div>
            </td>
            <td class="font-bold pl-6">
              : {{ forecast[0].minTemp }} <sup>o</sup>C
            </td>
          </tr>
          <tr>
            <td>
              <div class="flex items-center space-x-3">
                <div>
                  <img class="w-3" src="/weatherheadline/Temperature.svg" />
                </div>
                <div>Max. Temperature</div>
              </div>
            </td>
            <td class="font-bold pl-6">
              : {{ forecast[0].maxTemp }} <sup>o</sup>C
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { weather_code, dirTo, parseNameDir } from '../../../utils/helperNDF.js'
export default {
  data() {
    return {
      forecast: [
        {
          _id: '62e1d18fe1ec873f27342d0b',
          location: '625c7d97c1a1102fc994072e',
          date: 'T00:00:00.000Z',
          rh: 0,
          temp: 0,
          weather_code: 1,
          wDir: 'SE',
          wSpd: 0,
        },
      ],
      listData: {
        Weather: 'weather_code',
        Temperature: 'temp',
        Humidity: 'rh',
        'Wind Speed': 'wSpd',
        'Wind Direction': 'wDir',
      },
    }
  },
  computed: {
    weather_code() {
      return weather_code
    },
    dirTo() {
      return dirTo
    },
    parseNameDir() {
      return parseNameDir
    },
    ndflistener() {
      return this.$store.state.ndfData.allNDF
    },
  },
  methods: {
    getData() {
      var parentDisplay = this.$parent.$parent.$parent
      this.idTemplate = parentDisplay.obj && parentDisplay.obj.idtemplate
      this.allNDF = {}
      var ndflistener = this.allNDF
      this.forecast.length = 0
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj.idtemplate
        setting[obj].forEach(async (el) => {
          var key = el.key.split('_')[2]
          var key1 = el.key.split('_')[1]
          if (key == 'subdistrict' && key1 == 'WidgetWeatherHeadline') {
            const datares = await this.$axios.$get(
              'https://weather.circlegeo.com/api/cgms/weather/ndf/get?locationId=' +
                el.value.ndf
            )

            this.$set(ndflistener, el.value.ndf, datares.data)

            if (ndflistener[el.value.ndf].length > 0) {
              for (var i = 0; i < ndflistener[el.value.ndf].length; i++) {
                var comp = ndflistener[el.value.ndf][i]
                if (comp.date.split('T')[1].split(':')[0] == '12') {
                  this.forecast.push(comp)
                  break
                }
              }
            }
          }
        })
      }
      // var parent = this.$parent.$parent.$parent
      // if (parent.currentId) {
      //   this.forecast.length = 0
      //   var ndf = parent.obj.properties.widgetndf
      //   if (parent.obj.properties.widgetndf) {
      //     ndf.forEach((el) => {
      //       if (el.key == '_WidgetWeatherHeadline_subdistrict') {
      //         // console.log(this.ndflistener[el.value.ndf], 'ea')
      //         var datares = this.ndflistener[el.value.ndf]
      //         for (var i = 0; i < datares.length; i++) {
      //           var comp = datares[i]
      //           if (comp.date.split('T')[1].split(':')[0] == '12') {
      //             this.forecast.push(comp)
      //             break
      //           }
      //         }
      //       }
      //     })
      //   }
      // }
    },
  },
  mounted() {
    // console.log('ea')
    this.getData()
    // if (this.$parent.$parent && this.$parent.$parent.$parent) {
  },
}
</script>