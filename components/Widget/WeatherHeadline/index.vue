<template>
  <div class="w-full">
    <div class="
        bg-white/70
        rounded-lg
        relative
        py-5
        px-6
        flex
        items-center
        space-x-8
        w-full
        shadow-md
      ">
      <div class="flex-none w-32">
        <img :src="'/Archive/' + forecast[0].weather_code + '.gif'" class="w-60 absolute left-0 -top-16 z-50"
          alt="imgdata" />
        <div class="w-48 text-center relative">
          <div class="font-bold text-xl absolute -bottom-16 mt-1 left-0 right-0 w-32 mx-auto text-center">
            {{ subdistrict }}
          </div>
        </div>
      </div>
      <div class="flex-grow pl-14 relative">
        <div class="text-xl font-semibold" v-if="offset && selectedTime">
          <div>{{ konversiWaktuGMT(selectedTime, offset) }} {{ returningtime }}</div>
        </div>
        <div class="uppercase font-bold  text-4xl">
          {{ weather_code[forecast[0].weather_code] }}
        </div>
        <div class="text-4xl font-bold flex items-end">
          <div class="flex-grow">{{ forecast[0].temp }}<sup>o</sup>C </div>
        </div>
      </div>
      <div class="flex-grow text-2xl">
        <table>
          <tr>
            <td>
              <div class="flex items-center space-x-3">
                <div>
                  <img class="w-4" src="/weatherheadline/Humidity.svg" />
                </div>
                <div>Kelembapan</div>
              </div>
            </td>
            <td class="font-bold pl-6">: {{ forecast[0].rh }} %</td>
          </tr>
          <tr>
            <td>
              <div class="flex items-center space-x-3 mt-2">
                <div><img class="w-5" src="/weatherheadline/WSpd.svg" /></div>
                <div class="relative right-1">Kecepatan Angin</div>
              </div>
            </td>
            <td class="font-bold pl-6">
              <div class="mt-2">: {{ forecast[0].wSpd }} km/jam</div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="flex items-center space-x-3">
                <div><img class="w-4" src="/weatherheadline/WDir.svg" /></div>
                <div>Arah Angin</div>
              </div>
            </td>
            <td class="font-bold pl-6">
              <div class="flex space-x-2 items-center">
                <div>:</div>
                <div class="relative">
                  <img src="/weatherheadline/compass.svg" alt="img" />
                  <img src="/weatherheadline/arrow.svg" :style="{
                    transform: 'rotate(' + dirTo[forecast[0].wDir] + 'deg)',
                  }" alt="img2" class="absolute z-30 top-0 left-0 right-0 mx-auto" />
                </div>
                <div>{{ dirTo[forecast[0].wDir] }}<sup>o</sup></div>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="flex-grow text-2xl" v-if="forecast[1]">
        <table>
          <tr>
            <td>
              <div class="flex items-center space-x-3">
                <div>
                  <img class="w-3" src="/weatherheadline/Temperature.svg" />
                </div>
                <div>Min. Suhu</div>
              </div>
            </td>
            <td class="font-bold pl-6">
              : {{ forecast[1].minTemp }} <sup>o</sup>C
            </td>
          </tr>
          <tr>
            <td>
              <div class="flex items-center space-x-3 mt-2">
                <div>
                  <img class="w-3" src="/weatherheadline/Temperature.svg" />
                </div>
                <div>Maks. Suhu</div>
              </div>
            </td>
            <td class="font-bold pl-6">
              <div class="mt-2">: {{ forecast[1].maxTemp }} <sup>o</sup>C</div>
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
      selectedTime: null,
      returningtime: null,
      subdistrict: null,
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
    offset() {
      return this.$store.state.ndfData.offsettime
    },
  },
  methods: {
    formatDate(dateString) {
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];

      const [year, month, day] = dateString.split("-");
      const formattedDate = `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;

      return formattedDate;
    },
    konversiWaktuGMT(waktu, offset) {
      // Mendapatkan waktu lokal
      var waktuLokal = new Date(waktu);
      // console.log(this.$parent.responseDisplay)
      var offsetjam;

      // if (this.$parent.responseDisplay.properties && this.$parent.responseDisplay.properties.timeoffset) {
      offsetjam = offset * 3600000
      this.returningtime = offset == 7 ? 'WIB' : offset == 8 ? 'WITA' : offset == 9 ? 'WIT' : ''
      // } else {
      //   offsetjam = this.getOffsetGMT() * 3600000
      //   this.returningtime = this.getOffsetGMT() == 7 ? 'WIB' : this.getOffsetGMT() == 8 ? 'WITA' : this.getOffsetGMT() == 9 ? 'WIT' : ''
      // }
      // Mendapatkan waktu GMT dengan penyesuaian offset
      var waktuGMT = new Date(waktuLokal.getTime() + (offsetjam));

      // Mengembalikan waktu GMT dalam format string
      var time = waktuGMT.toISOString()
      var date = time.split('T')[0]
      var time2 = time.split('T')[1].split(':')
      return `${this.formatDate(date)} Pukul ${[time2[0], time2[1]].join(':')}`
    },
    async getData() {
      var parentDisplay = this.$parent.$parent.$parent
      this.idTemplate = parentDisplay.obj && parentDisplay.obj.idtemplate
      this.allNDF = {}
      var ndflistener = this.allNDF
      this.forecast.length = 0
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj && parentDisplay.obj.idtemplate
        setting[obj].forEach(async (el) => {
          var key = el.key.split('_')[2]
          var key1 = el.key.split('_')[1]
          if (key == 'kecamatan' && key1 == 'WidgetWeatherHeadline') {
            const datares = await this.$axios.$get(
              `${this.$baseUrlNdf}/cgms/weather/ndf/get?locationId=` +
              el.value.locationId
            )
            this.subdistrict = el.value.subdistrict
            this.$set(ndflistener, el.value.ndf, datares.data)

            if (ndflistener[el.value.ndf].length > 0) {
              for (var i = 0; i < ndflistener[el.value.ndf].length; i++) {
                var comp = ndflistener[el.value.ndf][i]
                if (i == 0) {
                  this.forecast.push(comp)
                }
                if (comp.date.split('T')[1].split(':')[0] == '12') {
                  // console.log(ndflistener[el.value.ndf], comp)
                  // console.log(comp, 'eaea')
                  this.selectedTime = comp.date
                  this.forecast.push(comp)
                  break
                }
              }
            }
          }
        })
      } else {
        if (
          this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWeatherHeadline_kecamatan'
          ]
        ) {
          var el =
            this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWeatherHeadline_kecamatan'
            ]
          const datares = await this.$axios.$get(
            `${this.$baseUrlNdf}/cgms/weather/ndf/get?locationId=` +
            el.locationId
          )

          this.$set(ndflistener, el.locationId, datares.data)

          if (ndflistener[el.locationId].length > 0) {
            for (var i = 0; i < ndflistener[el.locationId].length; i++) {
              var comp = ndflistener[el.locationId][i]
              if (comp.date.split('T')[1].split(':')[0] == '12') {

                this.selectedTime = comp.date
                this.forecast.push(comp)
                break
              }
            }
          }
        }
      }
    },
  },
  mounted() {
    // console.log('ea')
    this.getData()
    setInterval(() => {
      this.getData()
    }, 60000)
    // if (this.$parent.$parent && this.$parent.$parent.$parent) {
  },
}
</script>