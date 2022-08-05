<template>
  <div>
    <client-only>
      <VueSlickCarousel v-if="templates.length > 0">
        <template slot="prevArrow">
          <div></div>
        </template>
        <template slot="nextArrow">
          <div></div>
        </template>

        <div
          v-for="(obj, i) in templates"
          :key="i"
          class="h-screen w-screen overflow-hidden"
          :style="background[i]"
        >
          <ShowLayout
            ref="layout"
            id="layout"
            :obj="obj"
            style="transform-origin: 0 0"
            :dataid="obj._id"
            :production="true"
            :indexLoop="i"
            :location="location"
          />
        </div>
      </VueSlickCarousel>
    </client-only>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
  components: { VueSlickCarousel },
  data() {
    return {
      listWidget: {},
      templates: [],
      location: {},
      scale: 1,
      translationX: 0,
      translationY: 0,
      scaleX: 1,
      scaleY: 1,
      background: [],
    }
  },
  async mounted() {
    const res = await this.$axios.$get(
      'display/find/' + this.$route.params.displayid
    )
    res.data.template.forEach((el, i) => {
      // console.log(el)
      if (!el.properties.background) {
        this.background[i] = {
          'background-image':
            'url(' +
            this.$axios.defaults.baseURL +
            el.backgroundImage.replace('/api/', '') +
            ')',
          'background-size': 'cover',
          'background-position': 'center',
          'background-repeat': 'no-repeat',
        }
      } else {
        this.background[i] = el.properties.background
      }
    })

    this.templates = res.data.template

    this.location = res.data.location
  },
  methods: {
    getBackground(i) {
      var obj
      if (this.background[i].length > 7) {
        obj = {
          'background-image':
            'url(' + this.$axios.defaults.baseURL + el.backgroundImage + ')',
          'background-size': 'cover',
          'background-position': 'center',
          'background-repeat': 'no-repeat',
        }
      } else {
        obj = {
          background: this.background[i],
        }
      }
      return obj
    },
  },
  computed: {
    getScreenConfig() {
      if (this.$vssWidth >= 1920) {
        return 1.35
      } else {
        return 1
      }
    },
  },
}
</script>