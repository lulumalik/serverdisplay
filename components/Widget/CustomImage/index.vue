<template>
  <div class="text-center">
    <img :src="img" class="rounded-lg mx-auto" />
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
      // var obj = parentDisplay.obj && parentDisplay.obj.idtemplate
      if (this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetCustomImage_img'
      ]) {
        this.img = this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetCustomImage_img'
        ]
      }
    }
  },
  mounted() {
    this.initImage()

    setInterval(() => {
      this.initImage()
    }, 60000)
  },
}
</script>