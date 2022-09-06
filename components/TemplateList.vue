<template>
  <div style="height: calc(100vh - 300px)">
    <div class="text-xl mb-4 font-bold text-sky-500">Template</div>
    <div class="flex items-center flex-wrap">
      <div
        v-for="(db, i) in filterByCategory"
        :key="i"
        class="
          rounded
          px-4
          w-56
          h-32
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
        <div 
          @click="$parent.editing()"
          v-if="$parent.templateDBSelected == db._id" class="bg-blue-500 w-5 h-5 absolute bottom-2.5 left-2 z-30 cursor-pointer rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="M1.438 16.872l-1.438 7.128 7.127-1.438 12.642-12.64-5.69-5.69-12.641 12.64zm2.271 2.253l-.85-.849 11.141-11.125.849.849-11.14 11.125zm20.291-13.436l-2.817 2.819-5.69-5.691 2.816-2.817 5.691 5.689z"
            />
          </svg>
        </div>
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
        no template founds.
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
        this.$axios.$delete('template/delete/' + db._id).then((res) => {
          this.$parent.templateDBSelected = null
          this.$parent.callAllData()
        })
      })
    },
  },
  computed: {
    filterByCategory() {
      return this.templateDB.filter((db) => {
        return this.$parent.searchname.length > 0
          ? this.$parent.searchname
              .toLowerCase()
              .split(' ')
              .every((v) => db.name.toLowerCase().includes(v))
          : this.$parent.selectedCategory
              .toLowerCase()
              .split(' ')
              .every((v) => db.category.name.toLowerCase().includes(v))
        // return db.category.name == this.$parent.selectedCategory
      })
    },
  },
}
</script>