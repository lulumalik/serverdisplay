<template>
  <div class="px-3 py-4">
    <div class="text-sm">
      Widget Option
      <client-only>
        <div
          class="bg-white w-full mt-3 rounded overflow-auto w-72"
          style="height: calc(100vh - 300px)"
        >
          <div class="p-2">
            <select
              v-model="selected"
              v-if="listWidget[0]"
              class="px-2 py-1 rounded w-full border border-gray-300"
            >
              <option disabled :value="null">Select Widget</option>
              <option
                v-for="(val, i) in listWidget[0].component.widgets"
                :key="i"
                :value="val"
              >
                {{ val.name }}
              </option>
            </select>
            <div class="mt-2 border-t pt-2 border-gray-300">
              <div v-if="selected && waitingSelected">
                <component :is="selected.component + 'Setting'" :idTemplate="$parent.selectedTemplateID" />
              </div>
            </div>
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: null,
      waitingSelected:false,
      province: [],
    }
  },
  computed: {
    listWidget() {
      return this.$parent.templateAddedList.filter(
        (val) => val.idtemplate == this.$parent.selectedTemplateID
      )
    },
  },
  watch: {
    '$parent.selectedTemplateID': function() {
      this.selected = null
    },
    selected( ) {
      setTimeout(() => {
        this.waitingSelected = true
      }, 300);
    }
  },
  async mounted() {
    var res = await this.$axios.$get('/cgms/weather/province')
    this.province = res.data.data
  },
  methods: {
    isEmpty(obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          return false
        }
      }

      return JSON.stringify(obj) === JSON.stringify({})
    },
  },
}
</script>