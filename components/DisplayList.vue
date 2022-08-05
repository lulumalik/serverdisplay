<template>
  <div style="height: calc(100vh - 300px)">
    <div class="text-xl mb-4 font-bold text-sky-500">Display</div>
    <div class="flex items-center flex-wrap">
      <div
        v-for="(db, i) in filterByCategory"
        :key="i"
        class="
          rounded
          px-4
          w-56
          h-24
          flex
          items-center
          justify-center
          shadow
          cursor-pointer
          relative
          m-3
        "
        :class="
          $parent.templateDBSelected == db._id
            ? 'border-4 border-sky-500 bg-white font-semibold'
            : 'bg-white'
        "
        @click="clickTemplate(db)"
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
          v-if="$parent.templateDBSelected == db._id"
          @click="deleteTemplate(db)"
          src="/trash.svg"
          alt="trash"
          class="absolute bottom-2 w-6 z-30 right-2"
        />
      </div>
      <div
        v-if="filterByCategory.length == 0"
        class="text-center text-xs w-full p-12"
      >
        no displays founds.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    templateDB: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    clickTemplate(db) {
      if (db._id == this.$parent.templateDBSelected) {
        this.$parent.templateDBSelected = null
      } else {
        this.$parent.templateDBSelected = db._id
      }
    },
    deleteTemplate(db) {
      this.$confirm('Are you sure?, this template cannot be returned').then((res) => {
        this.$axios.$delete('display/delete/' + db._id).then((res) => {
          this.$parent.templateDBSelected = null
          this.$parent.callAllData()
        })
      })
    },
  },
  computed: {
    filterByCategory() {
      return this.templateDB.filter((db) => {
        return this.$parent.searchname
              .toLowerCase()
              .split(' ')
              .every((v) => db.name.toLowerCase().includes(v))
          
        // return db.category.name == this.$parent.selectedCategory
      })
    },
  },
}
</script>