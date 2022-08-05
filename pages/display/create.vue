<template>
  <div class="bg-gray-200 h-screen">
    <Navbar class="w-full sticky top-0" />
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
          <div>Secret Code <small>( optional )</small></div>
          <div class="mt-2 relative">
            <input
              v-model="secretCode"
              placeholder="secret code"
              class="w-full rounded border border-gray-300 px-2 py-1.5"
              type="text"
              required
              :class="getDisplaySecretSpaces ? 'border-red-500' : ''"
            />
            <div class="absolute -top-5 right-0">
              <small class="text-red-500" v-if="getDisplaySecretSpaces">
                no spaces allowed
              </small>
            </div>
          </div>
        </div>
        <div class="flex-grow">
          <div>Display Location</div>
          <div class="mt-2">
              <v-select label="name" v-model="getDisplayLocation" :options="options"></v-select>
          </div>
        </div>
        <div class="flex-grow">
          <!--  -->
          <button
            type="submit"
            class="px-4 py-2 rounded bg-sky-500 text-white"
            @click="updateAndCreateDisplay"
            :disabled="saving"
          >
            {{ saving ? 'Saving Display...' : 'Update and Refresh Display' }}
          </button>
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
      secretCode: null,
      getDisplayLocation: 'Kepulauan Bangka Belitung',
      options: [{
        name: 'Kepulauan Bangka Belitung',
        value: 'Kepulauan Bangka Belitung',
      }]
    }
  },
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
  mounted() {
    this.$axios.$get('template').then((res) => {
      this.templateDB = res.data
    })
  },
  methods: {
    updateAndCreateDisplay() {
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
          key: kparse[1] + kparse[2],
          value: this.getWidgetSaved[k]
        })
        // widgetparse[this.getWidgetSaved[k].id].push({
        //   key:this.getWidgetSaved[k].id,
        //   value: this.getWidgetSaved[k].value
        // })
      }
      this.templateAddedList.forEach(el => {
        if (widgetparse[el._id]) {
          el.properties.widgetndf = widgetparse[el._id]
        }
      })
      var obj = {
        username: this.displayID,
        name: this.displayName,
        location: {
          name: 'Tanjung Pandan',
          geometry: {
            type: 'Point',
            coordinates: [107.652999, -2.741668],
          },
        },
        template: this.templateAddedList,
        properties: {
          delay: parseFloat(this.$refs['preview'].times) || 60,
        },
      }
      this.$axios.$post('display/create', obj).then((res) => {
        this.saving = false
        this.$toast.open({
          message: 'Display saved',
          type: 'success',
          duration: 2000,
        })
      })
    },
  },
}
</script>

<style>
</style>