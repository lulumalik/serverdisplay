<template>
  <div>
    <picture-input
      id="fileUpload2"
      type="file"
      accept="image/jpeg,image/png"
      @change="dataFile"
      class="hidden"
    >
    </picture-input>
    <div class="w-full flex items-center">
      <div class="flex-grow flex items-center space-x-4">
        <img src="/bmkg.png" alt="bmkg" class="w-12" />
        <div class="flex-grow" v-if="!nodrag">
          <div class=" text-xs flex items-center">
            <input type="checkbox" v-model="$parent.useLocationName"/>
            <div class="ml-2">Location Name</div>
          </div>
          <div class=" text-xs mt-1 flex items-center">
            <input type="checkbox" v-model="$parent.useLocalTime"/>
            <div class="ml-2">Local Time</div>
            <!-- Selasa, 12 Juli 2022 | 10:31:22 WIB -->
          </div>
        </div>
        <div class="flex-grow font-semibold" v-else>
          <div class=" text-md flex items-center">
            <div class="ml-2">{{$parent.location ? $parent.location.name : '-'}}</div>
          </div>
          <div class=" text-md mt-1 flex items-center">
            <div class="ml-2">{{new Date().toString().split(' ').splice(0,5).join(' ')}}</div>
            <!-- Selasa, 12 Juli 2022 | 10:31:22 WIB -->
          </div>
        </div>
      </div>
      <div class="flex-none flex space-x-3">
        <div>
          <div v-if="$parent.logos.length > 0" class="relative">
            <button
              @click="$parent.logos = ''"
              v-if="!nodrag"
              class="
                text-red-500
                font-bold
                absolute
                -right-3
                -top-2
                cursor-pointer
              "
            >
              &times;
            </button>
            <img :src="$parent.logos" class="w-12" />
          </div>
          <div
            v-else-if="$parent.logos.length == 0 && !nodrag"
            class="
              h-8
              w-8
              rounded
              border border-black
              flex
              items-center
              justify-center
              cursor-pointer
            "
            @click="uploadLogo()"
          >
            <span class="relative bottom-0.5">+</span>
          </div>
        </div>
      </div>
    </div>
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
      indexdata: null,
    }
  },
  methods: {
    uploadLogo(i) {
      // this.indexdata = i
      document.getElementById('fileUpload2').click()
      // console.log('upload logo');
    },
    dataFile(e) {
      this.$parent.logos = e
    },
  },
}
</script>