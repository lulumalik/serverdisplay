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
    <div class="mt-3">Popup Position From</div>
    <div>
      <v-select
        label="name"
        @option:selected="changeSelectedPositionFrom"
        v-model="positionFrom"
        :options="positionList"
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
    <div class="mt-3">Popup Position To</div>
    <div>
      <v-select
        label="name"
        @option:selected="changeSelectedPositionTo"
        v-model="positionTo"
        :options="positionList"
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
      positionFrom: null,
      positionTo: null,
      positionList: [
        { name: 'Left', value: 'left' },
        { name: 'Right', value: 'right' },
      ],
    }
  },
  methods: {
    changeSelectedPositionFrom() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetMaritimPenyebrangan_positionfrom',
        value: this.positionFrom,
      })
    },
    changeSelectedPositionTo() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetMaritimPenyebrangan_positionto',
        value: this.positionTo,
      })
    },
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
      .post('https://weather.circlegeo.com/api/cgms/weather/forward', {
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

    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetMaritimPenyebrangan_positionfrom'
      ]
    ) {
      this.positionFrom =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetMaritimPenyebrangan_positionfrom'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetMaritimPenyebrangan_positionto'
      ]
    ) {
      this.positionTo =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetMaritimPenyebrangan_positionto'
        ]
    }
  },
}
</script>