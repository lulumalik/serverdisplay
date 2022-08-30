<template>
  <div>
    <div
      v-show="showpopup"
      style="z-index: 100000"
      class="
        fixed
        flex
        items-center
        justify-center
        top-0
        left-0
        h-screen
        w-screen
        bg-black/20
      "
    >
      <div class="bg-white rounded px-12 py-6">
        <div class="font-bold text-lg w-72 flex">
          <div class="flex-grow">Display Settings</div>
          <div
            @click="showpopup = false"
            class="flex-none text-xl cursor-pointer text-red-500"
          >
            &times;
          </div>
        </div>
        <div class="mt-4">
          <label class="flex space-x-2">
            <div>
              <input
                type="checkbox"
                v-model="$parent.$parent.useFooter"
                class="text-xs p-1.5 rounded"
              />
            </div>
            <div>Running text</div>
          </label>
          <label class="flex mt-2 space-x-2">
            <div>
              <input
                type="checkbox"
                v-model="useVideo"
                class="text-xs p-1.5 rounded"
              />
            </div>
            <div>Background Dynamic</div>
          </label>
          <div v-show="useVideo">
            <v-select
              label="location"
              @option:selected="changeSelected"
              v-model="subdistrict"
              :options="listKecamatan"
            ></v-select>
          </div>
        </div>
      </div>
    </div>
    <button @click="showpopup = true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="text-sky-600"
      >
        <path
          fill="currentColor"
          d="M24 13.616v-3.232l-2.869-1.02c-.198-.687-.472-1.342-.811-1.955l1.308-2.751-2.285-2.285-2.751 1.307c-.613-.339-1.269-.613-1.955-.811l-1.021-2.869h-3.232l-1.021 2.869c-.686.198-1.342.471-1.955.811l-2.751-1.308-2.285 2.285 1.308 2.752c-.339.613-.614 1.268-.811 1.955l-2.869 1.02v3.232l2.869 1.02c.197.687.472 1.342.811 1.955l-1.308 2.751 2.285 2.286 2.751-1.308c.613.339 1.269.613 1.955.811l1.021 2.869h3.232l1.021-2.869c.687-.198 1.342-.472 1.955-.811l2.751 1.308 2.285-2.286-1.308-2.751c.339-.613.613-1.268.811-1.955l2.869-1.02zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import { dataStatic, belitung, belitungTimur } from '../../utils/listStatic.js'
export default {
  data() {
    return {
      showpopup: false,
      useVideo: false,
      subdistrict: '',
      listKecamatan: [...belitung, ...belitungTimur, ...dataStatic],
    }
  },
  watch: {
    useVideo(val) {
      if (!val) {
        this.$parent.$parent.useVideo = false
      }  else {
        this.$parent.$parent.useVideo = this.subdistrict
      }
    },
    '$parent.$parent.useVideo': {
      handler(val) {
        // console.log(val, 'set')
        if (val) {
        this.useVideo = true
        this.subdistrict = val
        }
      },
      deep:true
    }
  },
  methods: {
    changeSelected() {
      this.$parent.$parent.useVideo = this.subdistrict
    },
  },
}
</script>