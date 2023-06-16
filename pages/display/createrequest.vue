<template>
  <div class="bg-gray-200 h-screen">
    <client-only>
      <Navbar class="w-full sticky top-0" style="z-index: 1000" />
      <button @click="backto" class="
                    text-xs
                    pl-6
                    relative top-3
                    cursor-pointer
                    flex
                    items-center
                    space-x-2
                    text-black
                    font-bold
                  ">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24"
          class="text-black relative bottom-0.5">
          <path fill="currentColor"
            d="M13.427 3.021h-7.427v-3.021l-6 5.39 6 5.61v-3h7.427c3.071 0 5.561 2.356 5.561 5.427 0 3.071-2.489 5.573-5.561 5.573h-7.427v5h7.427c5.84 0 10.573-4.734 10.573-10.573s-4.733-10.406-10.573-10.406z" />
        </svg>
        <div>Back</div>
      </button>
      <form class="text-sm px-6 pt-4 flex items-end space-x-4">
        <div class="flex-grow">
          <div class="flex items-center">
            <div class="flex-grow">Display ID</div>
          </div>
          <div class="mt-2 relative">
            <input v-model="displayID" placeholder="id" :class="getDisplayIDSpaces ? 'border-red-500' : ''"
              class="w-full rounded border border-gray-300 px-2 py-1.5" type="text" required />
            <div class="absolute -top-5 right-0">
              <small class="text-red-500" v-if="getDisplayIDSpaces">
                no spaces allowed
              </small>
            </div>
          </div>
        </div>
        <div class="flex-grow">
          <div>Display Name</div>
          <div class="mt-2">
            <input v-model="displayName" placeholder="name" class="w-full rounded border-gray-300 border px-2 py-1.5"
              type="text" required />
          </div>
        </div>
        <div class="flex-grow">
          <div>Display Location</div>
          <div class="mt-2">
            <input label="name" class="w-full rounded border-gray-300 border px-2 py-1.5" v-model="getDisplayLocation"
              type="text" />
          </div>
        </div>
        <div class="flex-grow">
          <div class="
                bg-blue-200
                border border-blue-400
                shadow
                px-6
                py-2
                text-blue-600
                font-semibold
                rounded
                text-xs text-center
                cursor-pointer
              " style="padding-top: 7px; padding-bottom: 7px" @click="updateAndCreateDisplay" :disabled="saving">
            {{ saving ? 'Saving Display...' : 'Save Display' }}
          </div>
        </div>
        <div class="flex-grow" v-if="roleUser && roleUser.role.name == 'Admin'">
          <div class="flex space-x-2">
            <button @click="updaterequest('approve')" class="py-1.5 w-24 text-white rounded bg-green-600 text-sm">
              APPROVE
            </button>
            <button @click="updaterequest('reject')" class="py-1.5 w-24 text-white rounded bg-red-600 text-sm">
              REJECT
            </button>
          </div>
        </div>
      </form>
    </client-only>

    <client-only>
      <div class="flex w-full">
        <DisplaySidebar class="flex-none" />
        <DisplayPreview ref="preview" class="flex-grow h-full overflow-auto" />
        <DisplayWidgetOption class="flex-none" />
      </div>
    </client-only>
  </div>
</template>
  
