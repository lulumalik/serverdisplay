<template>
  <div class="w-full py-1 text-xs">
    <div class="font-semibold flex-shrink-0 mb-2">Select Area</div>

    <select
      v-model="area"
      class="text-xs border border-black w-48 p-1 w-full rounded"
    >
      <optgroup v-for="(val, key) in params" :key="key" :label="key">
        <option v-for="(list, i) in val" :key="i" :value="list.name">
          {{ list.id }}
        </option>
      </optgroup>
    </select>
  </div>
</template>
<script>
import { area } from '../../../utils/staticConfig'

export default {
  data() {
    return {
      params: area,
      area: 'indonesia',
    }
  },
  props: {
    idTemplate: {
      default: () => {
        return ''
      },
    },
  },
  watch: {
    area() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetOfsStatic',
        value: this.area,
      })
    },
  },
  mounted() {
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetOfsStatic'
      ]
    ) {
      this.area =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetOfsStatic'
        ]
    }
  },
}
</script>