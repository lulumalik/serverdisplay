<template>
  <div>
    <div v-if="!responseDisplay.status">
      <AnimatedBG />
    </div>
    <div
      v-else
      class="overflow-hidden h-screen w-screen relative"
      :style="{ backgroundImage: 'url(' + backgroundStatic + ')', backgroundSize: 'cover' }"
    >
      <client-only>
        <div
          class="h-full w-full overflow-hidden fixed left-0"
          style="z-index: 0"
          v-if="
          responseDisplay.properties &&
          responseDisplay.properties.video
        "
        >
          <BackgroundVideo />
        </div>
        <carousel
          v-if="templates.length > 0"
          :autoPlay="true"
          :playSpeed="speed"
          :wheelControl="false"
          :hoverPause="false"
          style="height: 100vw !important; width: 100vw !important"
          ref="carousel"
        >
          <carouselitem
            v-for="(obj, i) in templates"
            :key="i"
            class="overflow-hidden h-screen w-screen relative"
            :style="background[i]"
          >
            <Dummy
              ref="dummy"
              :logos="logos"
            >
              <ShowLayout
                @splice="splicing"
                ref="layout"
                id="layout"
                :obj="obj"
                :widgetDB="widget"
                :layoutDB="layoutDB"
                style="transform-origin: 0 0"
                :production="true"
                :indexLoop="i"
                :location="location"
                :allNDF="allNDF"
                :responseDisplay="responseDisplay"
              />
            </Dummy>
          </carouselitem>
        </carousel>

        <FooterTemplate
          :nodrag="true"
          ref="footer"
          v-if="useFooter"
          style="background: rgba(0, 0, 0, 0.5) !important"
          :class="'overflow-hidden fixed bottom-0 w-full'"
        />
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    withrouter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      skipSlide: {},
      listWidget: {},
      templates: [],
      location: {},
      scale: 1,
      translationX: 0,
      translationY: 0,
      scaleX: 1,
      scaleY: 1,
      background: [],
      backgroundStatic: null,
      widget: [],
      layoutDB: {},
      allNDF: {},
      speed: 5000,
      responseDisplay: {},
      useFooter: false,
      interval: {},
      timeoutgetdata: null,
      getDataAgain: false,
      logos: {},
    }
  },
  async mounted() {
    process.nextTick(() => {
      this.getData()
    })
    // setInterval(() => {
    // alert('ea')
    // this.getData()
    // }, 3600000)
  },
  watch: {
    getDataAgain(val) {
      // console.log(val)
      this.getData(Object.values(this.skipSlide))
    },
  },
  methods: {
    next() {
      this.$refs.carousel.slideNext()
    },
    testImage(URL) {
      var tester = new Image()
      tester.onload = this.imageFound
      tester.src = URL
    },
    imageFound(e) {
      var img = e.path[0].currentSrc
      if (this.interval[img]) {
        clearInterval(this.interval[img])
        delete this.interval[img]
        delete this.skipSlide[img]
        this.getData(Object.values(this.skipSlide))
      }
    },
    splicing(obj) {
      this.skipSlide[obj.hide] = obj.id
      if (this.interval[obj.hide]) {
        clearInterval(this.interval[obj.hide])
      }
      clearTimeout(this.timeoutgetdata)
      this.timeoutgetdata = setTimeout(() => {
        //   // if (t) {
        // console.log('ea')
        // this.getDataOuter(obj)
        this.getDataAgain = true
        // this.getData(Object.values(this.skipSlide))
        //   // }
      }, 3000)
      this.interval[obj.hide] = setInterval(() => {
        this.testImage(obj.hide)
      }, 60000)
    },
    async getData(id) {
      this.$store.commit('ndfData/emptyNDF')
      this.$store.commit('maritimData/emptyData')
      this.templates.length = 0
      var res
      try {
        if (!this.$route.params.displayid) {
          alert('display not found')
          this.$router.push('/')
        }
        res = await this.$axios.$post('display/login', {
          username: this.$route.params.displayid,
        })
      } catch (error) {
        console.log(error.response)
      }
      if (!res) {
        this.$cookies.remove('displayprod')
        alert('display not found')
        this.$router.go(0)
      }
      const res1 = await this.$axios.$get('widget')
      this.widget = res1.data
      const res2 = await this.$axios.$get('layout')
      res2.data.forEach((data) => {
        this.$set(this.layoutDB, data._id, data.name)
      })
      this.responseDisplay = res.data
      if (res.data.properties.allLogo) {
        this.logos = res.data.properties.allLogo
      }
      if (res.data.properties.delay) {
        this.speed = res.data.properties.delay * 1000
      }
      if (res.data.properties.footer) {
        this.useFooter = res.data.properties.footer
      }
      var alltemplate = res.data.properties.allTemplate
      var allsetting = res.data.properties.allSetting
      var arr = []
      // console.log(res.data.properties)
      if (id && id.length > 0) {
        var obj = {}
        for (var key in alltemplate) {
          obj[alltemplate[key].idtemplate] = alltemplate[key]
        }
        // for (var kunci in id) {
        //   if (obj[kunci]) {
        //     delete obj[kunci]
        //   }
        // }
        id.forEach((el) => {
          if (obj[el]) {
            delete obj[el]
          }
        })
        // console.log(obj)
        for (var key2 in obj) {
          arr.push(obj[key2])
        }
      } else {
        for (var key in alltemplate) {
          arr.push(alltemplate[key])
        }
      }
      // console.log(this.responseDisplay.properties.video);
      if (
        this.responseDisplay.properties.backgroundStatic &&
        !this.responseDisplay.properties.video
      ) {
        this.backgroundStatic = this.responseDisplay.properties.backgroundStatic
      }
      res.data.template.forEach(async (el, i) => {
        // console.log(el.properties.widgetndf)
        // if (el.backgroundImage) {
        //   this.background[i] = {
        //     'background-image':
        //       'url(' +
        //       this.$axios.defaults.baseURL +
        //       el.backgroundImage.replace('/api/', '') +
        //       ')',
        //     'background-size': 'initial',
        //     width: '100%',
        //     height: '100%',
        //   }
        // } else {
        // console.log(el.properties.video)
        // if (el.properties.video) {
        //   this.background[i] = {
        //     backgroundColor: 'transparent',
        //   }
        // } else {
        this.background[i] = {
          backgroundColor: 'transparent', //el.properties.background,
        }
        // }
        // }
      })
      this.$emit('finishloading', true)
      this.templates = arr
      this.location = res.data.location
    },
  },
}
</script>