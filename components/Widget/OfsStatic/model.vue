<template>
  <div class="bg-white w-auto py-1 text-xs">
    <!-- <div class="font-semibold flex-shrink-0 ml-2 mb-2">Model :</div> -->
    <div class="relative flex-grow ">
      <select
        v-model="$parent.selected.model"
        @change="$emit('changeModel', true)"
        class="text-xs border border-black w-48 p-1 rounded"
      >
        <option
          v-for="(list, i) in params"
          :key="i"
          :value="list.id"
        >{{list.name}}</option>
      </select>
    </div>
  </div>
</template>

<script>
import { model } from '../../../utils/staticConfig'

export default {
  data() {
    return {
      params: model,
    }
  },
}
</script>