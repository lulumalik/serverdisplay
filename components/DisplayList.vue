<template>
  <div>
    <div class="text-xl mb-4 font-bold text-sky-500">List Display</div>
    <!-- <div style="height: calc(100vh - 240px)" class="overflow-auto"
      v-if="currentUser.role && currentUser.role.name != 'Admin'">
      <div class="flex items-center flex-wrap pb-4">
        <div v-for="(db, i) in filterUser" :key="i" class="
          rounded
          px-4
          w-auto
          h-32
          flex
          items-center
          justify-center
          shadow-md
          cursor-pointer
          relative
          m-3
          px-12
        " :class="$parent.templateDBSelected == db._id
          ? 'border-4 border-sky-500 bg-white font-semibold'
          : 'bg-white'
          " @click="clickTemplate(db)">
          <img v-if="db.preview" :src="$axios.defaults.baseURL + db.preview.split('/api/')[1]"
            class="absolute w-full h-full z-10" />
          <div class="text-center">
            <div v-if="currentUser.role && currentUser.role.name == 'Admin' ? true : db.owner._id == currentUser.id"
              class="h-6 w-6 p-1 shadow-md rounded-br-md bg-green-500 absolute left-0 top-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                <path fill="white"
                  d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" />
              </svg>
            </div>
            <div class="h-3 w-3 shadow-lg rounded-full absolute right-4 top-4"
              :style="{ background: db.status ? '#00ff00' : '#ff0000' }">
            </div>
            <p class="uppercase text-xl z-20">
              {{ db.username }}
            </p>
            <small class="truncate relative">
              {{ db.name }}
            </small>
          </div>
          <div class="absolute bottom-3 left-3 cursor-pointer" @click="copytext(db.username)">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="text-sky-400">
              <path fill="currentColor"
                d="M21 2h-19v19h-2v-21h21v2zm3 2v20h-20v-20h20zm-2 2h-1.93c-.669 0-1.293.334-1.664.891l-1.406 2.109h-6l-1.406-2.109c-.371-.557-.995-.891-1.664-.891h-1.93v16h16v-16zm-3 6h-10v1h10v-1zm0 3h-10v1h10v-1zm0 3h-10v1h10v-1z" />
            </svg>
          </div>
          <div @click="$parent.editing()" v-if="$parent.templateDBSelected == db._id"
            class="bg-blue-500 w-5 h-5 absolute bottom-2.5 left-12 z-30 cursor-pointer rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
              <path fill="#fff"
                d="M1.438 16.872l-1.438 7.128 7.127-1.438 12.642-12.64-5.69-5.69-12.641 12.64zm2.271 2.253l-.85-.849 11.141-11.125.849.849-11.14 11.125zm20.291-13.436l-2.817 2.819-5.69-5.691 2.816-2.817 5.691 5.689z" />
            </svg>
          </div>
          <img v-if="$parent.templateDBSelected == db._id" @click="deleteTemplate(db)" src="/trash.svg" alt="trash"
            class="absolute bottom-2 w-6 z-30 right-2" />
        </div>
        <div v-if="filterNotUser.length == 0 && filterUser.length == 0" class="text-center text-xs w-full p-12">
          no displays founds.
        </div>
      </div>
      <div class="flex border-t-2 border-gray-300 items-center pt-4 flex-wrap">
        <div v-for="(db, i) in filterNotUser" :key="i" class="
          rounded
          px-4
          w-auto
          h-32
          flex
          items-center
          justify-center
          shadow-md
          cursor-pointer
          relative
          m-3
          px-12
        " :class="$parent.templateDBSelected == db._id
          ? 'border-4 border-sky-500 bg-white font-semibold'
          : 'bg-white'
          " @click="clickTemplate(db)">
          <img v-if="db.preview" :src="$axios.defaults.baseURL + db.preview.split('/api/')[1]"
            class="absolute w-full h-full z-10" />
          <div class="text-center">
            <div v-if="currentUser.role && currentUser.role.name == 'Admin' ? true : db.owner._id == currentUser.id"
              class="h-6 w-6 p-1 shadow-md rounded-br-md bg-green-500 absolute left-0 top-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                <path fill="white"
                  d="M19 7.001c0 3.865-3.134 7-7 7s-7-3.135-7-7c0-3.867 3.134-7.001 7-7.001s7 3.134 7 7.001zm-1.598 7.18c-1.506 1.137-3.374 1.82-5.402 1.82-2.03 0-3.899-.685-5.407-1.822-4.072 1.793-6.593 7.376-6.593 9.821h24c0-2.423-2.6-8.006-6.598-9.819z" />
              </svg>
            </div>
            <div class="h-3 w-3 shadow-lg rounded-full absolute right-4 top-4"
              :style="{ background: db.status ? '#00ff00' : '#ff0000' }">
            </div>
            <p class="uppercase text-xl z-20">
              {{ db.username }}
            </p>
            <small class="truncate relative">
              {{ db.name }}
            </small>
          </div>
          <div class="absolute bottom-3 left-3 cursor-pointer" @click="copytext(db.username)">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="text-sky-400">
              <path fill="currentColor"
                d="M21 2h-19v19h-2v-21h21v2zm3 2v20h-20v-20h20zm-2 2h-1.93c-.669 0-1.293.334-1.664.891l-1.406 2.109h-6l-1.406-2.109c-.371-.557-.995-.891-1.664-.891h-1.93v16h16v-16zm-3 6h-10v1h10v-1zm0 3h-10v1h10v-1zm0 3h-10v1h10v-1z" />
            </svg>
          </div>
          <div @click="$parent.editing()" v-if="$parent.templateDBSelected == db._id"
            class="bg-blue-500 w-5 h-5 absolute bottom-2.5 left-12 z-30 cursor-pointer rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
              <path fill="#fff"
                d="M1.438 16.872l-1.438 7.128 7.127-1.438 12.642-12.64-5.69-5.69-12.641 12.64zm2.271 2.253l-.85-.849 11.141-11.125.849.849-11.14 11.125zm20.291-13.436l-2.817 2.819-5.69-5.691 2.816-2.817 5.691 5.689z" />
            </svg>
          </div>
          <img v-if="$parent.templateDBSelected == db._id" @click="deleteTemplate(db)" src="/trash.svg" alt="trash"
            class="absolute bottom-2 w-6 z-30 right-2" />
        </div>
      </div>
    </div> -->
    <div style="height: calc(100vh - 240px)" class="overflow-auto w-full">
      <table class="bg-white w-full font-bold rounded shadow-md">
        <tr>
          <td>
            Display Name
          </td>
          <td>
            Display ID
          </td>
          <td>
            Owner
          </td>
          <td>
            Status
          </td>
          <td>
            Actions
          </td>
        </tr>
        <tr v-for="(db, i) in filterAdmin" :key="i" class="
          rounded
          w-auto
          font-normal
          cursor-pointer
          relative
          hover:bg-gray-200
          border-b border-gray-200
        " @click="clickTemplate(db)">
          <td>
            <div>{{ db.name }}</div>
          </td>
          <td>
            <div @click="copytext(db.username)" class="flex items-center underline text-blue-500 cursor-pointer">
              <div>{{ db.username }}</div>
            </div>
          </td>
          <td>
            {{ db.owner && db.owner.username || '-' }}
          </td>
          <td>
            <div class="flex items-center">
              <div class="font-semibold">
                <div v-if="db.request_status" :class="db.request_status == 'APPROVED' ? 'text-green-500' : db.request_status == 'PENDING' ? 'text-yellow-500' : 'text-red-500'">
                  {{ db.request_status }}
                </div>
                <div v-else :class="db.status ? 'text-green-500' : 'text-red-500'">
                  {{ db.status ? 'Active' : 'Disabled' }}
                </div>
              </div>
            </div>
          </td>
          <td>
            <!-- <img v-if="db.preview" :src="$axios.defaults.baseURL + db.preview.split('/api/')[1]"
              class=" w-full h-full" />
            <div class="absolute bottom-3 left-3 cursor-pointer" @click="copytext(db.username)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="text-sky-400">
                <path fill="currentColor"
                  d="M21 2h-19v19h-2v-21h21v2zm3 2v20h-20v-20h20zm-2 2h-1.93c-.669 0-1.293.334-1.664.891l-1.406 2.109h-6l-1.406-2.109c-.371-.557-.995-.891-1.664-.891h-1.93v16h16v-16zm-3 6h-10v1h10v-1zm0 3h-10v1h10v-1zm0 3h-10v1h10v-1z" />
              </svg>
            </div> -->
            <div class="items-center flex space-x-3">
              <div @click="$parent.editing(db)"
                class="bg-blue-500 w-5 h-5 shadow-xl cursor-pointer rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                  <path fill="#fff"
                    d="M1.438 16.872l-1.438 7.128 7.127-1.438 12.642-12.64-5.69-5.69-12.641 12.64zm2.271 2.253l-.85-.849 11.141-11.125.849.849-11.14 11.125zm20.291-13.436l-2.817 2.819-5.69-5.691 2.816-2.817 5.691 5.689z" />
                </svg>
              </div>
              <div>
                <img @click="deleteTemplate(db)" src="/trash.svg" alt="trash" class="w-6" />
              </div>
            </div>
          </td>

        </tr>
      </table>

      <div v-if="filterAdmin.length == 0" class="text-center text-xs w-full p-12">
        no displays founds.
      </div>
    </div>
  </div>
