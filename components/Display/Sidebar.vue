<template>
  <div class="pl-6 pr-3 py-4">
    <div class="text-sm w-32">Pick Template</div>
    <div style="height: calc(100vh - 250px)" class="overflow-auto">
      <div
        v-for="(db, i) in $parent.templateDB"
        :key="i"
        class="
          rounded
          px-4
          w-32
          h-24
          flex
          items-center
          justify-center
          shadow
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
        <p class="truncate relative z-20">
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
  data() {
    return {
      pushToList(db, i) {
        this.$parent.templateAddedList.push(db)
        this.$parent.templateDB.splice(i, 1)
      },
    }
  },
}
</script>