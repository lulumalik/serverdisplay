<template>
  <div>
    <div>Province</div>
    <div>
      <v-select
        label="name"
        @option:selected="changeSelected"
        v-model="province"
        :options="listProvinsi"
      ></v-select>
    </div>
    <div class="mt-2">Sub District</div>
    <div>
      <v-select
        label="location"
        @option:selected="changeSelectedSub"
        v-model="subdistrict"
        :options="listKecamatan"
      ></v-select>
    </div>
  </div>
</template>
<script>
import {dataStatic} from '../../../utils/listStatic.js'
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
        key: this.idTemplate + '_WidgetForecastStick_province',
        value: this.province,
      })
    },
    changeSelectedSub() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetForecastStick_subdistrict',
        value: this.subdistrict,
      })
    },
  },
  mounted() {
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetForecastStick_province'
      ]
    ) {
   
      this.province =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetForecastStick_province'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetForecastStick_subdistrict'
      ]
    ) {
      this.subdistrict =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetForecastStick_subdistrict'
        ]
    }
  },
  data() {
    return {
      province: '',
      subdistrict: '',
      listProvinsi: [
        {
          name: 'Kepulauan Bangka Belitung',
        },
      ],
      listKecamatan: dataStatic,
    }
  },
}
</script>
