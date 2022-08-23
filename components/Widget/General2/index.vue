<template>
  <div
    style="background-image: url('weather.png')"
    class="h-screen w-screen flex items-center justify-center font-color"
  >
    <div
      class="
        fixed
        left-0
        mx-auto
        flex
        items-center
        justify-center
        w-full
        right-0
        top-10
      "
    >
      <!--  v-for="(val,i) in weatherFiltered 
        :class="[i == 1 ? 'rounded-bl-lg' : i == 4 ? 'rounded-br-lg' : '']""
        :key="i" -->
      <div
        v-if="weatherFiltered[0]"
        class="
          bg-sky-700
          border
          rounded-b-xl
          border-sky-500
          px-6
          py-2
          font-semibold
          text-white
        "
      >
        {{
          new Date(weatherFiltered[0].date)
            .toString()
            .split(' ')
            .splice(0, 3)
            .join(' ')
        }}
      </div>
    </div>
    <div class="flex space-x-4 text-gray-700">
      <div v-for="(w, i) in weatherFiltered" :key="i">
        <div class="mb-4 font-bold text-center">
          {{ w.date.split('T')[1].replace('.000Z', ' UTC') }}
        </div>
        <div
          class="
            rounded-t-3xl
            border-4 border-white
            flex
            items-center
            justify-center
            bg-sky-400
            w-44
            h-36
          "
        >
          <img
            :src="'/Archive/' + w.weather_code + '.svg'"
            class="w-20 mx-auto"
          />
        </div>
        <div class="p-6 bg-white rounded-b-3xl">
          <div class="font-semibold text-center">
            {{ weather_code[w.weather_code] }}
          </div>
          <div class="flex space-x-4 items-center mt-8">
            <div class="w-6">
              <img src="/svg/temp.svg" class="w-4" />
            </div>
            <div>{{ w.temp }} <sup>o</sup>C</div>
          </div>
          <div class="flex space-x-4 items-center mt-4">
            <div class="w-6">
              <img src="/svg/precip.svg" class="w-4" />
            </div>
            <div>{{ w.rh }} %</div>
          </div>
          <div class="flex space-x-4 items-center mt-4">
            <div class="w-6">
              <img src="/svg/wind.svg" class="w-6 relative right-1" />
            </div>
            <div>{{ w.wSpd }} km/jam</div>
          </div>
          <div class="flex space-x-4 items-center mt-4">
            <div class="w-6">
              <img
                src="/svg/dir.svg"
                class="w-4"
                :style="{
                  transform: 'rotate(' + dirTo[w.wDir] + 'deg)',
                }"
              />
            </div>
            <div>
              {{ parseNameDir[w.wDir] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: {
      default: () => {
        return false
      },
    },
  },
  computed: {
    weatherFiltered: function () {
      return this.weather.filter((w, i) => i < 4)
    },
  },
  data() {
    return {
      weather: [],
      weather_code: {
        0: 'Cerah',
        1: 'Cerah Berawan',
        2: 'Cerah Berawan',
        3: 'Berawan',
        4: 'Berawan Tebal',
        5: 'Udara Kabur',
        10: 'Asap',
        45: 'Kabut',
        60: 'Hujan Ringan',
        61: 'Hujan Sedang',
        63: 'Hujan Lebat',
        80: 'Hujan Lokal',
        95: 'Hujan Petir',
        97: 'Hujan Petir',
      },
      dirTo: {
        N: 0,
        NNE: 22.5,
        NE: 45,
        ENE: 67.5,
        E: 90,
        ESE: 112.5,
        SE: 135,
        SSE: 157.5,
        S: 180,
        SSW: 202.5,
        SW: 225,
        WSW: 247.5,
        W: 270,
        WNW: 292.5,
        NW: 315,
        NNW: 337.5,
      },
      parseNameDir: {
        N: 'Utara',
        NNE: 'Utara Timur Laut',
        NE: 'Timur Laut',
        ENE: 'Timur',
        E: 'Tenggara',
        ESE: 'Selatan Timur',
        SE: 'Selatan',
        SSE: 'Selatan Barat',
        S: 'Barat',
        SSW: 'Barat Daya',
        SW: 'Barat Laut',
        WSW: 'Barat Barat',
        W: 'Barat Laut',
        WNW: 'Barat Barat',
        NW: 'Barat Utara',
        NNW: 'Utara Barat',
      },
    }
  },
  mounted() {
    this.$axios
      .$get(
        'https://weather.circlegeo.com/api/cgms/weather/ndf/get?latitude=-6.229728&longitude=106.6894317'
      )
      .then((res) => {
        // console.log(res)
        this.weather = res.data
      })
  },
}
</script>

  