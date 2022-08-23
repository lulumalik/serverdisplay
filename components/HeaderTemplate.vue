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
        <img src="/bmkg.png" alt="bmkg" class="w-20" />
        <div class="flex-grow" >
          <div class="text-3xl font-semibold">
            BADAN METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA
          </div>
          <div class="text-xl mt-2" style="font-family: pristina">
            Cepat, Tepat, Akurat, Luas, dan Mudah Dipahami
          </div>
        </div>
        <div class="flex-none font-thin pr-4" v-if="nodrag">
          <div class="flex items-center justify-end">
            <div class="ml-2 font-bold text-3xl">
              {{ $parent.location ? $parent.location.name : '-' }}
            </div>
          </div>
          <div class="text-2xl mt-1 flex items-center font-semibold justify-end">
            <div class="ml-2">
              {{
                deleteSecond(new Date(currentDate)
                  .toString()
                  .split(' ')
                  .splice(0, 5)
                  .join(' '))
              }}
              {{ getTimeZone == 7 ? 'WIB' : getTimeZone == 6 ? 'WITA' : 'WIT' }}
            </div>
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
            <img :src="$parent.logos" style="width:80px" />
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
      currentDate: '',
      indexdata: null,
    }
  },
  mounted() {
    this.returningTimeZone()
    setInterval(() => {
      this.returningTimeZone()
    }, 1000)
  },
  computed: {
    getTimeZone() {
      var date = new Date().getTimezoneOffset()
      if (date == -420) {
        return 7
      } else if (date == -480) {
        return 6
      } else if (date == -540) {
        return 5
      }
    },
  },
  methods: {
    deleteSecond(date) {
      var dat = date.split(':')
      var final = dat.splice(0,2).join(':')
      return final
    },
    returningTimeZone() {
      this.currentDate =
        new Date().toString().split(' ').splice(0, 5).join(' ') +
        ' GMT+0' +
        this.getTimeZone +
        '00'
    },
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