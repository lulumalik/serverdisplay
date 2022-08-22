<template>
  <div>
    <div>File name</div>
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
        key: this.idTemplate + '_WidgetMaritimWarning',
        value: this.area,
      })
    },
  },
  mounted() {
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetMaritimWarning'
      ]
    ) {
   
      this.area =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetMaritimWarning'
        ]
    }
  },
  data() {
    return {
      area: '',
      listArea: [{
        name: 'Warning 1',
        area: 'warning1.jpg'
      }],
    }
  },
}
</script>
