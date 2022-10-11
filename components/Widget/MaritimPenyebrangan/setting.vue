<template>
    <div>
      <div>Select Wilpel</div>
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
      }
    },
    methods: {
      changeSelected() {
        this.$store.commit('displayWidget/mutationWidget', {
          key: this.idTemplate + '_WidgetMaritimPerairan_wilpel',
          value: this.wilpel,
        })
      },
    },
    mounted() {
      this.$axios
        .post('https://sena.circlegeo.com/api/sena/research/forward', {
          url: 'https://maritim.bmkg.go.id/ajax_home/select_data/pelayanan',
        })
        .then((res) => {
          // console.log(json)
        //   console.log(res)
        this.wilpelList = res.data
        //   this.airportList = result
        })
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetMaritimPerairan_wilpel'
        ]
      ) {
        this.wilpel =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetMaritimPerairan_wilpel'
          ]
      }
    },
  }
  </script>