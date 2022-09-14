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
    </div>
  </template>
  <script>
  import { spartan, province } from '../../../utils/helperSpartan.js'
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
          key: this.idTemplate + '_WidgetSpartan_subdistrict_province',
          value: this.province,
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
    },
    data() {
      return {
        province: '',
        spartan: '',
        spartanIndex: spartan,
        listProvinsi: province,
      }
    },
  }
  </script>
  