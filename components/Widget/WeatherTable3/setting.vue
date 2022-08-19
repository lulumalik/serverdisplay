<template>
  <div>
    <div>Select Area</div>
    <div class="mt-2">
      <v-select
        label="area"
        class="p-0 w-full"
        v-model="area"
        @option:selected="changeSelected"
        :options="listKecamatan"
      ></v-select>
    </div>
  </div>
</template>

<script>
import {
  pangkalPinang,
  belitung,
  dataStatic,
  belitungTimur
} from '../../../utils/listStatic.js'
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
      area: '',
      listKecamatan: [
        {
          area: 'Belitung',
          value: belitung,
        },
        {
          area: 'Belitung Timur',
          value: belitungTimur,
        },
        {
          area: 'Pangkal Pinang',
          value: pangkalPinang,
        },
        {
          area: 'Wisata Bangka Belitung',
          value: dataStatic,
        },
      ],
    }
  },
  methods: {
    changeSelected() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWeatherTable3_arrayNDF',
        value: this.area,
      })
    },
  },
  mounted() {
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWeatherTable3_arrayNDF'
      ]
    ) {
      this.area =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWeatherTable3_arrayNDF'
        ]
    }
  },
}
</script>