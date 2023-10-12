<template>
  <div>
    <div class="flex space-x-4 mb-4 items-center">
      <div class="text-xl font-bold text-sky-500">List Display </div>
      <div>
        <div
          class="relative space-x-1.5 text-xs cursor-pointer flex justify-center items-center w-44 text-center py-1 text-white rounded-md bg-sky-500"
          @click="rotasi">
          <div>
            {{ orderlatest ? 'Sorted by New Data' : 'Sorted by Latest Data' }}
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" :class="!orderlatest ? 'rotate-180' : ''" width="11" height="11"
              viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 17l-6-8h12l-6 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div style="height: calc(100vh - 240px)" class="overflow-auto w-full">
      <table class="bg-white w-full font-bold rounded shadow-md">
        <tr>
          <td>
            <div>
              Display Name
            </div>
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
        <tr v-for="(db, i) in $route.name == 'display-request' ? filterAdmin.sort((a, b) => b.request_status.localeCompare(a.request_status)) : filterAdmin" :key="i" class="
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
            <div v-if="!db.request_status" @click="copytext(db.username)"
              class="flex items-center underline text-blue-500 cursor-pointer">
              <div>{{ db.username }}</div>
            </div>
            <div v-else> {{ db.username }}</div>
          </td>
          <td>
            {{ db.owner && db.owner.username || '-' }}
          </td>
          <td>
            <div class="flex items-center">
              <div class="font-semibold">
                <div v-if="db.request_status"
                  :class="db.request_status == 'APPROVED' ? 'text-green-500' : db.request_status == 'PENDING' ? 'text-yellow-500' : 'text-red-500'">
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
  data() {
    return {
      orderlatest: true
    }
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
    rotasi() {
      this.orderlatest = !this.orderlatest
      this.$emit('ordering', this.orderlatest)
    },
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
          if (db.request_status) {
            this.$axios.$delete('display_request/delete/' + db._id).then((res) => {
              this.$parent.templateDBSelected = null
              this.$parent.callAllData(this.$parent.orderlatest)
            })
          } else {
            this.$axios.$delete('display/delete/' + db._id).then((res) => {
              this.$parent.templateDBSelected = null
              this.$parent.callAllData(this.$parent.orderlatest)
            })
          }
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