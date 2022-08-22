<template>
  <div>
    <div>Area code</div>
    <div>
      <v-select
        label="name"
        @option:selected="changeSelected"
        v-model="area"
        :options="listArea"
      ></v-select>
    </div>
  </div>
</template>
<script>
// import {dataStatic, belitung, belitungTimur} from '../../../utils/listStatic.js'
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
        key: this.idTemplate + '_WidgetForecastStick_area',
        value: this.area,
      })
    },
  },
  mounted() {
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetForecastStick_area'
      ]
    ) {
   
      this.area =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetForecastStick_area'
        ]
    }
  },
  data() {
    return {
      area: '',
      listArea: [{
        name: 'Bangka Belitung',
        area: 'CBB'
      }],
    }
  },
}
</script>