<script>
import jwtdecode from 'jwt-decode'
export default {
  data() {
    return {
      saving: false,
      templateDB: [],
      templateAddedList: [],
      selectedTemplateID: null,
      displayID: null,
      displayName: null,
      displayLocation: null,
      secretCode: false,
      getDisplayLocation: 'Kepulauan Bangka Belitung',
      allfind: {},
      useFooter: true,
      useVideo: null,
      backgroundStatic: null,
      currentUser: null,
      status: true,
      showSetting: false,
      roleUser: null
    }
  },
  middleware: ['checkLogin'],
  computed: {
    getDisplaySecretSpaces() {
      return /\s/g.test(this.secretCode)
    },
    getDisplayIDSpaces() {
      return /\s/g.test(this.displayID)
    },
    getWidgetSaved() {
      return this.$store.state.displayWidget.widgetSaved
    },
  },
  async mounted() {
    const res1 = await this.$axios.$get('template')
    if (this.$route.query.id) {
      try {
        this.showSetting = false
        this.roleUser = jwtdecode(this.$cookies.get('users'))
        this.currentUser = jwtdecode(this.$cookies.get('users')).id
        const res = await this.$axios.$get(
          'display_request/find/' + this.$route.query.id
        )
        this.allfind = res.data
        this.templateDB = res1.data
        // this.templateDB = this.getDifference(alltemplate, res.data.template)
        var arr = []
        for (var key in res.data.properties.allTemplate) {
          arr.push(res.data.properties.allTemplate[key])
        }
        this.templateAddedList = arr
        var listSetting = res.data.properties.allSetting
        this.displayID = res.data.username
        this.displayName = res.data.name
        // console.log(res.data)
        this.status = res.data.status
        this.useFooter = res.data.properties.footer
        this.getDisplayLocation = res.data.location.name
        this.useVideo = res.data.properties.video
        this.backgroundStatic = res.data.properties.backgroundStatic
        this.$refs['preview'].logos = res.data.properties.allLogo || {}
        this.$refs['preview'].times = res.data.properties.delay
        this.$refs['preview'].width = res.data.properties.width || 1366
        this.$refs['preview'].height = res.data.properties.height || 768
        this.templateAddedList.forEach((el) => {
          if (listSetting[el.idtemplate]) {
            listSetting[el.idtemplate].forEach((l) => {
              this.$store.commit('displayWidget/mutationWidget', {
                key: l.key,
                value: l.value,
              })
            })
          }
        })
        this.showSetting = true
      } catch (e) {
        console.log(e)
        // window.open('/display', '_self')
      }
    } else {
      this.templateDB = res1.data
    }
  },
  methods: {
    async updaterequest(val) {
      await this.$axios.$put(`display_request/${val}/${this.$route.query.id}`)
      this.$toast.open({
        message: 'Display ' + val,
        type: val == 'reject' ? 'danger' : 'success',
        duration: 2000,
      })
      setTimeout(() => {
        window.location.href = '/display/request'
      }, 1000)
    },
    backto() {
      window.history.back()
    },
    toGallery() {
      this.$router.push('/g/' + this.allfind.username)
    },
    getDifference(array1, array2) {
      return array1.filter((object1) => {
        return !array2.some((object2) => {
          return object1._id === object2._id
        })
      })
    },
    async updateData(obj) {
      try {

        obj.request_type = 'UPDATE'
        // this.$set(obj, 'ref', this.$route.query.id)
        // console.log(obj)
        const res = await this.$axios.$put(
          'display_request/update/' + this.$route.query.id,
          obj
        )
        this.saving = false
        this.$toast.open({
          message: 'Display saved',
          type: 'success',
          duration: 2000,
        })
        // window.reload()
        setTimeout(() => {
          window.location.href = '/display/request'
        }, 1000)
      } catch (error) {
        if (error.response.data.message.code == 11000) {
          this.saving = false
          this.$toast.open({
            message: 'Display id already taken',
            type: 'error',
            duration: 2000,
          })
        } else {
          this.saving = false
          this.$toast.open({
            message: 'Display not saved, try again',
            type: 'error',
            duration: 2000,
          })
        }
      }
    },
    async createData(obj) {
      try {
        obj.request_type = 'CREATE'
        const res = await this.$axios.$post(
          'display_request/create',
          obj
        )
        this.saving = false
        this.$toast.open({
          message: 'Display saved',
          type: 'success',
          duration: 2000,
        })
        setTimeout(() => {
          window.location.href = '/display/request'
        }, 1000)
      } catch (error) {
        if (error.response.data.message.code == 11000) {
          this.saving = false
          this.$toast.open({
            message: 'Display id already taken',
            type: 'error',
            duration: 2000,
          })
        } else {
          this.saving = false
          this.$toast.open({
            message: 'Display not saved try again',
            type: 'error',
            duration: 2000,
          })
        }
      }
    },
    updateAndCreateDisplay(createOnly) {
      // this.saving = true
      var widgetparse = {}
      for (var k in this.getWidgetSaved) {
        // 0 = id
        // 1 = name component
        // 2 = type
        var kparse = k.split('_')
        if (!widgetparse[kparse[0]]) {
          widgetparse[kparse[0]] = []
        }

        widgetparse[kparse[0]].push({
          key: kparse[0] + '_' + kparse[1] + (kparse[2] ? '_' + kparse[2] : ''),
          value: this.getWidgetSaved[k],
        })
      }
      var alltemplate = {}
      var allndf = {}
      var logos = {}
      // console.log(widgetparse, this.templateAddedList)
      this.templateAddedList.forEach((el, i) => {
        if (widgetparse[el.idtemplate]) {
          alltemplate[i] = this.templateAddedList[i]
          allndf[el.idtemplate] = widgetparse[el.idtemplate]
          logos[el.idtemplate] = this.$refs['preview'].logos[el.idtemplate]
        }
      })
      var obj = {
        username: this.displayID,
        name: this.displayName,
        template: this.templateAddedList,
        status: this.status,
        location: {
          name: this.getDisplayLocation,
          geometry: {
            type: 'Point',
            coordinates: [107.77268, -2.58072],
          },
        },
        properties: {
          delay: parseFloat(this.$refs['preview'].times) || 60,
          width: this.$refs['preview'].width,
          height: this.$refs['preview'].height,
          footer: this.useFooter,
          video: this.useVideo,
          backgroundStatic: this.backgroundStatic,
          allLogo: logos,
          allTemplate: alltemplate,
          allSetting: allndf,
        },
      }

      // this.$store.commit('displayWidget/emptyWidget')

      // if (createOnly == 'create') {
      //   console.log(obj, 'create')
      //   // this.createData(obj)
      //   // return true
      // }
      if (!this.$route.query.id) {

        // console.log(obj, 'create no id')
        this.createData(obj)
      } else {

        // console.log(obj, 'update')
        this.updateData(obj)
      }
    },
  },
}
</script>
  
<style></style>