</template>

<style scoped>
td {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 12px;
  padding-bottom: 12px;
}

table {
  border-radius: 15px !important;
}
</style>

<script>
import { io } from 'socket.io-client'
import jwtDecode from 'jwt-decode'
export default {
  props: {
    templateDB: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    process.nextTick(() => {
      // console.log(this.$axios.defaults.baseURL.split('api')[0])
      // const socket = io(this.$axios.defaults.baseURL.split('api')[0], {
      //   reconnectionDelayMax: 10000,
      //   withCredentials: true,
      //   extraHeaders: {
      //     "my-custom-header": "abcd"
      //   },
      //   transports: [ 'polling', 'flashsocket'],
      // })
      // socket.connect()
      // socket.on('auth_request', (data) => {
      //   console.log(data, ' auth  request')
      // })
      // setTimeout(() => {
      //   socket.emit('auth', {
      //     display_id: 'ea',
      //   })
      // }, 1000)
    })
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
      // $axios.defaults.baseURL + db.preview.split('/api/')[1]
      var url = this.$axios.defaults.baseURL.split('/api/')[0] + '/g/' + text
      navigator.clipboard.writeText(url).then(
        function () {
          // console.log('Async: Copying to clipboard was successful!')
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
    currentUser() {
      return this.$cookies.get('users') ? jwtDecode(this.$cookies.get('users')) : {}
    },
    filterUser() {
      // filter by userid
      return this.templateDB.filter((db) => {
        // console.log(db.owner , this.currentUser)
        return db.owner && db.owner._id == this.currentUser.id
      })
    },
    filterNotUser() {
      return this.templateDB.filter((db) => {
        return db.owner && db.owner._id != this.currentUser.id
      })
    },
    filterAdmin() {
      return this.templateDB
    }
  },
}
</script>