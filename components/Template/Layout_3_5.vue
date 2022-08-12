<template>
  <div class="flex w-full items-center space-x-8">
       <div class="flex-grow w-7/12">
        <draggable
          class="list-group h-full flex flex-wrap"
          :list="list1"
          group="widget"
          :draggable="nodrag ? '' : '.datadrag1'"
        >
            <div
            v-for="(item, index) in list1"
            :key="index"
            :class="'datadrag1'"
            class="w-full m-3"
          >
            <component :is="item.component" />
          </div>
          <div v-if="list1.length == 0" class="w-full">
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
              v-if="!nodrag"
            >
              <div>Drop Widget Here.</div>
            </div>

        <div v-else class="h-96 w-full"></div>
          </div>
        </draggable>
      </div>
    <div class="flex-grow space-y-8 w-5/12">
      <div v-for="i in 2" :key="i" :class="i">
        <draggable
          class="list-group h-full"
          :list="listing((i + 1))"
          group="widget"
          :draggable="nodrag ? '' : '.datadrag' + (i + 1)"
        >
            <div
            v-for="(item, index) in listing((i + 1))"
            :key="index"
            :class="'datadrag' + (i + 1)"
            class="w-full m-3"
          >
            <component :is="item.component" />
          </div>
          <div v-if="listing((i + 1)).length == 0" class="w-full">
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
              v-if="!nodrag"
            >
              <div>Drop Widget Here.</div>
            </div>

        <div v-else class="h-44 w-full"></div>
          </div>
        </draggable>
      </div>
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
      layoutname: 'Layout_3_5',
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