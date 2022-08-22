<template>
  <div>
    <div v-if="!refresh" class="flex justify-center space-x-4">
    <div>
        <img
          style="width: 450px"
          :src="
            'https://g20.circlegeo.com/images/data/g20/warning1.jpg'
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
      refresh: false
    }
  },
  methods: {
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
        parent.spliceSlide(false)
      }
    },

    imageNotFound() {
      // this.shownotfound = true
      var parent = this.$parent.$parent.$parent
      if (parent.production) {
        // parent.errorImage['MaritimWarning'] =false
        parent.spliceSlide(true)
      }
    },
  },
  mounted() {
    this.testImage('https://g20.circlegeo.com/images/data/g20/warning1.jpg')
    setInterval(() => {
      this.refresh = true
      this.testImage('https://g20.circlegeo.com/images/data/g20/warning1.jpg')

      setTimeout(() => {
        this.refresh = false
      }, 500);
    }, 60000)
  },
}
</script>