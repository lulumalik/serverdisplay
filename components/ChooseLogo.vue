<template>
  <div>
    <div class="
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
      " style="z-index: 100000000000000">
      <div class="bg-white pt-8 px-20 pb-20 rounded overflow-auto relative" style="width: 80%;height:800px;">
        <button @click="$parent.chooseLogo = false" class="text-red-500  text-4xl absolute right-4 top-4">&times;</button>
        <div class="text-center">
          <input v-model="search" placeholder="Search Logo By Name"
            class="py-2 px-4 w-72 rounded-full border border-gray-800" />
        </div>
        <div class="mt-4 grid grid-cols-8 gap-4 items-center space-x-6">
          <!-- <DisplayList :templateDB="templateDB" /> -->
          <div v-for="(img, i) in filterTemplateDB" :key="i" class="relative cursor-pointer" @click="postImage(img)">
            <div class="h-40 flex items-center">
              <img class="w-24 mx-auto max-h-32 cursor-pointer" :src="$axios.defaults.baseURL + img.url.split('/api/')[1]"
                alt="img" />
            </div>

            <div class="text-xs text-center font-bold">
              {{ img.filename.split('-')[1] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['emitonly'],
  data() {
    return {
      templateDB: [],
      search: '',
      timeoutsearch: null
    }
  },
  mounted() {
    this.callAllData()
  },
  computed: {
    filterTemplateDB() {
      return this.templateDB.filter((db) => {
        return db.filename.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  watch: {
    // search(val) {
    //   if (this.timeoutsearch) {
    //     clearTimeout(this.timeoutsearch)
    //   }
    //   this.timeoutsearch = setTimeout(() => {
    //     this.searchData()
    //   }, 500)
    // }
  },
  methods: {
    searchData() {
      this.$axios
        .$get('display?row=10000&keyword=' + this.searchname)
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
      if (this.emitonly) {
        this.$emit('url', img.url)
      } else {
        var index = this.$parent.$refs['header'].indexdata

        this.$parent.$parent.$parent.templateAddedList.forEach(el => {
          if (!this.$parent.$parent.logos[el.idtemplate]) {
            this.$parent.$parent.logos[el.idtemplate] = []
            this.$parent.$parent.logos[el.idtemplate][index] = img
          } else {

            this.$parent.$parent.logos[el.idtemplate][index] = img
          }
        })


        this.$parent.useHeader = false
        setTimeout(() => {
          this.$parent.useHeader = true
          this.$parent.chooseLogo = false
        }, 500)
      }
    },
  },
}
</script>