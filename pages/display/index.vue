<template>
  <div>
    <Navbar class="w-full" />
    <div class="flex w-full" style="height: calc(100vh - 65.5px)">
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
          <div>
            <div>
              <span>You are logged in as ,</span><b> {{ getUser().username }}</b>
            </div>
          </div>
          <div class="mb-6 flex space-x-3 absolute top-10 right-4">
            <div>
              <button @click="downloaddata"
                class="rounded-full bg-green-500 w-56 py-2 text-white font-semibold px-4 border border-green-600">Download
                Display List</button>
            </div>
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
          </div>
          <div class="mt-4">
            <DisplayList :templateDB="templateDB" @ordering="callAllData" />
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
var axios = require('axios')
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
      orderlatest: true
    }
  },
  mounted() {
    this.callAllData(this.orderlatest)
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
          this.callAllData(this.orderlatest)
        } else {
          this.searchData()
        }
      }, 500)
    },
  },
  middleware: ['checkLogin'],
  methods: {
    downloaddata() {
      axios({
        url: this.$axios.defaults.baseURL + 'display/export-excel?limit=10000000000000000',
        methods: 'GET',
        responseType: 'blob',
        headers: {
          'x-access-token': this.$cookies.get('users')
        }
      }).then(response => {
        // create file link in browser's memory
        const href = URL.createObjectURL(response.data);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'Display_exportdata.xlsx'); //or any other extension
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
    },
    getUser() {
      let token = this.$cookies.get("users")
      let decode = jwtdecode(token)
      return decode
    },
    searchData() {
      this.$axios
        .$get('display?row=10000000&keyword=' + this.searchname.toLowerCase())
        .then((res) => {
          this.templateDB = res.data
          this.total = parseInt(res.count / 10000000 + 1)
        })
    },
    callAllData(order) {
      this.orderlatest = order
      this.$axios.$get(`display?row=50&order=desc${order ? '&sortBy=id' : ''}&page=` + this.page).then((res) => {
        // parseInt res.count if decimal
        var count = parseInt((res.total / 50) + 1)
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
      this.$axios.$get(`display?row=50&order=desc${this.orderlatest ? '&sortBy=id' : ''}&page=` + e).then((res) => {
        this.total = parseInt((res.total / 50) + 1)
        this.templateDB = res.data
      })
    },
    editing(db) {
      this.$router.push({
        name: 'display-create',
        query: {
          id: db.username,
        },
      })
    },
    creating() {
      // if (this.templateDBSelected) {

      // } else {
      this.$router.push({
        name: 'display-create',
      })
      // }
    },
  },
}
</script>