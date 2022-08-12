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
        label="subdistrict"
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
        key: this.idTemplate + '_WidgetWeatherHeadline_province',
        value: this.province,
      })
    },
    changeSelectedSub() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWeatherHeadline_subdistrict',
        value: this.subdistrict,
      })
    },
  },
  mounted() {
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWeatherHeadline_province'
      ]
    ) {
   
      this.province =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWeatherHeadline_province'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWeatherHeadline_subdistrict'
      ]
    ) {
      this.subdistrict =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWeatherHeadline_subdistrict'
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
