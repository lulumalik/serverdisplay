<template>
  <div
    style="background-image: url('weather.png')"
    class="h-screen w-screen flex items-center justify-center font-color"
  >
    <div class="">
      <div class="text-3xl text-gray-700 text-center">
        <div class="font-semibold">PRAKIRAAN CUACA BMKG</div>
        <div>KOTA BANDUNG</div>
        <div class="my-8">
          {{ new Date(weather.date).toString().split(' ').splice(4, 1)[0] }} WIB
        </div>
      </div>
      <div class="flex justify-center items-center">
        <div
          class="
            w-56
            h-56
            rounded-full
            bg-sky-400
            border-8
            flex
            items-center
            justify-center
            border-white
            relative
            z-50
          "
        >
          <div>
            <img :src="'/Archive/' + weather.weather_code +'.svg'" class="w-28 mx-auto" alt="cerah" />
            <div class="font-bold text-white mt-1 text-center text-lg">{{weather_code[weather.weather_code]}}</div>
          </div>
        </div>
        <div class="bg-white pl-20 relative z-40 right-12 py-6 pr-6 text-3xl text-gray-700 rounded-3xl flex">
          <div class="border-r-2 border-gray-300 pr-8">
            <div class="flex space-x-4">
              <img src="/svg/temp.svg" class="w-4" alt="temp" /><b
                >{{weather.temp}}<sup>o</sup>C</b
              >
            </div>
            <div class="flex space-x-4 mt-4">
              <img src="/svg/wind.svg" class="w-7 relative right-1" />
              <div class="relative right-2.5"><b>{{weather.wSpd}}</b> <sub>km/jam</sub></div>
            </div>
          </div>
          <div class="pl-8">
            <div class="flex space-x-4"><img src="/svg/precip.svg" class="w-4"/><b>{{weather.rh}} %</b></div>
            <div class="mt-4 flex space-x-4"><img src="/svg/dir.svg" class="w-5 relative right-0.5" /><div>{{parseNameDir[weather.wDir]}}</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   weather: {
  //     type: Object,
  //     default: () => ({}),
  //   }
  // },
    data() {
    return {
      weather: {},
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
      }
    }
  },
  mounted() {
    this.$axios
      .$get(
        'https://weather.circlegeo.com/api/cgms/weather/ndf/get?latitude=-6.229728&longitude=106.6894317'
      )
      .then((res) => {
        // console.log(res)
        this.weather = res.data[0]
      })
  },
}
</script>