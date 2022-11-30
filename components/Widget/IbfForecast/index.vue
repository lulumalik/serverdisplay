<template>
  <div>
    <!-- https://signature.bmkg.go.id/storage/output/public-impact/KEPULAUAN%20BANGKA%20BELITUNG/2022/09/15/48.png -->
    <img style="width: 650px" class="mx-auto" :src="url" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      location: 'KEPULAUAN%20BANGKA%20BELITUNG',
      url: ''
    }
  },
  methods: {
    getZero(numb) {
      return parseInt(numb) < 10 ? '0' + numb : numb
    },
    getData() {
      this.year = new Date().getFullYear()
      this.month = new Date().getMonth() + 1
      this.day = new Date().getDate()

      var parentDisplay = this.$parent.$parent.$parent
      this.idTemplate = parentDisplay.obj && parentDisplay.obj.idtemplate
      if (parentDisplay.production) {
        var setting = parentDisplay.responseDisplay.properties.allSetting
        var obj = parentDisplay.obj && parentDisplay.obj.idtemplate
        setting[obj].forEach((el) => {
          this.location = el.value.name
          this.testImage(
            'https://signature.bmkg.go.id/storage/output/public-impact/' +
            this.location +
            '/' +
            this.year +
            '/' +
            this.getZero(this.month) +
            '/' +
            this.getZero(this.day) +
            '/00.png'
          )
        })
      } else {
        if (this.$store.state.displayWidget.widgetSaved[this.idTemplate + '_WidgetIbfForecast']) {
          this.location = this.$store.state.displayWidget.widgetSaved[this.idTemplate + '_WidgetIbfForecast'].name
          this.testImage(
            'https://signature.bmkg.go.id/storage/output/public-impact/' +
            this.location +
            '/' +
            this.year +
            '/' +
            this.getZero(this.month) +
            '/' +
            this.getZero(this.day) +
            '/00.png'
          )
        }
      }
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
      this.year = new Date().getFullYear()
      this.month = new Date().getMonth() + 1
      this.day = new Date().getDate()


      var yesterday = new Date(new Date().setDate(new Date().getDate() - 1))

      var parent = this.$parent.$parent.$parent
      this.url = 'https://signature.bmkg.go.id/storage/output/public-impact/' +
        this.location +
        '/' +
        this.year +
        '/' +
        this.getZero(yesterday.getMonth() + 1) +
        '/' +
        this.getZero(yesterday.getDate()) +
        '/24.png'
    },
  },
  mounted() {
    this.getData()

    setInterval(() => {
      this.getData()
    }, 60000)
  },
}
</script>