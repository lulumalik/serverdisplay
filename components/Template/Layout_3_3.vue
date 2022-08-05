<template>
  <div class="grid gap-4 grid-cols-3" >
    <div v-for="val in 3" :key="val">
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
                h-80
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
      layoutname: 'Layout_3_3',
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
    }
  },
}
</script>