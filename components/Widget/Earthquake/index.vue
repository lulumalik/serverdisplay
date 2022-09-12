<template>
  <div>
    <div class="bg-sky-500 text-lg text-white p-4 text-center">
      <div>Earthquake Information {{ datagempa.Tanggal }}</div>
      <div></div>
    </div>
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
          style="max-width: 420px"
          :src="'https://ews.bmkg.go.id/tews/data/' + datagempa.Shakemap"
          alt="gempa"
        />
      </div>
      <div class="uppercase flex-grow text-xl bg-white/80 pl-2 pr-6 py-6">
        <table>
          <tr>
            <td class="text-sky-400">Lokasi</td>
            <td class="pl-2 pt-1">
              : {{ datagempa.Lintang || '-' }} , {{ datagempa.Bujur || '-' }}
            </td>
          </tr>
          <tr>
            <td class="text-sky-400">Kedalaman</td>
            <td class="pl-2 pt-1">: {{ datagempa.Kedalaman || '-' }}</td>
          </tr>
          <tr>
            <td class="text-sky-400">Magnitude</td>
            <td class="pl-2 pt-1">: {{ datagempa.Magnitude || '-' }}</td>
          </tr>
          <tr>
            <td class="text-sky-400">Koordinat</td>
            <td class="pl-2 pt-1">: {{ datagempa.Coordinates || '-' }}</td>
          </tr>
          <tr>
            <td class="text-sky-400">Jam</td>
            <td class="pl-2 pt-1">: {{ datagempa.Jam || '-' }}</td>
          </tr>
        </table>
        <hr class="border-gray-200 my-4" />
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
  mounted() {
    if (this.$parent.$parent && this.$parent.$parent.$parent) {
      var parent = this.$parent.$parent.$parent
      // if (parent.currentId) {
      this.$axios
        .post('https://sena.circlegeo.com/api/sena/research/forward', {
          url: 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json',
        })
        .then((res) => {
          this.datagempa = res.data.Infogempa.gempa
        })
      // const config = {
      //   headers: {
      //     Referer: 'https://data.bmkg.go.id/gempabumi/',
      //     'Referrer-Policy': 'strict-origin-when-cross-origin',
      //   },
      // }

      // this.$axios
      //   .$get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json', config)
      //   .then((res) => {
      //     console.log(res)
      //   })
      // }
    }
  },
}
</script>