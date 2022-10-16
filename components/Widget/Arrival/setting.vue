<template>
  <div>
    <div v-for="(airport, i) in listedAirport" :key="i">
      <div class="mt-2">Select Airport {{ i + 1 }}</div>
      <div>
        <v-select
          label="tagname"
          @option:selected="changeSelected"
          v-model="airport.value"
          :options="airportList"
        ></v-select>
      </div>
      <!-- <div class="mt-2">Image Url</div>
      <div>
        <input
          type="text"
          class="px-2 py-1.5 w-full border border-gray-300 rounded"
          @input="changeSelected"
          v-model="airport.url"
          placeholder="url"
        />
      </div> -->
    </div>
    <div
      @click="listedAirport.push({})"
      class="
        bg-gray-100
        border-gray-300 border
        w-full
        py-1.5
        text-center
        font-bold
        text-gray-600
        mt-2
        cursor-pointer
      "
    >
      +
    </div>
  </div>
</template>
  
  <script>
const xml = require('txml')
export default {
  props: {
    idTemplate: {
      default: () => {
        return ''
      },
    },
  },
  data() {
    return {
      listedAirport: [{}],
      airportList: [],
      bound: {
        _southWest: {
          lat: -17.811456088564473,
          lng: 93.77929687500001,
        },
        _northEast: {
          lat: 16.846605106396304,
          lng: 146.03027343750003,
        },
      },
    }
  },
  methods: {
    changeSelected() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetArrival_airport',
        value: this.listedAirport,
      })
    },
  },
  mounted() {
    this.$axios
      .post('https://sena.circlegeo.com/api/sena/research/forward', {
        url: 'http://aviation.bmkg.go.id/latest/observation.xml.php',
      })
      .then((res) => {
        const json = xml.parse(res.data)
        // console.log(json)
        var result = []
        json[1].children.forEach((el) => {
          result.push({
            icaoid: el.children[0].children[0],
            tagname: el.children[1].children[0],
          })
        })
        this.airportList = result
      })
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetArrival_airport'
      ]
    ) {
      this.listedAirport =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetArrival_airport'
        ]
    }
  },
}
</script>