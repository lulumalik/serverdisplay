<template>
  <div>
    <client-only>
      <WidgetForecastHorizontal />
      <!-- <PluginsGeneral3 :weather="weather[0]" /> -->
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
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
      }
    }
  },
  // mounted() {
  //   this.$axios
  //     .$get(
  //       'https://api.gis.co.id/api/cgms/weather/ndf/get?latitude=-6.229728&longitude=106.6894317'
  //     )
  //     .then((res) => {
  //       // console.log(res)
  //       this.weather = res.data
  //     })
  // },
}
</script>
