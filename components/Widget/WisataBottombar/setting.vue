<template>
  <div>
    <div>Province</div>
    <div>
      <v-select
        label="name"
        @option:selected="changeSelected"
        v-model="province"
        :options="listProvinsi"
      ></v-select>
    </div>
    <div class="mt-2">Sub District</div>
    <div>
      <v-select
        label="location"
        @option:selected="changeSelectedSub"
        v-model="subdistrict"
        :options="listKecamatan"
      ></v-select>
    </div>
    <div class="mt-2">Name of location</div>
    <div>
      <input
        type="text"
        class="px-2 py-1.5 w-full border border-gray-300 rounded"
        @input="changeName"
        v-model="name"
        placeholder="name place"
      />
    </div>
    <div class="mt-2">Description</div>
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
    </div>
    <!-- changeImg -->
    <div class="mt-2">Image Background URL</div>
    <div>
      <input
        type="text"
        class="px-2 py-1.5 w-full border border-gray-300 rounded"
        @input="changeImg"
        v-model="img"
        placeholder="name place"
      />
    </div>
    <div class="mt-2">Color</div>
    <div>
      <input
        type="color"
        class="px-2 py-1.5 w-full border border-gray-300 rounded"
        @change="changeColor"
        v-model="color"
        placeholder="name place"
      />
    </div>
    <div class="mt-2">Background Color</div>
    <div>
      <input
        type="color"
        class="px-2 py-1.5 w-full border border-gray-300 rounded"
        @change="changeBackground"
        v-model="backgroundColor"
        placeholder="name place"
      />
    </div>
  </div>
</template>
<script>
import { dataStatic } from '../../../utils/listStatic.js'
export default {
  props: {
    idTemplate: {
      default: () => {
        return ''
      },
    },
  },
  methods: {
    changeSelected() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBottombar_province',
        value: this.province,
      })
    },
    changeSelectedSub() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBottombar_subdistrict',
        value: this.subdistrict,
      })
    },
    changeDesc() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBottombar_description',
        value: this.desc,
      })
    },
    changeName() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBottombar_name',
        value: this.name,
      })
    },
    changeBackground() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBottombar_background',
        value: this.backgroundColor,
      })
    },
    changeColor() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBottombar_color',
        value: this.color,
      })
    },
    changeImg() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetWisataBottombar_img',
        value: this.img,
      })
    },
  },
  mounted() {
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombar_province'
      ]
    ) {
      this.province =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombar_province'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombar_subdistrict'
      ]
    ) {
      this.subdistrict =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombar_subdistrict'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombar_description'
      ]
    ) {
      this.desc =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombar_description'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombar_name'
      ]
    ) {
      this.name =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombar_name'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombar_color'
      ]
    ) {
      this.color =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombar_color'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombar_background'
      ]
    ) {
      this.backgroundColor =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombar_background'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetWisataBottombar_img'
      ]
    ) {
      this.img =
        this.$store.state.displayWidget.widgetSaved[
          this.idTemplate + '_WidgetWisataBottombar_img'
        ]
    }
  },
  data() {
    return {
      province: '',
      subdistrict: '',
      desc: '',
      name: '',
      color: '#000000',
      backgroundColor: '#ffffff',
      img: '',
      listProvinsi: [
        {
          name: 'Kepulauan Bangka Belitung',
        },
      ],
      listKecamatan: dataStatic,
    }
  },
}
</script>
