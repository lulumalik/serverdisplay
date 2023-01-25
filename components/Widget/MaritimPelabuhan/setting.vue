<template>
    <div>
      <div>Port</div>
      <div>
        <v-select
          label="portname"
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
          key: this.idTemplate + '_WidgetMaritimPelabuhan_port',
          value: this.wilpel,
        })
      },
    },
    mounted() {
      this.wilpelList = []
      this.$axios
        .post(`${this.$baseUrlNdf}/cgms/weather/forward`, {
          url: 'https://maritim.bmkg.go.id/public_api/pelabuhan_list',
        })
        .then((res) => {
          // console.log(json)
          this.wilpelList = res.data.files
          //   this.airportList = result
        })
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetMaritimPelabuhan_port'
        ]
      ) {
        this.wilpel =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetMaritimPelabuhan_port'
          ]
      }
    },
  }
  </script>