<template>
  <div>
    <div class="w-full mb-2">No settings</div>
    <!-- <select
      v-model="selected"
      @change="changeSelected"
      class="px-2 py-1 rounded w-full mt-0.5 border border-gray-300"
    >
      <option disabled value="">Select Location</option>
      <option v-for="(l, i) in listKecamatan" :key="i" :value="l['ID NDF']">
        {{ l['nama lokasi'] }}
      </option>
    </select> -->
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
        value: this.selected,
      })
    },
  },
  updated() {
   
  },
  data() {
    return {
      selected: '',
      listKecamatan: []
    }
  },
}
</script>
