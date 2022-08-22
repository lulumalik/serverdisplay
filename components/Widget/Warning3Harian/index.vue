<template>
  <div>
    <div v-if="!refresh" class="flex justify-center space-x-4">
    <div>
        <img
          style="width: 450px"
          :src="
            'https://g20.circlegeo.com/images/data/g20/warning2.jpg'
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
  mounted() {
    setInterval(() => {
      this.refresh = true
      setTimeout(() => {
        this.refresh = false
      }, 500);
    }, 60000)
  },
}
</script>