<template>
  <div style="height: calc(100vh - 150px)">
    <div class="text-xl mb-4 font-bold text-sky-500">Display</div>
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
          class="absolute bottom-3 left-3 cursor-pointer"
          @click="copytext(db.username)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            class="text-sky-400"
          >
            <path
              fill="currentColor"
              d="M21 2h-19v19h-2v-21h21v2zm3 2v20h-20v-20h20zm-2 2h-1.93c-.669 0-1.293.334-1.664.891l-1.406 2.109h-6l-1.406-2.109c-.371-.557-.995-.891-1.664-.891h-1.93v16h16v-16zm-3 6h-10v1h10v-1zm0 3h-10v1h10v-1zm0 3h-10v1h10v-1z"
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
    copytext(text) {
      var self = this
      navigator.clipboard.writeText(text).then(
        function () {
          console.log('Async: Copying to clipboard was successful!')
          self.$toast.open({
            message: 'ID has been copied',
            type: 'success',
            duration: 2000,
          })
        },
        function (err) {
          console.error('Async: Could not copy text: ', err)
        }
      )
    },
    deleteTemplate(db) {
      this.$confirm('Are you sure?, this Display cannot be returned').then(
        (res) => {
          this.$axios.$delete('display/delete/' + db._id).then((res) => {
            this.$parent.templateDBSelected = null
            this.$parent.callAllData()
          })
        }
      )
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