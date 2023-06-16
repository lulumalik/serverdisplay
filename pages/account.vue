<template>
  <div>
    <div v-show="popup" class="
        fixed
        left-0
        right-0
        justify-center
        flex
        items-center
        bg-black/20
        w-full
        h-full
      " style="z-index: 1000000">
      <div class="bg-white relative p-12 rounded w-96" style="z-index: 10000">
        <div class="mb-4 text-xl flex">
          <div class="flex-grow">
            {{ popup == 'add' ? 'Add' : 'Edit' }} Account
          </div>
          <div class="flex-none text-red-500 cursor-pointer" @click="popup = false">
            &times;
          </div>
        </div>
        <form @submit.prevent="submitForm">
          <div>
            <div>Username</div>
            <input type="text" class="border border-gray-300 p-3 w-full rounded" v-model="formdata.username" />
          </div>
          <div class="mt-2">
            <div>E-mail</div>
            <input type="text" class="border border-gray-300 p-3 w-full rounded" v-model="formdata.email" />
          </div>
          <div class="mt-2">
            <div>Password</div>
            <input type="password" class="border border-gray-300 p-3 w-full rounded" v-model="formdata.password" />
          </div>
          <div class="mt-2">
            <div>Role</div>
            <select v-if="role" class="border border-gray-300 p-3 w-full rounded" v-model="formdata.role">
              <option v-for="(r, i) in role" :key="i" :value="r._id">
                {{ r.name }}
              </option>
            </select>
          </div>
          <div class="mt-2">
            <div>Limit</div>
            
            <input type="number" class="border border-gray-300 p-3 w-full rounded" v-model="formdata.number_of_display" />
          </div>
          <div>
            <input type="submit" class="bg-blue-500 text-white p-3 rounded mt-4 w-full" value="Submit" />
          </div>
        </form>
      </div>
    </div>
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
          <div class="mb-4">
            <button class="bg-sky-500 px-6 py-2 rounded-lg text-white font-semibold" @click="adduser">Add User</button>
          </div>
          <div style="height:calc(100vh - 210px)" class="overflow-auto">
            <table class="w-full bg-white rounded-b-lg shadow-lg">
              <tr>
                <td class="bg-sky-500 rounded-tl-lg text-white font-semibold">
                  Username
                </td>
                <td class="bg-sky-500 text-white font-semibold">Email</td>
                <td class="bg-sky-500 text-white font-semibold">Role</td>
                <td class="bg-sky-500 rounded-tr-lg text-white font-semibold">
                  Actions
                </td>
              </tr>
              <tr v-for="(data, i) in templateDB" :key="i">
                <td>
                  {{ data.username }}
                </td>
                <td>
                  {{ data.email }}
                </td>
                <td>
                  {{ data.role.name }}
                </td>
                <td>
                  <div class="flex space-x-4">
                    <div @click="editing(data)" class="
                      bg-blue-500
                      w-8
                      h-8
                      z-30
                      cursor-pointer
                      rounded-full
                      flex
                      shadow-md
                      items-center
                      justify-center
                    ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <path fill="#fff"
                          d="M1.438 16.872l-1.438 7.128 7.127-1.438 12.642-12.64-5.69-5.69-12.641 12.64zm2.271 2.253l-.85-.849 11.141-11.125.849.849-11.14 11.125zm20.291-13.436l-2.817 2.819-5.69-5.691 2.816-2.817 5.691 5.689z" />
                      </svg>
                    </div>
                    <img @click="deleteAccount(data)" src="/trash.svg" alt="trash" class="w-8 cursor-pointer z-30" />
                  </div>
                </td>
              </tr>
            </table>
          </div>

          <paginate class="mt-6" :page-count="total" :click-handler="callAllData" :prev-text="'Prev'" :next-text="'Next'"
            :container-class="'flex space-x-4'">
          </paginate>
        </div>
      </client-only>
    </div>
  </div>
</template>
  
<style>
td {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
}
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
      popup: false,
      idselected: null,
      formdata: {
        username: '',
        email: '',
        password: '',
        role: '',
        number_of_display: 10
      },
      timeoutsearch: null,
      role: null,
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
        this.searchData()
      }, 500)
    },
  },
  middleware: ['checkLogin'],
  methods: {
    adduser() {
      this.popup = 'add'
      this.formdata = {
        username: '',
        email: '',
        password: '',
        role: '',
      }
    },
    submitForm() {
      // user/create
      if (this.formdata.password.length < 6) {
        this.$toast.error('Password must be at least 6 characters')
        return
      }
      if (this.popup == 'add') {
        this.$axios
          .$post('user/create', this.formdata)
          .then((res) => {
            this.popup = false
            this.callAllData()
            this.$toast.open({
              message: 'Success',
              type: 'success',
              duration: 2000,
            })
          })
          .catch((err) => {
            console.log(err)
            this.$toast.open({
              message: 'Error',
              type: 'error',
              duration: 2000,
            })
          })
      } else {
        this.$axios
          .$put('user/update/' + this.idselected, this.formdata)
          .then((res) => {
            this.popup = false
            this.callAllData()
            this.$toast.open({
              message: 'Success',
              type: 'success',
              duration: 2000,
            })
          })
          .catch((err) => {
            console.log(err)
            this.$toast.open({
              message: 'Error',
              type: 'error',
              duration: 2000,
            })
          })
      }
    },
    editing(data) {
      this.popup = 'edit'
      this.idselected = data._id
      this.formdata = {
        username: data.username,
        email: data.email,
        password: '',
        role: data.role._id,
        number_of_display: data.number_of_display
      }
    },
    deleteAccount(db) {
      this.$confirm('Are you sure?, Account cannot be returned').then((res) => {
        this.$axios.$delete('user/delete/' + db._id).then((res) => {
          this.callAllData()
          this.$toast.open({
            message: 'Success',
            type: 'success',
            duration: 2000,
          })
        })
      })
    },
    callAllData(e) {
      if (e) {
        this.page = e
      }
      this.$axios.$get('user' + '?row=20&page=' + this.page).then((res) => {
        this.total = parseInt(res.count / 20 + 2)
        this.templateDB = res.data
      })
      this.$axios.$get('role').then((res) => {
        this.role = res.data
      })
    },
  },
}
</script>