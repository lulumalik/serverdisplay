<template>
  <div class="text-lg">
    <div class="bg-sky-500 text-white p-4 text-center">
      <div>Earthquake Information {{datagempa.Tanggal}}</div>
      <div></div>
    </div>
    <div class="flex">
      <div
        style="min-width: 240px"
        class="bg-white flex flex-grow items-center justify-center"
        v-if="datagempa.Shakemap"
      >
        <img :src="'https://ews.bmkg.go.id/tews/data/' + datagempa.Shakemap" class="w-64" alt="gempa">
      </div>
      <div class="uppercase flex-grow bg-white p-6">
        <table>
          <tr>
            <td class="text-sky-400">Location</td>
            <td class="pl-2 pt-1">: {{datagempa.Lintang}} , {{datagempa.Bujur}}</td>
          </tr>
          <tr>
            <td class="text-sky-400">Depth</td>
            <td class="pl-2 pt-1">: {{datagempa.Kedalaman}}</td>
          </tr>
          <tr>
            <td class="text-sky-400">Magnitude</td>
            <td class="pl-2 pt-1">: {{datagempa.Magnitude}}</td>
          </tr>
        </table>
        <hr class="border-gray-200 my-4" />
        <div class="w-full">
          <p>{{datagempa.Wilayah}}</p>

          <p class="mt-2.5">
            {{datagempa.Potensi}}
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
      datagempa: {}
    }
  },
  mounted() {
    if (this.$parent.$parent && this.$parent.$parent.$parent) {
      var parent = this.$parent.$parent.$parent
      if (parent.currentId) {
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
      }
    }
  },
}
</script>