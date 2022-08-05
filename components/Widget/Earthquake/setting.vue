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
      listKecamatan: [
        {
          'nama lokasi': 'pantai tanjung tinggi ',
          Kecamatan: 'Sijuk',
          'ID NDF': '5011055',
        },
        {
          'nama lokasi': 'P. Tanjung Pendam',
          Kecamatan: 'Tajung Pandan',
          'ID NDF': '501367',
        },
        {
          'nama lokasi': 'Wisata Replika Sekolah Laskar Pelangi',
          Kecamatan: 'Gantung',
          'ID NDF': '5011058',
        },
        {
          'nama lokasi': 'P. Tanjung Kelayang',
          Kecamatan: 'Sijuk',
          'ID NDF': '5011055',
        },
        {
          'nama lokasi': 'P. Bukit Berahu',
          Kecamatan: 'Sijuk',
          'ID NDF': '5011055',
        },
        {
          'nama lokasi': 'Pulau Lengkuas',
          Kecamatan: 'Sijuk',
          'ID NDF': '5011054',
        },
        {
          'nama lokasi': 'P. Penyabong',
          Kecamatan: 'Membalong',
          'ID NDF': '5011052',
        },
        {
          'nama lokasi': 'Wisata Museum Kata Andrea Hirata',
          Kecamatan: 'Gantung',
          'ID NDF': '5011058',
        },
        {
          'nama lokasi': 'Danau Kaolin',
          Kecamatan: 'Tanjung Pandan',
          'ID NDF': '501367',
        },
        {
          'nama lokasi': 'Eco wisata Gusong Bugis',
          Kecamatan: 'Tanjung Pandan',
          'ID NDF': '501367',
        },
      ],
    }
  },
}
</script>
