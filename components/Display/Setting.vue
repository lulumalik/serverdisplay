<template>
  <div>
    <div v-show="showpopup" style="z-index: 100000" class="
        fixed
        flex
        items-center
        justify-center
        top-0
        left-0
        h-screen
        w-screen
        bg-black/20
      ">
      <div class="bg-white rounded px-12 py-6">
        <div class="font-bold text-lg w-72 flex">
          <div class="flex-grow">Display Settings</div>
          <div @click="showpopup = false" class="flex-none text-xl cursor-pointer text-red-500">
            &times;
          </div>
        </div>
        <div class="mt-4">
          <label class="flex space-x-2">
            <div>
              <input type="checkbox" v-model="$parent.$parent.status" class="text-xs p-1.5 rounded" />
            </div>
            <div>Turn {{ $parent.$parent.status ? 'Off' : 'On' }} Display</div>
          </label>
          <label class="flex space-x-2">
            <div>
              <input type="checkbox" v-model="$parent.$parent.useFooter" class="text-xs p-1.5 rounded" />
            </div>
            <div>Running text</div>
          </label>
          <div>
            <v-select label="name" :disabled="!$parent.$parent.useFooter" @option:selected="changeFooter"
              v-model="runningtextData" :options="listGempa"></v-select>
          </div>
          <div class="mt-4">
            <!-- <div>
              <input
                type="checkbox"
                v-model="$parent.$parent.useVideo"
                class="text-xs p-1.5 rounded"
              />
            </div> -->
            <div>Background</div>
            <div class="flex space-x-4 mt-2">
              <label class="text-center flex-grow">
                <input type="radio" :value="true" v-model="isUseVideo" />
                <div>Dynamic</div>
              </label>
              <label class="text-center flex-grow">
                <input type="radio" :value="false" v-model="isUseVideo" />
                <div>Static</div>
              </label>
            </div>
            <div v-if="!isUseVideo" class="mt-3">
              <div>image url</div>
              <div>
                <input type="text" class="border border-gray-300 px-2 py-1 rounded w-full"
                  v-model="$parent.$parent.backgroundStatic" />
              </div>
            </div>
          </div>
          <div class="mt-4 rounded w-full text-white py-2 text-center"
            :class="$parent.$parent.useVideo ? 'bg-green-500' : 'bg-red-500 '"
            v-if="$parent.$parent.useVideo && isUseVideo">
            {{ $parent.$parent.useVideo ? 'You already choose ' + $parent.$parent.useVideo.subdistrict : `Choose Weather Location`}}
          </div>
          <div v-if="isUseVideo" class="mt-4">
            <div>Provinsi</div>
            <div>
              <v-select label="provinsi" @option:selected="changeSelected" v-model="province"
                :options="provinceList"></v-select>
            </div>
            <div v-if="province">
              <div class="mt-2 flex items-center">
                <div class="flex-grow">Kotkab</div>
              </div>
              <div>
                <v-select label="kotkab" @option:selected="changeSelectedKotkab" v-model="kotkab"
                  :options="listKotkab"></v-select>
              </div>
            </div>
            <div v-if="kotkab">
              <div class="mt-2">Kecamatan</div>
              <div>
                <v-select label="subdistrict" @option:selected="changeSelectedKecamatan"
                  v-model="$parent.$parent.useVideo" :options="listKecamatan"></v-select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="showpopup = true">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="text-sky-600">
        <path fill="currentColor"
          d="M24 13.616v-3.232l-2.869-1.02c-.198-.687-.472-1.342-.811-1.955l1.308-2.751-2.285-2.285-2.751 1.307c-.613-.339-1.269-.613-1.955-.811l-1.021-2.869h-3.232l-1.021 2.869c-.686.198-1.342.471-1.955.811l-2.751-1.308-2.285 2.285 1.308 2.752c-.339.613-.614 1.268-.811 1.955l-2.869 1.02v3.232l2.869 1.02c.197.687.472 1.342.811 1.955l-1.308 2.751 2.285 2.286 2.751-1.308c.613.339 1.269.613 1.955.811l1.021 2.869h3.232l1.021-2.869c.687-.198 1.342-.472 1.955-.811l2.751 1.308 2.285-2.286-1.308-2.751c.339-.613.613-1.268.811-1.955l2.869-1.02zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" />
      </svg>
    </button>
  </div>
</template>

