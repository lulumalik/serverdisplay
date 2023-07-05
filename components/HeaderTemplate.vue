<template>
  <div>
    <div class="w-full flex items-center ">
      <div class="flex-grow flex items-center space-x-4">
        <img
          :src="$parent.isHujan ? '/bmkglogowht-01.png' : new Date(currentDate).getHours() >= 18 || new Date(currentDate).getHours() <= 5 ? '/bmkglogowht-01.png' : '/bmkg.png'"
          alt="bmkg" class="w-20" />
        <div class="flex-grow">
          <div style="font-size:27px" class="font-semibold"
            :class="$parent.isHujan ? 'text-white' : new Date(currentDate).getHours() >= 18 || new Date(currentDate).getHours() <= 5 ? 'text-white' : 'text-black'">
            BADAN METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA
          </div>
          <div class="text-xl mt-2 kaushan"
            :class="$parent.isHujan ? 'text-white' : new Date(currentDate).getHours() >= 18 || new Date(currentDate).getHours() <= 5 ? 'text-white' : 'text-black'">
            Cepat, Tepat, Akurat, Luas, dan Mudah Dipahami
          </div>
        </div>
        <div class="flex-none font-thin pr-4"
          :class="$parent.isHujan ? 'text-white' : new Date(currentDate).getHours() >= 18 || new Date(currentDate).getHours() <= 5 ? 'text-white' : 'text-black'"
          v-if="nodrag">
          <div class="flex items-center justify-end">
            <div class="ml-2 font-bold text-3xl">
              {{ $parent.location ? $parent.location.name : '-' }}
            </div>
          </div>
          <div class="text-2xl mt-1 flex items-center font-semibold justify-end">
            <div class="ml-2"
              :class="$parent.isHujan ? 'text-white' : new Date(currentDate).getHours() >= 18 || new Date(currentDate).getHours() <= 5 ? 'text-white' : 'text-black'">
              <span v-if="currentDate"> {{
                konversiWaktuGMT(currentDate)
              }}</span>
              {{ returningtime }}
            </div>
            <!-- Selasa, 12 Juli 2022 | 10:31:22 WIB -->
          </div>
        </div>
      </div>
      <div class="flex-none flex space-x-3" v-if="!nodrag">
        <div v-for="(l, i) in 3" :key="i">
          <div v-if="$parent.$parent.logos &&
            $parent.$parent.logos[$parent.obj.idtemplate] &&
            $parent.$parent.logos[$parent.obj.idtemplate][l]
            " class="relative">
            <button @click="deleteLogos(l)" v-if="!nodrag" class="
                text-red-500
                font-bold
                absolute
                -right-3
                -top-2
                cursor-pointer
              ">
              &times;
            </button>

            <img :src="$axios.defaults.baseURL +
              $parent.$parent.logos[$parent.obj.idtemplate][l].url.replace(
                '/api/',
                ''
              )
              " style="width: 80px" />
          </div>
          <div v-else class="
              h-8
              w-8
              rounded
              border border-black
              flex
              items-center
              justify-center
              cursor-pointer
            " @click="uploadLogo(l)">
            <span class="relative bottom-0.5">+</span>
          </div>
        </div>
      </div>
      <div v-else class="flex-none flex space-x-3">
        <div v-for="(l, i) in 3" :key="i" class="relative">
          <div v-if="$parent.$parent.logos[$parent.obj.idtemplate] &&
            $parent.$parent.logos[$parent.obj.idtemplate][l]
            ">
            <img :src="$axios.defaults.baseURL +
              $parent.$parent.logos[$parent.obj.idtemplate][l].url.replace(
                '/api/',
                ''
              )
              " style="width: 80px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap');

.kaushan {
  font-family: 'Kaushan Script', cursive;
}
</style>

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
      chooseLogo: true,
      returningtime: ''
    }
  },
  mounted() {
    this.returningTimeZone()
    setInterval(() => {
      this.returningTimeZone()
    }, 1000)
    setInterval(() => {
      this.refreshBrowserEveryHour()
    }, 3600000);
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
    refreshBrowserEveryHour() {
      // Refresh the browser
      location.reload();
    },
    getOffsetGMT() {
      // Mendapatkan waktu lokal saat ini
      var waktuLokal = new Date();

      // Mendapatkan offset waktu lokal dalam menit
      var offset = waktuLokal.getTimezoneOffset();

      // Mengubah offset menjadi format GMT
      var offsetGMT = -(offset / 60);

      // Membentuk string offset GMT dengan format yang sesuai
      var offsetString = offsetGMT > 0 ? offsetGMT : offsetGMT.toString();

      // Menambahkan nol pada offset yang hanya satu digit
      if (offsetGMT > -10 && offsetGMT < 10) {
        offsetString = offsetString;
      }

      // Mengembalikan offset GMT dalam format string
      return offsetString;
    },
    konversiWaktuGMT(waktu, offset) {
      // Mendapatkan waktu lokal

      var waktuLokal = new Date(waktu);
      // console.log(this.$parent.responseDisplay)
      var offsetjam;

      if (this.$parent.responseDisplay.properties && this.$parent.responseDisplay.properties.timeoffset) {
        offsetjam = this.$parent.responseDisplay.properties.timeoffset.offset * 3600000

        this.$store.commit('ndfData/mutationoffset', this.$parent.responseDisplay.properties.timeoffset.offset)

        this.returningtime = this.$parent.responseDisplay.properties.timeoffset.offset == 7 ? 'WIB' : this.$parent.responseDisplay.properties.timeoffset.offset == 8 ? 'WITA' : this.$parent.responseDisplay.properties.timeoffset.offset == 9 ? 'WIT' : ''
      } else {
        offsetjam = this.getOffsetGMT() * 3600000

        this.$store.commit('ndfData/mutationoffset', this.getOffsetGMT())
        this.returningtime = this.getOffsetGMT() == 7 ? 'WIB' : this.getOffsetGMT() == 8 ? 'WITA' : this.getOffsetGMT() == 9 ? 'WIT' : ''
      }
      // Mendapatkan waktu GMT dengan penyesuaian offset
      var waktuGMT = new Date(waktuLokal.getTime() + (offsetjam));

      // Mengembalikan waktu GMT dalam format string
      var time = waktuGMT.toISOString()
      var date = time.split('T')[0]
      var time2 = time.split('T')[1].split(':')
      return `${date} ${[time2[0], time2[1]].join(':')}`
    },
    returningTimeZone() {
      this.currentDate = new Date()
    },
    uploadLogo(i) {
      this.indexdata = i
      this.$parent.chooseLogo = true
    },
    deleteLogos(index) {
      var arr = []
      this.$parent.$parent.$parent.templateAddedList.forEach(el => {
        this.$parent.$parent.logos[el.idtemplate].forEach(
          (el, i) => {
            if (index !== i) {
              arr.push(el)
            } else {
              arr.push(null)
            }
          }
        )
        // console.log(arr)
        this.$parent.$parent.logos[el.idtemplate].length = 0
        this.$parent.$parent.logos[el.idtemplate] = arr
        // $parent.logos[i] = null

        this.$parent.useHeader = false
        setTimeout(() => {
          this.$parent.useHeader = true
        }, 500)
      })

    },
  },
}
</script>