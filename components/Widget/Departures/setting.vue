<template>
  <div>
    <div>Select Airport</div>
    <div>
      <v-select
        label="tagname"
        @option:selected="changeSelected"
        v-model="airportSelected"
        :options="airportList"
      ></v-select>
    </div>
    <!-- <div class="mt-2">Image Url</div>
    <div>
      <input
        type="text"
        class="px-2 py-1.5 w-full border border-gray-300 rounded"
        @input="changeName"
        v-model="url"
        placeholder="url"
      />
    </div> -->
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
      url: '',
      airportSelected: null,
    }
  },
  methods: {
    changeSelected() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetDepartures_airport',
        value: this.airportSelected,
      })
    },
    // changeName() {
    //   this.$store.commit('displayWidget/mutationWidget', {
    //     key: this.idTemplate + '_WidgetDepartures_url',
    //     value: this.url,
    //   })
    // },
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
        this.idTemplate + '_WidgetDepartures_airport'
      ]
    ) {
      this.airportSelected =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetDepartures_airport'
        ]
    }
    // if (
    //   this.$store.state.displayWidget.widgetSaved[
    //     this.idTemplate + '_WidgetDepartures_url'
    //   ]
    // ) {
    //   this.url =
    //     this.$store.state.displayWidget.widgetSaved[
    //       this.idTemplate + '_WidgetDepartures_url'
    //     ]
    // }
  },
}
</script>