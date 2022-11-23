<template>
  <div>
    <div v-if="shownotfound">
      <div class="text-3xl font-bold text-center">
        Image not found
        <!-- <img src="/notfound.svg" class="mx-auto" alt="notfound"/> -->
      </div>
    </div>
    <div v-else class="flex justify-center space-x-4">
      <div>
        <img style="width: 450px" :src="
          'https://warningcuaca.bmkg.go.id/infografis/'+ area + '/' +
          year +
          '/' +
          getZero(month) +
          '/' +
          getZero(day) +
          '/infografis.jpg'
        " />
      </div>
      <div>
        <img style="width: 450px" :src="
          'https://warningcuaca.bmkg.go.id/infografis/'+ area + '/' +
          year +
          '/' +
          getZero(month) +
          '/' +
          getZero(day) +
          '/infografis_text.jpg'
        " />
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
      area: 'CJK',
      idTemplate:null
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
      var parent = this.$parent.$parent.$parent
      if (parent.production) {
        // parent.errorImage['MaritimWarning'] =false
        // parent.spliceSlide()
      }
    },

    imageNotFound(e) {
      var parent = this.$parent.$parent.$parent
      if (parent.production) {
        // parent.errorImage['MaritimWarning'] =false
        parent.spliceSlide('https://warningcuaca.bmkg.go.id/infografis/CBB/' +
          this.year +
          '/' +
          this.getZero(this.month) +
          '/' +
          this.getZero(this.day) +
          '/infografis.jpg')
      }
    },
  },
  mounted() {
    var parentDisplay = this.$parent.$parent.$parent
      this.idTemplate = parentDisplay.obj && parentDisplay.obj.idtemplate

    if (
      this.$store.state.displayWidget.widgetSaved[
      this.idTemplate + '_WidgetWarningWeather_area'
      ]
    ) {
      this.area = this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWarningWeather_area'
      ].area
    }
    this.testImage(
      'https://warningcuaca.bmkg.go.id/infografis/'+ this.area + '/' +
      this.year +
      '/' +
      this.getZero(this.month) +
      '/' +
      this.getZero(this.day) +
      '/infografis.jpg'
    )

    setInterval(() => {
      this.testImage(
        'https://warningcuaca.bmkg.go.id/infografis/'+ this.area + '/' +
        this.year +
        '/' +
        this.getZero(this.month) +
        '/' +
        this.getZero(this.day) +
        '/infografis.jpg'
      )
    }, 60000)
  },
}
</script>