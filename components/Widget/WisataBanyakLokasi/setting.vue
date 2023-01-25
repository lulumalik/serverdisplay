<template>
  <div>
    <div>
      <div>Provinsi</div>
      <div>
        <v-select
          label="provinsi"
          @option:selected="changeSelected"
          v-model="province"
          :options="$parent.province"
        ></v-select>
      </div>
    </div>
    <div
      v-for="index in 4"
      :key="index"
      class="mt-4"
    >
      <div class="font-bold text-xl">Lokasi {{ index }}</div>
      <div v-if="province">
        <div class="mt-2 flex items-center">
          <div class="flex-grow">Kotkab</div>
        </div>
        <div>
          <v-select
            label="kotkab"
            @option:selected="changeSelectedKotkab(index)"
            v-model="kotkab[index]"
            :options="listKotkab"
          ></v-select>
        </div>
      </div>
      <div v-if="kotkab">
        <div class="mt-2">Kecamatan</div>
        <div>
          <v-select
            label="subdistrict"
            @option:selected="changeSelectedKecamatan(index)"
            v-model="kecamatan[index]"
            :options="listKecamatan"
          ></v-select>
        </div>
      </div>
      <div class="mt-2">Name of location</div>
      <div>
        <input
          type="text"
          class="px-2 py-1.5 w-full border border-gray-300 rounded"
          @input="changeName(index)"
          v-model="name[index]"
          placeholder="name place"
        />
      </div>
      <div class="mt-2">Image Background URL</div>
      <div>
        <input
          type="text"
          class="px-2 py-1.5 w-full border border-gray-300 rounded"
          @input="changeImg(index)"
          v-model="img[index]"
          placeholder="name place"
        />
      </div>
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
    getKecamatan(index) {
      this.$axios
        .get(
          `${this.$baseUrlNdf}/cgms/weather/ndf/get?locationId=` +
            this.kotkab[index]._id
        )
        .then((res) => {
          this.listKecamatan = res.data
        })
    },
    changeSelected() {
      // console.log(this.province)
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBanyakLokasi_province',
        value: this.province,
      })
      this.getProvinsi()
    },
    changeSelectedKotkab(index) {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBanyakLokasi_kotkab' + index,
        value: this.kotkab[index],
      })
      this.getKecamatan(index)
    },
    changeSelectedKecamatan(index) {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBanyakLokasi_kecamatan' + index,
        value: this.kecamatan[index],
      })
    },
    changeName(index) {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBanyakLokasi_name' + index,
        value: this.name[index],
      })
    },
    changeImg(index) {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBanyakLokasi_img' + index,
        value: this.img[index],
      })
    },
  },
  mounted() {
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBanyakLokasi_province'
      ]
    ) {
      this.province =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBanyakLokasi_province'
        ]
    }
    var arr = 5

    this.getProvinsi()
    for (let index = 1; index < arr; index++) {
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBanyakLokasi_kotkab' + index
        ]
      ) {
        this.kotkab[index] =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWisataBanyakLokasi_kotkab' + index
          ]

        this.getKecamatan(index)
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBanyakLokasi_kecamatan' + index
        ]
      ) {
        this.kecamatan[index] =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWisataBanyakLokasi_kecamatan' + index
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBanyakLokasi_name' + index
        ]
      ) {
        this.name[index] =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWisataBanyakLokasi_name' + index
          ]
      }
      if (
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBanyakLokasi_img' + index
        ]
      ) {
        this.img[index] =
          this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetWisataBanyakLokasi_img' + index
          ]
      }
    }
  },
  data() {
    return {
      province: null,
      kotkab: {},
      kecamatan: {},
      name: {},
      img: {},
      listKotkab: [],
      listKecamatan: [],
    }
  },
}
</script>
  