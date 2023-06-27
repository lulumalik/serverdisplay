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
        <img style="width: 450px" class="rounded-lg" :src="warningURL" />
      </div>
      <div>
        <img style="width: 450px" class="rounded-lg" :src="warningURLText" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shownotfound: false,
      area: 'CJK',
      idTemplate: null,
      warningURL: 'https://nowcasting.bmkg.go.id/infografis/' + this.area + '/' +
        new Date().getFullYear() +
        '/' +
        this.getZero(this.month) +
        '/' +
        this.getZero(new Date().getDate()) +
        '/infografis.jpg',
      warningURLText: 'https://nowcasting.bmkg.go.id/infografis/' + this.area + '/' +
        new Date().getFullYear() +
        '/' +
        this.getZero(this.month) +
        '/' +
        this.getZero(new Date().getDate()) +
        '/infografis.jpg'
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
      var id = parent.obj && parent.obj.idtemplate
      // if (parent.production) {
      //   // parent.errorImage['MaritimWarning'] = false
      //   parent.spliceSlide(id)
      // }
    },

    imageNotFound(e) {
      var parent = this.$parent.$parent.$parent
      if (parent.production) {
        // console.log('ea')
        // parent.errorImage['MaritimWarning'] = false
        parent.spliceSlide('https://nowcasting.bmkg.go.id/infografis/' + this.area + '/' +
          new Date().getFullYear() +
          '/' +
          this.getZero(new Date().getMonth() + 1) +
          '/' +
          this.getZero(new Date().getDate()) +
          '/infografis.jpg'
        )
      }
      // var yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      // this.warningURL = 'https://nowcasting.bmkg.go.id/infografis/' + this.area + '/' +
      //   new Date().getFullYear() +
      //   '/' +
      //   this.getZero(yesterday.getMonth() + 1) +
      //   '/' +
      //   this.getZero(yesterday.getDate()) +
      //   '/infografis.jpg'

      // this.warningURLText = 'https://nowcasting.bmkg.go.id/infografis/' + this.area + '/' +
      //   new Date().getFullYear() +
      //   '/' +
      //   this.getZero(yesterday.getMonth() + 1) +
      //   '/' +
      //   this.getZero(yesterday.getDate()) +
      //   '/infografis_text.jpg'
      // }
    },
  },
  mounted() {
    var parentDisplay = this.$parent.$parent.$parent
    this.idTemplate = parentDisplay.obj && parentDisplay.obj.idtemplate

    if (parentDisplay.production) {
      if (
        parentDisplay.responseDisplay.properties.allSetting[this.idTemplate]
      ) {
        if (parentDisplay.responseDisplay.properties.allSetting[this.idTemplate][1] && parentDisplay.responseDisplay.properties.allSetting[this.idTemplate][1].value.id) {
         
          this.area = parentDisplay.responseDisplay.properties.allSetting[this.idTemplate][1].value.id
        } else if (parentDisplay.responseDisplay.properties.allSetting[this.idTemplate][0] && parentDisplay.responseDisplay.properties.allSetting[this.idTemplate][0].value.area) {

          this.area = parentDisplay.responseDisplay.properties.allSetting[this.idTemplate][0].value.area
        } else if (parentDisplay.responseDisplay.properties.allSetting[this.idTemplate][0] && parentDisplay.responseDisplay.properties.allSetting[this.idTemplate][0].value.id) {

          this.area = parentDisplay.responseDisplay.properties.allSetting[this.idTemplate][0].value.area
        }
      }
    } else {
      if (
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWarningWeather_area'
        ]
      ) {
        this.area = this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWarningWeather_area'
        ].id
      }
    }
    this.warningURL = 'https://nowcasting.bmkg.go.id/infografis/' + this.area + '/' +
      new Date().getFullYear() +
      '/' +
      this.getZero(new Date().getMonth() + 1) +
      '/' +
      this.getZero(new Date().getDate()) +
      '/infografis.jpg'

    this.warningURLText = 'https://nowcasting.bmkg.go.id/infografis/' + this.area + '/' +
      new Date().getFullYear() +
      '/' +
      this.getZero(new Date().getMonth() + 1) +
      '/' +
      this.getZero(new Date().getDate()) +
      '/infografis_text.jpg'

    console.log(this.warningURL)
    this.testImage(this.warningURL)

    setInterval(() => {

      this.warningURL = 'https://nowcasting.bmkg.go.id/infografis/' + this.area + '/' +
        new Date().getFullYear() +
        '/' +
        this.getZero(new Date().getMonth() + 1) +
        '/' +
        this.getZero(new Date().getDate()) +
        '/infografis.jpg'

      this.warningURLText = 'https://nowcasting.bmkg.go.id/infografis/' + this.area + '/' +
        new Date().getFullYear() +
        '/' +
        this.getZero(new Date().getMonth() + 1) +
        '/' +
        this.getZero(new Date().getDate()) +
        '/infografis_text.jpg'

      this.testImage(this.warningURL)
    }, 60000)
  },
}
</script>