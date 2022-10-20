<template>
  <div class="pl-6 pr-3 py-4">
    <div class="text-sm w-44">Pick Template</div>
    <div style="height: calc(100vh - 250px)" class="overflow-auto">
      <div
        v-for="(db, i) in $parent.templateDB"
        :key="i"
        class="
          rounded
          px-4
          w-44
          h-32
          flex
          items-center
          justify-center
          shadow
          rounded
          cursor-pointer
          relative
          my-3
          bg-white
        "
      >
        <img
          v-if="db.preview"
          :src="$axios.defaults.baseURL + db.preview.split('/api/')[1]"
          class="absolute w-full h-full z-10"
        />
        <p class="line-clamp-2 bg-white rounded px-2 py-1 text-center relative z-20">
          {{ db.name }}
        </p>
        <img
          @click="pushToList(db, i)"
          src="/add.svg"
          alt="add"
          class="absolute bottom-2 w-6 z-30 right-2"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    makeid(length) {
      var result = ''
      var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        )
      }
      return result
    },
    pushToList(db, i) {
      // db.idtemplate = this.makeid(5)
      var obj = {}
      for(var key in db) {
        obj[key] = db[key]
      }
      obj.idtemplate = this.makeid(5)
      this.$parent.templateAddedList.push(obj)
    },
  },
}
</script>