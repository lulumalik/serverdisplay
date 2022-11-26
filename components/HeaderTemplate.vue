<template>
  <div>
    <div class="w-full flex items-center ">
      <div class="flex-grow flex items-center space-x-4">
        <img src="/bmkg.png" alt="bmkg" class="w-20" />
        <div class="flex-grow">
          <div style="font-size:27px" class="font-semibold" :class="$parent.isHujan ? 'text-white' : new Date(currentDate).getHours() >= 18 ? 'text-white' : 'text-black'" >
            BADAN METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA
          </div>
          <div class="text-xl mt-2 kaushan" :class="$parent.isHujan ? 'text-white' : new Date(currentDate).getHours() >= 18 ? 'text-white' : 'text-black'">
            Cepat, Tepat, Akurat, Luas, dan Mudah Dipahami
          </div>
        </div>
        <div class="flex-none font-thin pr-4" :class="$parent.isHujan ? 'text-white' : new Date(currentDate).getHours() >= 18 ? 'text-white' : 'text-black'" v-if="nodrag">
          <div class="flex items-center justify-end">
            <div class="ml-2 font-bold text-3xl">
              {{ $parent.location ? $parent.location.name : '-' }}
            </div>
          </div>
          <div
            class="text-2xl mt-1 flex items-center font-semibold justify-end"
          >
            <div class="ml-2" :class="$parent.isHujan ? 'text-white' : new Date(currentDate).getHours() >= 18 ? 'text-white' : 'text-black'">
              {{
                deleteSecond(
                  new Date(currentDate)
                    .toString()
                    .split(' ')
                    .splice(0, 5)
                    .join(' ')
                )
              }}
              {{ getTimeZone == 7 ? 'WIB' : getTimeZone == 6 ? 'WITA' : 'WIT' }}
            </div>
            <!-- Selasa, 12 Juli 2022 | 10:31:22 WIB -->
          </div>
        </div>
      </div>
      <div class="flex-none flex space-x-3" v-if="!nodrag">
        <div v-for="(l, i) in 3" :key="i">
          <div
            v-if="
            $parent.$parent.logos &&
              $parent.$parent.logos[$parent.obj.idtemplate] &&
              $parent.$parent.logos[$parent.obj.idtemplate][l]
            "
            class="relative"
          >
            <button
              @click="deleteLogos(l)"
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

            <img
              :src="
                $axios.defaults.baseURL +
                $parent.$parent.logos[$parent.obj.idtemplate][l].url.replace(
                  '/api/',
                  ''
                )
              "
              style="width: 80px"
            />
          </div>
          <div
            v-else
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
            @click="uploadLogo(l)"
          >
            <span class="relative bottom-0.5">+</span>
          </div>
        </div>
      </div>
      <div v-else class="flex-none flex space-x-3">
        <div v-for="(l, i) in 3" :key="i" class="relative">
          <div
            v-if="
              $parent.$parent.logos[$parent.obj.idtemplate] &&
              $parent.$parent.logos[$parent.obj.idtemplate][l]
            "
          >
            <img
              :src="
                $axios.defaults.baseURL +
                $parent.$parent.logos[$parent.obj.idtemplate][l].url.replace(
                  '/api/',
                  ''
                )
              "
              style="width: 80px"
            />
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
      var day = new Date(date).getDay()
      var month = new Date(date).getMonth()

      var dayres
      var monthres
      switch (day) {
        case 0:
          dayres = 'Minggu'
          break
        case 1:
          dayres = 'Senin'
          break
        case 2:
          dayres = 'Selasa'
          break
        case 3:
          dayres = 'Rabu'
          break
        case 4:
          dayres = 'Kamis'
          break
        case 5:
          dayres = "Jum'at"
          break
        case 6:
          dayres = 'Sabtu'
          break
      }

      switch (month) {
        case 0:
          monthres = 'Januari'
          break
        case 1:
          monthres = 'Februari'
          break
        case 2:
          monthres = 'Maret'
          break
        case 3:
          monthres = 'April'
          break
        case 4:
          monthres = 'Mei'
          break
        case 5:
          monthres = 'Juni'
          break
        case 6:
          monthres = 'Juli'
          break
        case 7:
          monthres = 'Agustus'
          break
        case 8:
          monthres = 'September'
          break
        case 9:
          monthres = 'Oktober'
          break
        case 10:
          monthres = 'November'
          break
        case 11:
          monthres = 'Desember'
          break
      }

      var dat = date.split(' ').splice(4, 4)[0]
      var final = dat ? dat.split(':').splice(0, 2).join(':') : ''

      return (
        dayres +
        ', ' +
        new Date(date).getDate() +
        ' ' +
        monthres +
        ' ' +
        new Date(date).getFullYear() +
        ' ' +
        final
      )
    },
    returningTimeZone() {
      this.currentDate =
        new Date().toString().split(' ').splice(0, 5).join(' ') +
        ' GMT+0' +
        this.getTimeZone +
        '00'
    },
    uploadLogo(i) {
      this.indexdata = i
      this.$parent.chooseLogo = true
    },
    deleteLogos(index) {
      var arr = []
      this.$parent.$parent.logos[this.$parent.obj.idtemplate].forEach(
        (el, i) => {
          if (index !== i) {
            arr.push(el)
          } else {
            arr.push(null)
          }
        }
      )
      // console.log(arr)
      this.$parent.$parent.logos[this.$parent.obj.idtemplate].length = 0
      this.$parent.$parent.logos[this.$parent.obj.idtemplate] = arr
      // $parent.logos[i] = null

      this.$parent.useHeader = false
      setTimeout(() => {
        this.$parent.useHeader = true
      }, 500)
    },
  },
}
</script>