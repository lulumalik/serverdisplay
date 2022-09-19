<template>
  <div class="w-full" style="font-size: 9px">
    <div class="flex">
      <div class="flex-grow pl-0.5">
        <div>
          <div
            :style="{
              display: 'grid',
              gridTemplateColumns: `repeat(${dataList.color.length}, minmax(0, 1fr))`,
            }"
          >
            <div
              v-for="(color, index) in dataList.color"
              :key="index"
              style="position: relative"
              :style="{
                background: `rgb(${color[1]},${color[2]},${color[3]})`,
              }"
            >
              &nbsp;
              <span>
                <span
                  v-if="index > 0"
                  style="position: absolute; left: -4px; bottom: -15px"
                  :style="{
                    fontSize: params == 'EH' ? '7.5px !important' : '9px',
                  }"
                >
                  <span :class="color[0] >= 100 ? 'relative right-1' : ''">{{
                    color[0] == 0
                      ? parseInt(color[0])
                      : color[0]
                      ? parseInt(color[0])
                      : ""
                  }}</span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div :class="params == 'hima' ? '' : 'ml-1'">{{ dataList.satuan }}</div>
    </div>
  </div>
</template>

<script>

import { legend } from "../../../utils/helperSpartan.js";
export default {
  props: {
    params: {
      default: function () {
        return "";
      },
    },
  },
  data() {
    return {
      showSelect: false,
      selectedLegend: "",
      legendTop: 0,
      configLayerData: {
        contour: [],
      },
      opt: legend,
    };
  },
  computed: {
    dataList() {
      return this.opt[this.params];
    },
  },
};
</script>
<style>
.legend {
  padding-top: 9px;
  padding-bottom: 9px;
  font-size: 12px !important;
  position: relative;
  bottom: 0px;
  text-align: center;
}
</style>
