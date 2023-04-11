<template>
    <div>
      <div>Select Data</div>
      <div>
        <v-select
          label="name"
          @option:selected="changeSelected"
          v-model="wilpel"
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
          key: this.idTemplate + '_WidgetMaritimPenyebrangan2_port',
          value: this.wilpel,
        })
      },
    },
    mounted() {
      this.wilpelList = []
      this.$axios
        .post(`${this.$baseUrlNdf}/cgms/weather/forward`, {
          url: 'https://maritim.bmkg.go.id/ajax_home/select_data/penyeberangan',
        })
        .then((res) => {
          // console.log(json)
          this.wilpelList = res.data
          //   this.airportList = result
        })
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetMaritimPenyebrangan2_port'
        ]
      ) {
        this.wilpel =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetMaritimPenyebrangan2_port'
          ]
      }
    },
  }
  </script>