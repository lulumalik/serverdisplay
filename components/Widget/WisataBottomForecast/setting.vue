<template>
  <div>
    <div>
      <div>Provinsi</div>
      <div>
        <v-select label="provinsi" @option:selected="changeSelected" v-model="province"
          :options="$parent.province"></v-select>
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
          <v-select label="subdistrict" @option:selected="changeSelectedKecamatan" v-model="kecamatan"
            :options="listKecamatan"></v-select>
        </div>
      </div>
    </div>
    <div class="mt-2">Name of location</div>
    <div>
      <input type="text" class="px-2 py-1.5 w-full border border-gray-300 rounded" @input="changeName" v-model="name"
        placeholder="name place" />
    </div>
    <!-- <div class="mt-2">Description</div>
    <div>
      <textarea
        name="desc"
        v-model="desc"
        class="border border-gray-300 rounded p-2"
        placeholder="input description here"
        @input="changeDesc"
        id="desc"
        cols="30"
        rows="10"
      ></textarea>
    </div> -->
    <!-- changeImg -->
    <div class="mt-2">Image Background URL</div>
    <div>

      <ChooseLogo v-if="chooseLogo" @url="changeImg" :emitonly="true" />

      <div @click="chooseLogo = true" class="cursor-pointer">
        <img @error="handleImageError" class="rounded-md border-4 mb-1 border-white shadow-md cursor-pointer" :src="img.includes('/api/') ? $axios.defaults.baseURL +
          img.split('/api/')[1] : img" style="width: 200px;" />
        <input disabled type="text" class="px-2 py-1.5 w-full border border-gray-300 rounded" @input="changeImg"
          v-model="img" placeholder="name place" />
      </div>
    </div>
    <div class="mt-2">Color</div>
    <div>
      <input type="color" class="px-2 py-1.5 w-full border border-gray-300 rounded" @change="changeColor" v-model="color"
        placeholder="name place" />
    </div>
    <div class="mt-2">Background Color</div>
    <div>
      <input type="color" class="px-2 py-1.5 w-full border border-gray-300 rounded" @change="changeBackground"
        v-model="backgroundColor" placeholder="name place" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    idTemplate: {
      default: () => {
        return ''
      },
    },
  },
  methods: {
    handleImageError(event) {
      event.target.src = '/plus.png';
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
          `${this.$baseUrlNdf}/cgms/weather/ndf/location?_id=` +
          this.kotkab._id
        )
        .then((res) => {
          this.listKecamatan = res.data.data
        })
    },
    changeSelected() {
      // console.log(this.province)
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBottombarForecast_province',
        value: this.province,
      })
      this.getProvinsi()
    },
    changeSelectedKotkab() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBottombarForecast_kotkab',
        value: this.kotkab,
      })
      this.getKecamatan()
    },
    changeSelectedKecamatan() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBottombarForecast_kecamatan',
        value: this.kecamatan,
      })
    },
    changeDesc() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBottombarForecast_description',
        value: this.desc,
      })
    },
    changeName() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBottombarForecast_name',
        value: this.name,
      })
    },
    changeBackground() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBottombarForecast_background',
        value: this.backgroundColor,
      })
    },
    changeColor() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBottombarForecast_color',
        value: this.color,
      })
    },
    changeImg(img) {
      // this.$store.commit('displayWidget/mutationWidget', {
      //   key: this.idTemplate + '_WidgetWisataBottombarForecast_img',
      //   value: this.img,
      // })
      this.chooseLogo = false
      this.img = img
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBottombarForecast_img',
        value: img,
      })
    },
  },
  mounted() {
    if (
      this.$store.state.displayWidget.widgetSaved[
      this.idTemplate + '_WidgetWisataBottombarForecast_province'
      ]
    ) {
      this.province =
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombarForecast_province'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
      this.idTemplate + '_WidgetWisataBottombarForecast_kotkab'
      ]
    ) {
      this.kotkab =
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombarForecast_kotkab'
        ]
      this.getProvinsi()
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
      this.idTemplate + '_WidgetWisataBottombarForecast_kecamatan'
      ]
    ) {
      this.kecamatan =
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombarForecast_kecamatan'
        ]
      this.getKecamatan()
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
      this.idTemplate + '_WidgetWisataBottombarForecast_description'
      ]
    ) {
      this.desc =
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombarForecast_description'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
      this.idTemplate + '_WidgetWisataBottombarForecast_name'
      ]
    ) {
      this.name =
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombarForecast_name'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
      this.idTemplate + '_WidgetWisataBottombarForecast_color'
      ]
    ) {
      this.color =
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombarForecast_color'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
      this.idTemplate + '_WidgetWisataBottombarForecast_background'
      ]
    ) {
      this.backgroundColor =
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombarForecast_background'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
      this.idTemplate + '_WidgetWisataBottombarForecast_img'
      ]
    ) {
      this.img =
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombarForecast_img'
        ]
    }
  },
  data() {
    return {
      province: null,
      kotkab: null,
      kecamatan: null,
      desc: '',
      name: '',
      color: '#000000',
      backgroundColor: '#ffffff',
      img: '/plus.png',
      listKotkab: [],
      listKecamatan: [],
      chooseLogo: false
    }
  },
}
</script>
