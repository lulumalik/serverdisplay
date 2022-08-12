<template>
  <div>
    <div class="text-xl mb-4">Display Base</div>
    <div>
      <label class="flex space-x-4">
        <div>
          <input
            type="checkbox"
            class="text-xs p-1"
            v-model="$parent.useVideo"
          />
        </div>
        <div>Dynamic</div>
      </label>
      <div v-show="$parent.useVideo" class="mt-1">
        <v-select
          label="subdistrict"
          class="p-0"
          style="width:208px"
          v-model="subdistrict"
          :options="listKecamatan"
        ></v-select>
      </div>
    </div>
    <div class="flex space-x-4 mt-2 items-center" v-show="!$parent.useVideo">
      <div class="w-16 text-gray-500 font-thin">Fill</div>
      <picture-input
        id="fileUpload"
        type="file"
        accept="image/jpeg,image/png"
        @change="dataFile"
        class="hidden"
      >
      </picture-input>
      <div
        class="
          border border-sky-400
          text-xs
          flex
          items-center
          justify-start
          w-full w-32
          px-2
          py-0.5
          rounded-md
        "
      >
        <div class="flex-grow text-xs cursor-pointer" @click="chooseFiles()">
          Image
        </div>
        <div class="flex-none">
          <input
            type="color"
            class="w-6 h-6 rounded"
            v-model="$parent.backgroundColor"
          />
        </div>
      </div>
    </div>
    <label class="flex space-x-4 mt-3 items-center">
      <input type="checkbox" class="text-xs p-1" v-model="$parent.useHeader" />
      <div class="text-gray-500">Header</div>
    </label>
    <!-- <label class="flex space-x-4 mt-3 items-center">
      <input type="checkbox" class="text-xs p-1" v-model="$parent.useFooter" />
      <div class="text-gray-500">Footer</div>
    </label> -->
    <!-- <div class="flex space-x-4 mt-3  items-center">
      <div class="w-16 text-gray-500 font-thin">Logo</div>
      <div>
        <button class="bg-sky-400 text-xs text-white w-32 py-1 rounded-md">
          Upload Image
        </button>
      </div>
    </div> -->
  </div>
</template>

<script>
import {dataStatic} from '../utils/listStatic.js'
export default {
  data() {
    return {
      subdistrict: null,
      listKecamatan: dataStatic,
    }
  },
  methods: {
    chooseFiles() {
      document.getElementById('fileUpload').click()
    },
    dataFile(e) {
      this.$parent.backgroundColor = e
    },
  },
}
</script>