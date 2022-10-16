<template>
  <div>
    <div>From</div>
    <div>
      <v-select
        label="portname"
        @option:selected="changeSelected"
        v-model="wilpel"
        :options="wilpelList"
      ></v-select>
    </div>
    <div class="mt-3">To</div>
    <div>
      <v-select
        label="portname"
        @option:selected="changeSelected2"
        v-model="wilpel2"
        :options="wilpelList"
      ></v-select>
    </div>
  </div>
</template>
  
  <script>
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
      wilpelList: [],
      wilpel: null,
      wilpel2: null,
    }
  },
  methods: {
    changeSelected() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetMaritimPenyebrangan_from',
        value: this.wilpel,
      })
    },
    changeSelected2() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetMaritimPenyebrangan_to',
        value: this.wilpel2,
      })
    },
  },
  mounted() {
    this.wilpelList = []
    this.$axios
      .post('https://sena.circlegeo.com/api/sena/research/forward', {
        url: 'https://maritim.bmkg.go.id/public_api/pelabuhan_list',
      })
      .then((res) => {
        // console.log(json)
        this.wilpelList = res.data.files
        //   this.airportList = result
      })
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetMaritimPenyebrangan_from'
      ]
    ) {
      this.wilpel =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetMaritimPenyebrangan_from'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetMaritimPenyebrangan_to'
      ]
    ) {
      this.wilpel2 =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetMaritimPenyebrangan_to'
        ]
    }
  },
}
</script>