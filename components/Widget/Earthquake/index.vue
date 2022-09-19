<template>
  <div>
    <div class="flex">
      <div
        class="
          bg-white/80
          flex flex-grow
          items-center
          justify-center
          overflow-hidden
        "
        v-if="datagempa.Shakemap"
      >
        <img
          style="max-width: 520px"
          :src="'https://ews.bmkg.go.id/tews/data/' + datagempa.Shakemap"
          alt="gempa"
        />
      </div>
      <div class="uppercase flex-grow text-xl bg-white/80 rounded-r-md pl-2 pr-6 py-6">
        <div class="bg-sky-500 text-xl rounded-md text-white p-4 text-center">
          <div>Informasi gempa bumi terakhir {{ datagempa.Tanggal }}</div>
          <div></div>
        </div>
        <table class="mt-4">
          <tr>
            <td class="text-sky-400 pt-4">Lokasi</td>
            <td class="pl-2 pt-4">
              : {{ datagempa.Lintang || '-' }} , {{ datagempa.Bujur || '-' }}
            </td>
          </tr>
          <tr>
            <td class="text-sky-400 pt-4">Kedalaman</td>
            <td class="pl-2 pt-4">: {{ datagempa.Kedalaman || '-' }}</td>
          </tr>
          <tr>
            <td class="text-sky-400 pt-4">Magnitude</td>
            <td class="pl-2 pt-4">: {{ datagempa.Magnitude || '-' }}</td>
          </tr>
          <tr>
            <td class="text-sky-400 pt-4">Koordinat</td>
            <td class="pl-2 pt-4">: {{ datagempa.Coordinates || '-' }}</td>
          </tr>
          <tr>
            <td class="text-sky-400 pt-4">Jam</td>
            <td class="pl-2 pt-4">: {{ datagempa.Jam || '-' }}</td>
          </tr>
        </table>
        <hr class="border-gray-300 my-8" />
        <div class="w-full" :class="datagempa.Wilayah ? '' : 'mt-16 pt-1.5'">
          <p class="mt-2.5">{{ datagempa.Dirasakan }}</p>
          <p class="mt-2.5">{{ datagempa.Wilayah || '-' }}</p>
          <p class="mt-2.5">
            {{ datagempa.Potensi || '-' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datagempa: {},
    }
  },
  methods: {
    getData() {
      this.$axios
        .post('https://sena.circlegeo.com/api/sena/research/forward', {
          url: 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json',
        })
        .then((res) => {
          this.datagempa = res.data.Infogempa.gempa
        })
    }
  },
  mounted() {
    if (this.$parent.$parent && this.$parent.$parent.$parent) {
      var parent = this.$parent.$parent.$parent
      // if (parent.currentId) {
        this.getData()

        setInterval(() => {
          this.getData()
        }, 3600000) // dua menit
    }
  },
}
</script>