<template>
  <div>
    <div>
      <div>Bandara</div>
      <div>
        <v-select label="Name" @option:selected="changeSelected" v-model="bandara" :options="listBandara"></v-select>
      </div>
    </div>
    <div class="mt-2">Name of location</div>
    <div>
      <input type="text" class="px-2 py-1.5 w-full border border-gray-300 rounded" @input="changeName" v-model="name"
        placeholder="name place" />
    </div>
    <div class="mt-2">Description</div>
    <div>
      <textarea name="desc" v-model="desc" class="border border-gray-300 rounded p-2" placeholder="input description here"
        @input="changeDesc" id="desc" cols="30" rows="10"></textarea>
    </div>
    <!-- changeImg -->
    <div class="mt-2">Image Background URL</div>
    <div>

      <ChooseLogo v-if="chooseLogo" @url="changeImg"  :emitonly="true" />

      <div @click="chooseLogo = true" class="cursor-pointer">
        <img @error="handleImageError" class="rounded-md border-4 mb-1 border-white shadow-md cursor-pointer"  :src="img.includes('/api/') ? $axios.defaults.baseURL +
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
import { bandara } from '../../../utils/listBandara.js'
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
    changeSelected() {
      // console.log(this.province)
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetVisilibity_bandara',
        value: this.bandara,
      })
    },
    changeDesc() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetVisibility_description',
        value: this.desc,
      })
    },
    changeName() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetVisibility_name',
        value: this.name,
      })
    },
    changeBackground() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetVisibility_background',
        value: this.backgroundColor,
      })
    },
    changeColor() {
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetVisibility_color',
        value: this.color,
      })
    },
    changeImg(img) {
      this.chooseLogo = false
      this.img = img
      this.$store.commit('displayWidget/mutationWidget', {
        key: this.idTemplate + '_WidgetVisibility_img',
        value: img,
      })
    },
  },
  mounted() {
    if (
      this.$store.state.displayWidget.widgetSaved[
      this.idTemplate + '_WidgetVisilibity_bandara'
      ]
    ) {
      this.bandara =
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetVisilibity_bandara'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
      this.idTemplate + '_WidgetVisibility_description'
      ]
    ) {
      this.desc =
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetVisibility_description'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
      this.idTemplate + '_WidgetVisibility_name'
      ]
    ) {
      this.name =
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetVisibility_name'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
      this.idTemplate + '_WidgetVisibility_color'
      ]
    ) {
      this.color =
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetVisibility_color'
        ]
    }
    if (
      this.$store.state.displayWidget.widgetSaved[
      this.idTemplate + '_WidgetVisibility_background'
      ]
    ) {
      this.backgroundColor =
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetVisibility_background'
        ]
    }
    // console.log(this.$store.state.displayWidget.widgetSaved, )
    if (
      this.$store.state.displayWidget.widgetSaved[
      this.idTemplate + '_WidgetVisibility_img'
      ]
    ) {
      this.img =
        this.$store.state.displayWidget.widgetSaved[
        this.idTemplate + '_WidgetVisibility_img'
        ]
    }
  },
  data() {
    return {
      bandara: null,
      desc: '',
      name: '',
      color: '#000000',
      backgroundColor: '#ffffff',
      img: '/plus.png',
      listBandara: bandara,
      chooseLogo: false
    }
  },
}
</script>
