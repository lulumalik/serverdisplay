<template>
  <div class="w-full py-1 text-xs">
    <div class="font-semibold flex-shrink-0 mb-2">Select Area</div>

    <v-select
      label="name"
      @option:selected="changeSelected"
      v-model="area"
      :options="params"
    ></v-select>
  </div>
</template>
  <script>
import { province } from '../../../utils/helperSpartan.js'

export default {
  data() {
    return {
      params: province,
      area: null,
    }
  },
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
        key: this.idTemplate + '_WidgetIbfForecast',
        value: this.area,
      })
    },
  },
  mounted() {
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetIbfForecast'
      ]
    ) {
      this.area =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetIbfForecast'
        ]
    }
  },
}
</script>