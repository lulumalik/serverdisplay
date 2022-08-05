<template>
  <div
    class="flex w-full items-center space-x-8 rounded"
  >
    <div class="flex-grow w-7/12 space-y-8">
      <div v-for="val in 2" :key="val">
        <draggable
          class="list-group h-full"
          :list="listing(val)"
          group="widget"
          :draggable="nodrag ? '' : '.datadrag' + val"
        >
            <div
            v-for="(item, index) in listing(val)"
            :key="index"
            :class="'datadrag' + val"
            class="w-full m-3"
          >
            <component :is="item.component" />
          </div>
          <div v-if="listing(val).length == 0" class="w-full">
            <div
              class="
                border-2
                rounded
                flex
                items-center
                justify-center
                w-full
                border-dashed border-gray-400
                h-44
              "
            >
              <div>Drop Widget Here.</div>
            </div>
          </div>
        </draggable>
      </div>
    </div>
    <div class="flex-grow w-5/12 h-full">
      <draggable
        class="list-group h-full flex flex-wrap"
        :list="list3"
        group="widget"
        :draggable="nodrag ? '' : '.datadrag3'"
      >
         <div
            v-for="(item, index) in list3"
            :key="index"
            :class="'datadrag3'"
            class="w-full m-3"
          >
            <component :is="item.component" />
          </div>
          <div v-if="list3.length == 0" class="w-full">
            <div
              class="
                border-2
                rounded
                flex
                items-center
                justify-center
                w-full
                border-dashed border-gray-400
                h-96
              "
            >
              <div>Drop Widget Here.</div>
            </div>
          </div>
      </draggable>
    </div>
  </div>
</template>

<script>
export default {
  props: {
  nodrag: {
      default: () => false,
    }
  },
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      layoutname: 'Layout_3_4',
    }
  },
  methods: {
    listing(val) {
      if (val == 1) {
        return this.list1
      } else if (val == 2) {
        return this.list2
      } else if (val == 3) {
        return this.list3
      }
    },
  },

}
</script>