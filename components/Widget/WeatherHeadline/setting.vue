<template>
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
    <div v-if="province">
      <div class="mt-2 flex items-center">
        <div class="flex-grow">Kotkab</div>
      </div>
      <div>
        <v-select
          label="kotkab"
          @option:selected="changeSelectedKotkab"
          v-model="kotkab"
          :options="listKotkab"
        ></v-select>
      </div>
    </div>
    <div v-if="kotkab">
      <div class="mt-2">Kecamatan</div>
      <div>
        <v-select
          label="subdistrict"
          @option:selected="changeSelectedKecamatan"
          v-model="kecamatan"
          :options="listKecamatan"
        ></v-select>
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
    getKecamatan() {
      this.$axios
        .get(
          `${this.$baseUrlNdf}/cgms/weather/ndf/get?locationId=` +
            this.kotkab._id
        )
        .then((res) => {
          this.listKecamatan = res.data
        })
    },
    changeSelected() {
      // console.log(this.province)
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWeatherHeadline_province',
        value: this.province,
      })
      this.getProvinsi()
    },
    changeSelectedKotkab() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWeatherHeadline_kotkab',
        value: this.kotkab,
      })
      this.getKecamatan()
    },
    changeSelectedKecamatan() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWeatherHeadline_kecamatan',
        value: this.kecamatan,
      })
    },
  },
  async mounted() {
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWeatherHeadline_province'
      ]
    ) {
      this.province =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWeatherHeadline_province'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWeatherHeadline_kotkab'
      ]
    ) {
      this.kotkab =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWeatherHeadline_kotkab'
        ]
      this.getProvinsi()
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWeatherHeadline_kecamatan'
      ]
    ) {
      this.kecamatan =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWeatherHeadline_kecamatan'
        ]
      this.getKecamatan()
    }
  },
  data() {
    return {
      province: null,
      kotkab: null,
      kecamatan: null,
      kotkabonly: false,
      listKotkab: [],
      listKecamatan: [],
    }
  },
}
</script>
