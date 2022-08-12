<template>
  <div class="grid gap-6 grid-cols-4" >
    <div v-for="val in 4" :key="val">
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
      list4: [],
      layoutname: 'Layout_4_2',
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
      } else if (val == 4) {
        return this.list4
      }
    },
  },
}
</script>