<script>
var xml = require('txml')
import { dataStatic, belitung, belitungTimur } from '../../utils/listStatic.js'
export default {
  data() {
    return {
      showpopup: false,
      useVideo: false,
      subdistrict: '',
      runningtextData: null,
      listGempa: [
        {
          "id": "CJK",
          "name": "Jabodetabek"
        },
        {
          "id": "CJB",
          "name": "Jawa Barat"
        },
        {
          "id": "CBT",
          "name": "Banten"
        },
        {
          "id": "CYG",
          "name": "Daerah Istimewa Yogyakarta"
        },
        {
          "id": "CJH",
          "name": "Jawa Tengah"
        },
        {
          "id": "CJT",
          "name": "Jawa Timur"
        },
        {
          "id": "CSU",
          "name": "Sumatera Utara"
        },
        {
          "id": "CPU",
          "name": "Papua"
        },
        {
          "id": "CSL",
          "name": "Sulawesi Selatan"
        },
        {
          "id": "CAH",
          "name": "Aceh"
        },
        {
          "id": "CBK",
          "name": "Bengkulu"
        },
        {
          "id": "CJI",
          "name": "Jambi"
        },
        {
          "id": "CBB",
          "name": "Bangka Belitung"
        },
        {
          "id": "CKR",
          "name": "Kepulauan Riau"
        },
        {
          "id": "CLG",
          "name": "Lampung"
        },
        {
          "id": "CRU",
          "name": "Riau"
        },
        {
          "id": "CSB",
          "name": "Sumatera Barat"
        },
        {
          "id": "CGT",
          "name": "Gorontalo"
        },
        {
          "id": "CSK",
          "name": "Sulawesi Barat"
        },
        {
          "id": "CSS",
          "name": "Sumatera Selatan"
        },
        {
          "id": "CSG",
          "name": "Sulawesi Tengah"
        },
        {
          "id": "CST",
          "name": "Sulawesi Tenggara"
        },
        {
          "id": "CSR",
          "name": "Sulawesi Utara"
        },
        {
          "id": "CML",
          "name": "Maluku"
        },
        {
          "id": "CMU",
          "name": "Maluku Utara"
        },
        {
          "id": "CPB",
          "name": "Papua Barat"
        },
        {
          "id": "CKB",
          "name": "Kalimantan Barat"
        },
        {
          "id": "CKS",
          "name": "Kalimantan Selatan"
        },
        {
          "id": "CKG",
          "name": "Kalimantan Tengah"
        },
        {
          "id": "CKT",
          "name": "Kalimantan Timur"
        },
        {
          "id": "CKU",
          "name": "Kalimantan Utara"
        },
        {
          "id": "CBL",
          "name": "Bali"
        },
        {
          "id": "CNB",
          "name": "Nusa Tenggara Barat"
        },
        {
          "id": "CNT",
          "name": "Nusa Tenggara Timur"
        }
      ],
      province: null,
      provinceList: [],
      kotkab: null,
      listKotkab: [],
      listKecamatan: [],
      isUseVideo: false,
    }
  },
  watch: {
    isUseVideo(val) {
      if (!val) {
        this.$parent.$parent.useVideo = false
      }
    },
  },
  mounted() {
    this.$axios
      .$get(this.$baseUrlNdf + '/cgms/weather/province')
      .then((res) => {
        this.provinceList = res.data
        // alert(this.$parent.$parent.useVideo)
        if (this.$parent.$parent.useVideo) {
          this.isUseVideo = true
        } else {
          this.isUseVideo = false
        }
      })

    if (this.$parent.$parent.useFooter) {
      if (this.$parent.$parent.useFooter.id && this.$parent.$parent.useFooter.id.length > 3) {
        var split = this.$parent.$parent.useFooter.name.split(' ')
        this.runningtextData = {
          id: this.$parent.$parent.useFooter.id[0] + this.$parent.$parent.useFooter.id[1] + this.$parent.$parent.useFooter.id[2],
          name: split[split.length - 2] + ' ' + split[split.length - 1],
        }
      } else {
        this.runningtextData = this.$parent.$parent.useFooter
      }
    }

    this.$axios
      .post(`${this.$baseUrlNdf}/cgms/weather/forward`, {
        url: 'https://warningcuaca.bmkg.go.id/cap/xml/id/newsflash.xml',
      })
      .then((res) => {
        const json = xml.parse(res.data)
        var dataparsed = json[0].children[0].children
        var index = json[0].children[0].children.length - 1
        console.log(dataparsed)
        var listParsedArray = dataparsed[index].children
        this.listGempa.length = 0
        listParsedArray.forEach((item) => {
          // this.runningText.push(item.text)
          // if (item.children[0].children[0].includes('CBB')) {
          this.listGempa.push({
            name: item.children[3].children[0],
            id: item.children[0].children[0],
          })
          // }
        })
      })
  },
  methods: {
    changeFooter(val) {
      this.$parent.$parent.useFooter = val
    },
    getProvinsi() {
      this.$axios
        .$get(
          this.$baseUrlNdf + '/cgms/weather/administration/kotkab?_id=' +
          this.province._id
        )
        .then((res) => {
          this.listKotkab = res.data
          // this.kotkab = this.listKotkab[0]
        })
    },
    getKecamatan() {
      this.$axios
        .get(
          `${this.$baseUrlNdf}/get?locationId=` +
          this.kotkab._id
        )
        .then((res) => {
          this.listKecamatan = res.data
        })
    },
    changeSelected() {
      // console.log(this.province)
      this.getProvinsi()
    },
    changeSelectedKotkab() {
      this.getKecamatan()
    },
    changeSelectedKecamatan() {
      //
      // this.$parent.$parent.useVideo =
    },
  },
}
</script>