<template>
  <div>
    <div>Area code</div>
    <div>
      <v-select
        label="area"
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
        key: this.idTemplate + '_WidgetWarningWeather_area',
        value: this.area,
      })
    },
  },
  mounted() {
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWarningWeather_area'
      ]
    ) {
   
      this.area =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWarningWeather_area'
        ]
    }
  },
  data() {
    return {
      area: '',
      listArea: [{
        // name: 'Bangka Belitung',
        area: 'CBB'
      }, {
        area: 'CAH',
      }, {
        area: 'CBK',
      }, {
        area: 'CBL',
      }, {
        area: 'CBT',
      }, {
        area: 'CGT',
      }, {
        area: 'CJB',
      }, {
        area: 'CJH',
      }, {
        area: 'CJI',
      }, {
        area: 'CJK',
      }, {
        area: 'CJT',
      }, {
        area: 'CKB',
      }, {
        area: 'CKG',
      }, {
        area: 'CKR',
      }, {
        area: 'CKS',
      }, {
        area: 'CKT',
      }, {
        area: 'CKU',
      }, {
        area: 'CLG',
      }, {
        area: 'CML',
      }, {
        area: 'CMU',
      }, {
        area: 'CNB',
      }, {
        area: 'CNT',
      }, {
        area: 'CPB',
      }, {
        area: 'CPU',
      }, {
        area: 'CRU',
      }, {
        area: 'CSB',
      }, {
        area: 'CSG',
      }, {
        area: 'CSK',
      }, {
        area: 'CSL',
      }, {
        area: 'CSR',
      }, {
        area: 'CSS',
      }, {
        area: 'CST',
      }, {
        area: 'CSU',
      }, {
        area: 'CYG',
      }],
    }
  },
}
</script>
