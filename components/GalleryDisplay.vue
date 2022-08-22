<template>
  <div class="overflow-hidden h-screen w-screen relative">
    <client-only>
      <agile
        v-if="templates.length > 0"
        :dots="false" :infinite="true" :autoplay="true" :autoplay-speed="speed" :navButtons="false" :mobileFirst="false"
      >
        <div
          v-for="(obj, i) in templates"
          :key="i"
          class="h-screen w-screen overflow-hidden relative slide"
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
            :production="true"
            :indexLoop="i"
            :location="location"
            :allNDF="allNDF"
            :responseDisplay="responseDisplay"
          />
        </div>
      </agile>

      <FooterTemplate
        :nodrag="true"
        ref="footer"
        v-if="useFooter"
        :class="'overflow-hidden fixed bottom-0 w-full'"
      />
    </client-only>
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
      speed: 5000,
      responseDisplay: {},
      useFooter: false,
    }
  },
  async mounted() {
    var res
    try {
      // if (this.withrouter) {
        if (!this.$route.params.displayid) {
          alert('display not found')
          this.$router.push('/')
        }
        res = await this.$axios.$post('display/login', {
          username: this.$route.params.displayid,
        })
      // } else {
      //   res = await this.$axios.$get(
      //     'display/find/' +
      //       (this.withrouter
      //         ? this.$cookies.get('displayprod')
      //         : this.$route.params.displayid)
      //   )
      // }
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
    if (res.data.properties.delay) {
      this.speed = res.data.properties.delay * 1000
    }

    if (res.data.properties.footer) {
      this.useFooter = res.data.properties.footer
    }
    var alltemplate  = res.data.properties.allTemplate
    var allsetting = res.data.properties.allSetting
    var arr = []

    // console.log(res.data.properties)
    for(var key in alltemplate) {
        arr.push(alltemplate[key])
        
        allsetting[alltemplate[key].idtemplate].forEach(async (el2) => {

          if (el2.key.split('_')[2] == 'subdistrict') {
            this.allNDF[el2.value.ndf] = []
            this.$store.commit('ndfData/mutationNDF', {
              key: el2.value.ndf,
              value: [],
            })
          } else if (el2.key.split('_')[2] == 'arrayNDF') {
            el2.value.value.forEach(async (el3) => {
              this.allNDF[el3.ndf] = []
              this.$store.commit('ndfData/mutationNDF', {
                key: el3.ndf,
                value: [],
              })
            })
          } else if (el2.key.split('_')[1] == '_WidgetOfsStatic') {
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
    res.data.template.forEach(async (el, i) => {
      // console.log(el.properties.widgetndf)
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
          this.background[i] = {
            backgroundColor: el.properties.background,
          }
        }
      }
    })

    // for (var key in this.allNDF) {
    //   const ndf = await this.$axios.$get(
    //     'https://api.gis.co.id/api/cgms/weather/ndf/get?locationId=' + key
    //   )
    //   this.$store.commit('ndfData/mutationNDF', {
    //     key: key,
    //     value: ndf.data,
    //   })
    // }
    const ndf2 = await this.$axios.$post(
      'https://api.gis.co.id/api/cgms/weather/ndf/getMany',
      {
        location: Object.keys(this.allNDF),
        date: new Date().toISOString(),
      }
    )
    ndf2.data.forEach((el) => {
        this.$store.commit('ndfData/mutationNDF', {
          key: el.location.locationId,
          value: {
            isPush: true,
            data: el,
          },
        })
    })

    this.$emit('finishloading', true)

    this.templates = arr

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