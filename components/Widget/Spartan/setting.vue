<template>
    <div>
      <div>Spartan Index</div>
      <div>
        <v-select
          label="name"
          @option:selected="changeSelected"
          v-model="spartan"
          :options="spartanIndex"
        ></v-select>
      </div>
      <div class="mt-2">Province</div>
      <div>
        <v-select
          label="name"
          @option:selected="changeSelectedProvince"
          v-model="province"
          :options="listProvinsi"
        ></v-select>
      </div>
      <div class="mt-2">Day</div>
      <div>
        <v-select
          label="name"
          @option:selected="changeSelectedDay"
          v-model="day"
          :options="days"
        ></v-select>
      </div>
    </div>
  </template>
  <script>
  import { spartan, code, hari2 } from '../../../utils/helperSpartan.js'
  export default {
    props: {
      idTemplate: {
        default: () => {
          return ''
        },
      },
    },
    methods: {
      changeSelected() {
        this.$store.commit('displayWidget/mutationWidget', {
          key: this.idTemplate + '_WidgetSpartan_spartan',
          value: this.spartan,
        })
      },
      changeSelectedProvince() {
        this.$store.commit('displayWidget/mutationWidget', {
          key: this.idTemplate + '_WidgetSpartan_province',
          value: this.province,
        })
      },
      changeSelectedDay() {
        this.$store.commit('displayWidget/mutationWidget', {
          key: this.idTemplate + '_WidgetSpartan_day',
          value: this.day,
        })
      },
    },
    mounted() {
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetSpartan_province'
        ]
      ) {
        this.province =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetSpartan_province'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetSpartan_spartan'
        ]
      ) {
        this.spartan =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetSpartan_spartan'
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetSpartan_day'
        ]
      ) {
        this.day =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetSpartan_day'
          ]
      }
    },
    data() {
      return {
        province: '',
        spartan: '',
        day: '',
        spartanIndex: spartan,
        listProvinsi: code,
        days: hari2
      }
    },
  }
  </script>
  