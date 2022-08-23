<template>
  <div>
    <div v-if="!refresh" class="flex justify-center space-x-4">
    <div>
        <img
          style="width: 450px"
          :src="
            'https://g20.circlegeo.com/images/data/g20/warning1.jpg'
          "
          @error="imageNotFound"
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
        // parent.spliceSlide(false)
      }
    },

    imageNotFound() {
      // this.shownotfound = true'
      var parent = this.$parent.$parent.$parent
      if (parent.production) {
           parent.spliceSlide('https://g20.circlegeo.com/images/data/g20/warning1.jpg')
      }
    },
  },
  mounted() {
    this.testImage('https://g20.circlegeo.com/images/data/g20/warning1.jpg')
    var self = this
    setInterval(() => {
      self.refresh = true
      self.testImage('https://g20.circlegeo.com/images/data/g20/warning1.jpg')
      setTimeout(() => {
        self.refresh = false
      }, 500);
    }, 60000)
  },
}
</script>