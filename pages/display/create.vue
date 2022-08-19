<template>
  <div class="bg-gray-200 h-screen">
    <Navbar class="w-full sticky top-0" style="z-index:1000"/>
    <client-only>
      <form class="text-sm px-6 pt-4 flex items-end space-x-4">
        <div class="flex-grow">
          <div class="flex items-center">
            <div class="flex-grow">Display ID</div>
          </div>
          <div class="mt-2 relative">
            <input
              v-model="displayID"
              placeholder="id"
              :class="getDisplayIDSpaces ? 'border-red-500' : ''"
              class="w-full rounded border border-gray-300 px-2 py-1.5"
              type="text"
              required
            />
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
            <input
              v-model="displayName"
              placeholder="name"
              class="w-full rounded border-gray-300 border px-2 py-1.5"
              type="text"
              required
            />
          </div>
        </div>
        <div class="flex-grow">
          <div>Display Location</div>
          <div class="mt-2">
            <input
              label="name"
              class="w-full rounded border-gray-300 border px-2 py-1.5"
              v-model="getDisplayLocation"
              type="text"
            />
          </div>
        </div>
        <div class="flex-grow">
          <!--  -->
          <label class="flex items-center space-x-3 mb-2">
            <input type="checkbox" :disabled="true" v-model="secretCode" class="text-xs p-0.5 rounded" />
            <div class="text-xs">
              Secret code
            </div>
          </label>
          <div
            type="submit"
            class="
              px-4
              cursor-pointer
              text-center
              rounded
              bg-sky-500
              text-white
            "
            style="padding-top:7px;padding-bottom:7px;"
            @click="updateAndCreateDisplay"
            :disabled="saving"
          >
            {{ saving ? 'Saving Display...' : 'Update and Refresh Display' }}
          </div>
        </div>
        <div class="flex-grow" v-if="$route.query.id">
          <div
            type="submit"
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
                text-center
                cursor-pointer
            "
            style="padding-top:7px;padding-bottom:7px;"
            @click="createWithUpdate"
            :disabled="saving"
          >
            {{ saving ? 'Saving Display...' : 'Save as new Display' }}
          </div>
        </div>
        <!-- <div class="flex-none">
                     <div
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
                cursor-pointer
              "
              v-if="$route.query.id"
              @click="toGallery"
            >
              Preview Display
            </div>
        </div> -->
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
      useFooter: true
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
    var alltemplate = res1.data
    if (this.$route.query.id) {
      const res = await this.$axios.$get('display/find/' + this.$route.query.id)
      this.allfind = res.data
      this.templateDB = this.getDifference(alltemplate, res.data.template)
      this.templateAddedList = res.data.template
      this.displayID = res.data.username
      this.displayName = res.data.name
      // console.log(res.data)
      this.useFooter = res.data.properties.footer
      this.getDisplayLocation = res.data.location.name
      // console.log(res.data)
      this.$refs['preview'].times = res.data.properties.delay
      this.$refs['preview'].width = res.data.properties.width || 1366
      this.$refs['preview'].height = res.data.properties.height || 768
      this.templateAddedList.forEach((el) => {
        if (el.properties.widgetndf) {
          el.properties.widgetndf.forEach((l) => {
            this.$store.commit('displayWidget/mutationWidget', {
              key: el._id + l.key,
              value: l.value,
            })
          })
        }
      })
    } else {
      this.templateDB = res1.data
    }
  },
  methods: {
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
    updateData(obj) {
      this.$axios
        .$put('display/update/' + this.allfind._id, obj)
        .then((res) => {
          console.log(res)
          this.saving = false
          this.$toast.open({
            message: 'Display saved',
            type: 'success',
            duration: 2000,
          })
        })
    },
    createData(obj) {
      this.$axios.$post('display/create?generateSecret' + (this.secretCode ? '=true' : '=false'), obj).then((res) => {
        this.saving = false
        this.$toast.open({
          message: 'Display saved',
          type: 'success',
          duration: 2000,
        })
      })
    },
    createWithUpdate() {
      this.updateAndCreateDisplay('create')
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
          key: '_' + kparse[1] + (kparse[2] ? '_' + kparse[2] : ''),
          value: this.getWidgetSaved[k],
        })
      }
      this.templateAddedList.forEach((el) => {
        if (widgetparse[el._id]) {
          el.properties.widgetndf = widgetparse[el._id]
        }
      })
      var obj = {
        username: this.displayID,
        name: this.displayName,
        location: {
          name: this.getDisplayLocation,
          geometry: {
            type: 'Point',
            coordinates: [107.77268, -2.58072],
          },
        },
        template: this.templateAddedList,
        properties: {
          delay: parseFloat(this.$refs['preview'].times) || 60,
          width: this.$refs['preview'].width,
          height: this.$refs['preview'].height,
          footer: this.useFooter
        },
      }
      if (createOnly == 'create') {
        this.createData(obj)
        return true
      }
      if (!this.$route.query.id) {
        this.createData(obj)
      } else {
        this.updateData(obj)
      }
    },
  },
}
</script>

<style>
</style>