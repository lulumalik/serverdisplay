<template>
  <div>
    <div v-if="shownotfound">
      <div class="text-3xl font-bold">
        Image not found
      </div>
    </div>
    <div v-else class="flex space-x-4">
      <div>
        <img
          :src="
            'https://warningcuaca.bmkg.go.id/infografis/CBB/' +
            year +
            '/' +
            getZero(month) +
            '/' +
            getZero(day) +
            '/infografis.jpg'
          "
        />
      </div>
      <div>
        <img
          :src="
            'https://warningcuaca.bmkg.go.id/infografis/CBB/' +
            year +
            '/' +
            getZero(month) +
            '/' +
            getZero(day) +
            '/infografis_text.jpg'
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      shownotfound: false,
    }
  },
  methods: {
    getZero(numb) {
      return parseInt(numb) < 10 ? '0' + numb : numb
    },
    testImage(URL) {
      var tester = new Image()
      tester.onload = this.imageFound
      tester.onerror = this.imageNotFound
      tester.src = URL
    },
    imageFound() {
      this.shownotfound = false
    },

    imageNotFound() {
      this.shownotfound = true
    },
  },
  mounted() {
    this.testImage(
      'https://warningcuaca.bmkg.go.id/infografis/CBB/' +
        this.year +
        '/' +
        this.getZero(this.month) +
        '/' +
        this.getZero(this.day) +
        '/infografis.jpg'
    )
    this.testImage(
      'https://warningcuaca.bmkg.go.id/infografis/CBB/' +
        this.year +
        '/' +
        this.getZero(this.month) +
        '/' +
        this.getZero(this.day) +
        '/infografis_text.jpg'
    )
  },
}
</script>