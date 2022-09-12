<template>
  <div>
    <!-- <div class="w-full mb-2">No settings</div> -->
    <div>Date type</div>
    <v-select
      label="latest"
      @option:selected="changeSelected"
      v-model="area"
      :options="listArea"
    ></v-select>
  </div>
</template>
<script>
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
        key: 'WidgetEarthquake' + '_' + this.idTemplate,
        value: this.area,
      })
    },
  },
  updated() {},
  data() {
    return {
      area: {
        latest:true
      },
      listArea: [{
        latest: 'Latest Earthquake',
      }],
    }
  },
}
</script>
