<template>
  <div
    class="grid grid-cols-1 gap-8"
  >
    <div>
      <draggable
        class="list-group h-full"
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
              h-80
            "
          >
            <div>Drop Widget Here.</div>
          </div>
        </div>
      </draggable>
    </div>
    <div class="grid grid-cols-2 gap-8">
      <div v-for="val in 2" :key="val">
        <draggable
          class="list-group h-full"
          :list="listing(val + 1)"
          group="widget"
          :draggable="nodrag ? '' : '.datadrag' + (val + 1)"
        >
          <div
            v-for="(item, index) in listing(val + 1)"
            :key="index"
            :class="'datadrag' + (val + 1)"
            class="w-full m-3"
          >
            <component :is="item.component" />
          </div>
          <div v-if="listing(val + 1).length == 0" class="w-full">
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
    <div>
      <draggable
        class="list-group h-full"
        :list="list4"
        group="widget"
        :draggable="nodrag ? '' : '.datadrag4'"
      >
        <div
          v-for="(item, index) in list4"
          :key="index"
          :class="'datadrag4'"
          class="w-full m-3"
        >
          <component :is="item.component" />
        </div>
        <div v-if="list4.length == 0" class="w-full">
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
      list4: [],
      layoutname: 'Layout_4_1',
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