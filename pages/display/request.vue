<template>
    <div>
      <Navbar class="w-full" />
      <div class="flex w-full relative" style="height: calc(100vh - 65.5px)">
        <Sidebar class="flex-none" />
        <client-only>
          <div class="
              flex-grow
              bg-gray-100
              w-full
              h-full
              px-4
              py-4
              overflow-auto
              relative
  
            ">
            <!-- <div class="mb-6 flex space-x-6 absolute top-4 right-4">
              <div class="relative">
                <input type="text" v-model="searchname" placeholder="Search by Display ID"
                  class="rounded-full w-56 py-2 px-4 border border-sky-400" />
                <div class="absolute right-4 top-3.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" class="text-sky-400">
                    <path fill="currentColor"
                      d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z" />
                  </svg>
                </div>
              </div>
            </div> -->
            <div class="mt-4">
              <DisplayList :templateDB="templateDB" />
            </div>
            <div class="text-right flex mt-4 justify-end w-full">
              <div class="flex-none">
                <paginate :page-count="total" v-if="searchname.length == 0" :click-handler="functionName"
                  :prev-text="'Prev'" :next-text="'Next'" :container-class="'flex space-x-4'">
                </paginate>
              </div>
              <div class="flex-grow">
                &nbsp;
                <!-- <button class="
                    bg-blue-200
                    border border-blue-400
                    shadow
                    px-6
                    py-2
                    text-blue-600
                    font-semibold
                    rounded
                    text-xs
                  " @click="creating">
                  {{ 'Create New' }}
                </button> -->
              </div>
            </div>
          </div>
        </client-only>
      </div>
    </div>
  </template>
  
  <style >
  ul li {
    text-align: center !important;
    padding: 5px !important;
    border-radius: 5px !important;
    width: auto !important;
    background: white;
  }
  
  ul li.active {
    background: #3b82f6 !important;
    color: white;
  }
  </style>
  
  <script>
  
  import jwtdecode from "jwt-decode"
  export default {
    data() {
      return {
        templateDB: [],
        layoutDB: {},
        categoryDB: {},
        selectedCategory: '',
        templateDBSelected: null,
        searchname: '',
        page: 1,
        total: 10,
        timeoutsearch: null,
      }
    },
    mounted() {
      this.callAllData()
    },
    watch: {
      searchname(val) {
        if (this.timeoutsearch) {
          clearTimeout(this.timeoutsearch)
        }
        this.timeoutsearch = setTimeout(() => {
          if (val.length == 0) {
            this.page = 1
            this.total = 10
            this.callAllData()
          } else {
            this.searchData()
          }
        }, 500)
      },
    },
    middleware: ['checkLogin'],
    methods: {
      getUser() {
        let token = this.$cookies.get("users")
        let decode = jwtdecode(token)
        return decode
      },
      searchData() {
        this.$axios
          .$get('display_request?row=10000000&keyword=' + this.searchname.toLowerCase())
          .then((res) => {
            this.templateDB = res.data
            this.total = parseInt(res.total / 10000000 + 1)
          })
      },
      callAllData() {
        this.$axios.$get('display_request?row=50&order=desc&page=' + this.page).then((res) => {
          // parseInt res.count if decimal
          var count = parseInt(res.total / 50 + 1)
          this.total = count
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
      functionName(e) {
        this.$axios.$get('display_request?row=50&page=' + e).then((res) => {
          this.total = parseInt(res.total / 50 + 1)
          this.templateDB = res.data
        })
      },
      editing(db) {
        this.$router.push({
          name: 'display-createrequest',
          query: {
            id: db._id,
          },
        })
      },
      creating() {
        // if (this.templateDBSelected) {
  
        // } else {
        this.$router.push({
          name: 'display-createrequest',
        })
        // }
      },
    },
  }
  </script>