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
      listArea: [
        {
          "id": "CJK",
          "name": "Jabodetabek"
        },
        {
          "id": "CJB",
          "name": "Jawa Barat"
        },
        {
          "id": "CBT",
          "name": "Banten"
        },
        {
          "id": "CYG",
          "name": "Daerah Istimewa Yogyakarta"
        },
        {
          "id": "CJH",
          "name": "Jawa Tengah"
        },
        {
          "id": "CJT",
          "name": "Jawa Timur"
        },
        {
          "id": "CSU",
          "name": "Sumatera Utara"
        },
        {
          "id": "CPU",
          "name": "Papua"
        },
        {
          "id": "CSL",
          "name": "Sulawesi Selatan"
        },
        {
          "id": "CAH",
          "name": "Aceh"
        },
        {
          "id": "CBK",
          "name": "Bengkulu"
        },
        {
          "id": "CJI",
          "name": "Jambi"
        },
        {
          "id": "CBB",
          "name": "Bangka Belitung"
        },
        {
          "id": "CKR",
          "name": "Kepulauan Riau"
        },
        {
          "id": "CLG",
          "name": "Lampung"
        },
        {
          "id": "CRU",
          "name": "Riau"
        },
        {
          "id": "CSB",
          "name": "Sumatera Barat"
        },
        {
          "id": "CGT",
          "name": "Gorontalo"
        },
        {
          "id": "CSK",
          "name": "Sulawesi Barat"
        },
        {
          "id": "CSS",
          "name": "Sumatera Selatan"
        },
        {
          "id": "CSG",
          "name": "Sulawesi Tengah"
        },
        {
          "id": "CST",
          "name": "Sulawesi Tenggara"
        },
        {
          "id": "CSR",
          "name": "Sulawesi Utara"
        },
        {
          "id": "CML",
          "name": "Maluku"
        },
        {
          "id": "CMU",
          "name": "Maluku Utara"
        },
        {
          "id": "CPB",
          "name": "Papua Barat"
        },
        {
          "id": "CKB",
          "name": "Kalimantan Barat"
        },
        {
          "id": "CKS",
          "name": "Kalimantan Selatan"
        },
        {
          "id": "CKG",
          "name": "Kalimantan Tengah"
        },
        {
          "id": "CKT",
          "name": "Kalimantan Timur"
        },
        {
          "id": "CKU",
          "name": "Kalimantan Utara"
        },
        {
          "id": "CBL",
          "name": "Bali"
        },
        {
          "id": "CNB",
          "name": "Nusa Tenggara Barat"
        },
        {
          "id": "CNT",
          "name": "Nusa Tenggara Timur"
        }
      ],
    }
  },
}
</script>
