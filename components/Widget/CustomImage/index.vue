<template>
  <div class="text-center">
    <img :src="img" v-if="img" class="rounded-lg mx-auto" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      idTemplate: '',
      img: ''
    }
  },
  methods: {
    initImage() {
      var parentDisplay = this.$parent.$parent.$parent
      this.idTemplate = parentDisplay.obj && parentDisplay.obj.idtemplate

      if (parentDisplay.responseDisplay.properties && parentDisplay.responseDisplay.properties.allSetting[this.idTemplate]) {
        // production
        var im = parentDisplay.responseDisplay.properties.allSetting[this.idTemplate][0].value

        if (im.includes('/api/')) {
          this.img = this.$axios.defaults.baseURL.replace('/api/', '') + im
        } else {
          this.img = im
        }
      } else {
        // dev
        if (this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetCustomImage_img'
        ]) {
          if (this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetCustomImage_img'
          ].includes('/api/')) {
            this.img = this.$axios.defaults.baseURL.replace('/api/', '') + this.$store.state.displayWidget.widgetSaved[
              this.idTemplate + '_WidgetCustomImage_img'
            ]
          } else {
            this.img = this.$store.state.displayWidget.widgetSaved[
              this.idTemplate + '_WidgetCustomImage_img'
            ]
          }
        }
      }

    }
  },
  mounted() {
    this.initImage()

    setInterval(() => {
      this.img = null
      setTimeout(() => {
        this.initImage()
      }, 500)
    }, 60000)
  },
}
</script>