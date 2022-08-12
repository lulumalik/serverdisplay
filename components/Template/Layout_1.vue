<template>
  <div class="rounded">
    <draggable
      class="list-group h-full flex flex-wrap"
      :list="list1"
      group="widget"
      :draggable="nodrag ? '' : '.datadrag'"
    >
      <div
        v-for="(item, index) in list1"
        :key="index"
        class="datadrag w-full m-3"
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
          v-if="!nodrag"
        >
          <div>Drop Widget Here.</div>
        </div>
        <div v-else class="h-80 w-full"></div>
      </div>
    </draggable>
  </div>
</template>

<script>
export default {
  props: {
    nodrag: {
      default: () => false,
    },
  },
  data() {
    return {
      list1: [],
      layoutname: 'Layout_1',
    }
  },
}
</script>