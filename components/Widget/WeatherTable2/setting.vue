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
        .get(
          'https://weather.circlegeo.com/api/cgms/weather/administration/kotkab?_id=' +
            this.province._id
        )
        .then((res) => {
          this.listKotkab = res.data.data
          // this.kotkab = this.listKotkab[0]
        })
    },
    changeSelected() {
      // console.log(this.province)
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWeatherTable2_province',
        value: this.province,
      })
      this.getProvinsi()
    },
    changeSelectedKotkab() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWeatherTable2_kotkab',
        value: this.kotkab,
      })
    },
  },
  async mounted() {
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWeatherTable2_province'
      ]
    ) {
      this.province =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWeatherTable2_province'
        ]

      this.getProvinsi()
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWeatherTable2_kotkab'
      ]
    ) {
      this.kotkab =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWeatherTable2_kotkab'
        ]
    }
  },
  data() {
    return {
      province: null,
      kotkab: null,
      listKotkab: [],
    }
  },
}
</script>
