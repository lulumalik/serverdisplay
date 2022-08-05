<template>
  <div>
    <div
      class="grid gap-4"
    >
      <div v-for="val in 2" :key="val">
        <draggable
          class="list-group h-full flex"
          :list="listing(val)"
          group="widget"
          :draggable="nodrag ? '' : '.datadrag' + val"
        >
          <div
            v-for="(item, index) in listing(val)"
            :key="index"
            :class="'datadrag' + val"
            class="datadrag w-full m-3"
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
                h-80
              "
            >
              <div>Drop Widget Here.</div>
            </div>
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
      layoutname: 'Layout_2_1',
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