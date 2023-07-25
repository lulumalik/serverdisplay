<template>
  <div>
    <div class="grid grid-cols-2">
      <div class="
          flex flex-none
          items-center
          justify-center
          overflow-hidden
          rounded-lg
          w-full
        " v-if="datagempa.Shakemap">
        <div style="width:580px;height:680px" class="bg-white/80 flex items-center justify-center rounded-lg">
          <div class="font-bold absolute text-center">
            <img src="/bmkg.png" alt="bmkg" class="w-20 mx-auto mb-8" />
            <div>Image not yet available</div>
            <div class="text-xs">this page will automatically get the latest images</div>
          </div>
          <img style="max-width: 580px" class="rounded-lg shadow-lg relative z-50"
            :src="'https://ews.bmkg.go.id/tews/data/' + datagempa.Shakemap" alt="gempa" />
        </div>
      </div>
      <div class="uppercase flex-grow text-xl bg-white/80 rounded-lg shadow-md px-6 py-6">
        <div class="bg-indigo-500 text-2xl rounded-md font-bold text-white p-4 text-center">
          <div>Informasi gempa bumi terkini</div>
          <div></div>
        </div>
        <table class="mx-3 my-6 font-semibold">
          <tr>
            <td class="pt-4">Lokasi</td>
            <td class="pl-2 pt-4">
              : {{ datagempa.Lintang || '-' }} , {{ datagempa.Bujur || '-' }}
            </td>
          </tr>
          <tr>
            <td class="pt-4">Kedalaman</td>
            <td class="pl-2 pt-4">: {{ datagempa.Kedalaman || '-' }}</td>
          </tr>
          <tr>
            <td class="pt-4">Magnitude</td>
            <td class="pl-2 pt-4">: {{ datagempa.Magnitude || '-' }}</td>
          </tr>
          <tr>
            <td class="pt-4">Koordinat</td>
            <td class="pl-2 pt-4">: {{ datagempa.Coordinates && datagempa.Coordinates.split(',').join(', ') || '-' }}</td>
          </tr>
          <tr>
            <td class="pt-4">Waktu</td>
            <td class="pl-2 pt-4">: {{ datagempa.Tanggal }}, {{ datagempa.Jam || '-' }}</td>
          </tr>
        </table>
        <hr class="border-gray-800 my-6 " />
        <div class="w-full mx-3 py-4 font-semibold" :class="datagempa.Wilayah ? '' : 'mt-16'">
          <div class="mt-2.5">Gempa terasa di wilayah</div>
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
        .post(`${this.$baseUrlNdf}/cgms/weather/forward`, {
          url: 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json',
        })
        .then((res) => {
          this.datagempa = res.data.Infogempa.gempa
        })
    },
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