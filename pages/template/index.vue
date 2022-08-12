<template>
  <div>
    <Navbar class="w-full" />
    <div class="flex w-full" style="height: calc(100vh - 65.5px)">
      <Sidebar class="flex-none" />
      <client-only>
        <div
          class="flex-grow bg-gray-100 w-full h-full px-4 py-4 overflow-auto"
        >
          <div class="mb-6 flex space-x-6 items-end">
            <Category class="flex-grow" />
            <div class="relative">
              <input
                type="text"
                v-model="searchname"
                placeholder="Search"
                class="rounded-full w-56 py-2 px-4 border border-sky-400"
              />
              <div class="absolute right-4 top-3.5"> 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  class="text-sky-400"
                >
                  <path
                    fill="currentColor"
                    d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <TemplateList :templateDB="templateDB" />
          </div>
          <div class="text-right">
            <button
              class="
                bg-blue-200
                border border-blue-400
                shadow
                px-6
                py-2
                text-blue-600
                font-semibold
                rounded
                text-xs
              "
              @click="creating"
            >
              {{ templateDBSelected ? 'Edit Template' : 'Create New' }}
            </button>
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {

  middleware: ['checkLogin'],
  data() {
    return {
      templateDB: [],
      layoutDB: {},
      categoryDB: {},
      selectedCategory: '',
      templateDBSelected: null,
      searchname: ''
    }
  },
  mounted() {
    this.callAllData()
  },
  methods: {
    callAllData() {
      this.$axios.$get('template').then((res) => {
      this.templateDB = res.data
    })
    this.$axios.$get('layout').then((res) => {
      // this.layoutDB = res.data
      res.data.forEach((data) => {
        this.$set(this.layoutDB, data.name, data._id)
      })
    })
    this.$axios.$get('category').then((res) => {
      // this.categoryDB = res.data
      res.data.forEach((data) => {
        this.$set(this.categoryDB, data.name, data._id)
      })
    })
    },
    creating() {
      if (this.templateDBSelected) {
        this.$router.push({
          name: 'template-create',
          query: {
            id: this.templateDB.find((db) => db._id == this.templateDBSelected)
              ._id,
          },
        })
      } else {
        this.$router.push({
          name: 'template-create',
        })
      }
    },
  },
}
</script>