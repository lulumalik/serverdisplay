<template>
  <div class="overflow-hidden h-screen w-screen">
    <client-only>
      <VueSlickCarousel v-if="templates.length > 0" :autoplay="true" :autoplaySpeed="speed">
        <template slot="prevArrow">
          <div></div>
        </template>
        <template slot="nextArrow">
          <div></div>
        </template>
        <div
          v-for="(obj, i) in templates"
          :key="i"
          class="h-screen w-screen overflow-hidden relative"
          :style="background[i]"
        >
          <BackgroundVideo v-if="obj.properties.video !== null" />
          <ShowLayout
            ref="layout"
            id="layout"
            :obj="obj"
            :widgetDB="widget"
            :layoutDB="layoutDB"
            style="transform-origin: 0 0"
            :dataid="obj._id"
            :production="true"
            :indexLoop="i"
            :location="location"
            :allNDF="allNDF"
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
  props: {
    withrouter: {
      type: Boolean,
      default: false,
    },
  },
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
      widget: [],
      layoutDB: {},
      allNDF: {},
      speed: 5000
    }
  },
  async mounted() {
    var res;
    if (this.withrouter) {
      if (!this.$cookies.get('displayprod')) {
        alert('display not found')
        this.$router.push('/')
      }
      res = await this.$axios.$post('display/login', {
        username: this.$cookies.get('displayprod')
      })
    } else {
      res = await this.$axios.$get(
        'display/find/' + (this.withrouter ? this.$cookies.get('displayprod') : this.$route.params.displayid)
      )
    }
    const res1 = await this.$axios.$get('widget')
    this.widget = res1.data

    const res2 = await this.$axios.$get('layout')
    res2.data.forEach((data) => {
      this.$set(this.layoutDB, data._id, data.name)
    })

    if (res.data.properties.delay) {
        this.speed = res.data.properties.delay * 1000
    }

    res.data.template.forEach(async (el, i) => {
      // console.log(el.properties.widgetndf)
      if (el.properties.widgetndf) {
        el.properties.widgetndf.forEach(async (el2) => {
          if (el2.key.split('_')[2] == 'subdistrict') {
            this.allNDF[el2.value.ndf] = []
            this.$store.commit('ndfData/mutationNDF', {
              key: el2.value.ndf,
              value: [],
            })
          } else if (el2.key == '_WidgetOfsStatic') {
            const modelrun = await this.$axios.get(
              'https://pusmar.id/api21/modelrun'
            )
            this.$store.commit('maritimData/mutationData', {
              key: 'modelrun',
              value: modelrun.data,
            })
          }
        })
      }
      if (el.backgroundImage) {
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
        // console.log(el.properties.video)
        if (el.properties.video) {
          this.background[i] = 'transparent'
        } else {
          this.background[i] = el.properties.background
        }
      }
    })

    for (var key in this.allNDF) {
      const ndf = await this.$axios.$get(
        'https://api.gis.co.id/api/cgms/weather/ndf/get?locationId=' + key
      )
      this.$store.commit('ndfData/mutationNDF', {
        key: key,
        value: ndf.data,
      })
    }

    this.templates = res.data.template

    this.location = res.data.location
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