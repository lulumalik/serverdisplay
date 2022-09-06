<template>
  <div>
    <div
      class="
        fixed
        top-0
        left-0
        h-full
        flex
        items-start
        p-24
        justify-center
        w-full
        bg-black/50
      "
      style="z-index: 100000000000000"
    >
      <div class="bg-white pt-8 px-20 pb-20 rounded" style="width: 80%">
        <div class="text-center">Choose logo</div>
        <div class="mt-4 flex flex-wrap items-center space-x-6">
          <!-- <DisplayList :templateDB="templateDB" /> -->
          <div
            v-for="(img, i) in templateDB"
            :key="i"
            class="relative cursor-pointer"
            @click="postImage(img)"
          >
            <img
              class="w-24 max-h-44 cursor-pointer"
              :src="$axios.defaults.baseURL + img.url.split('/api/')[1]"
              alt="img"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      templateDB: [],
    }
  },
  mounted() {
    this.callAllData()
  },
  methods: {
    searchData() {
      this.$axios
        .$get('display?row=1000&keyword=' + this.searchname)
        .then((res) => {
          this.templateDB = res.data
          this.total = res.count / 10 + 1
        })
    },
    callAllData() {
      this.$axios.$get('logo?row=100').then((res) => {
        this.templateDB = res.data
      })
    },
    postImage(img) {
      var index = this.$parent.$refs['header'].indexdata
      if (!this.$parent.$parent.logos[this.$parent.obj.idtemplate]) {
        this.$parent.$parent.logos[this.$parent.obj.idtemplate] = []
        this.$parent.$parent.logos[this.$parent.obj.idtemplate][index] = img
      } else {

      this.$parent.$parent.logos[this.$parent.obj.idtemplate][index] = img
      }
      this.$parent.useHeader = false
      setTimeout(() => {
        this.$parent.useHeader = true
        this.$parent.chooseLogo = false
      }, 500)
    },
  },
}
</script>