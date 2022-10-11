<template>
  <div class="relative" :class="!production ? 'border-2 border-white' : ''">
    <ChooseLogo v-if="chooseLogo" />
    <HeaderTemplate
      ref="header"
      :class="
        production
          ? 'z-50 w-screen fixed top-0 px-8 py-2'
          : 'fixed top-0 w-full px-8 py-2 left-0'
      "
      v-if="useHeader"
      :nodrag="$route.name == 'display-create' ? false : true"
    />
           <!-- style="transform-origin: top center"
        :style="{
          transform: 'scale(' + scaleinner + ')',
        }" -->
    <div :class="useHeader ? 'top-32' : ''" class="baseBrowser relative mx-auto">
      <div
        style="transform-origin: top center"
        :style="{
          transform: 'scale(' + scaleinner + ')',
        }"
        class=""
      >
        <div class="mx-auto w-full h-full">
          <component
            ref="dynamic"
            class=""
            :nodrag="true"
            v-if="!rerender"
            :is="selectedTemplate"
            :selectedCategory="selectedCategory"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    responseDisplay:{
      default: () => {
        return {}
      },
    },
    displayName: {
      default: () => {
        return '-';
      }
    },
    production: {
      default: () => {
        return false
      },
    },
    obj: {
      default: () => {
        return {}
      },
    },
    indexLoop: {
      default: () => {
        return 0
      }
    },
    location: {
      default: () => {
        return false
      }
    },
    widgetDB: {
      default: () => {
        return []
      }
    },
    layoutDB: {
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
      rerender: false,
      selectedCategory: 'Maritim',
      selectedTemplate: 'Layout_1',
      saving: false,
      templatename: '',
      backgroundColor: '#ffffff',
      useHeader: true,
      useFooter: false,
      runningText: '',
      times: 60,
      scaleinner: 1,
      listTemplate: {},
      widget: [],
      currentId: null,
      chooseLogo:false,
    }
  },
  async mounted() {
    this.widget = this.widgetDB
    this.getComp(this.obj)
  },
  methods: {
    spliceSlide(url) {
      // console.log()
      this.$emit('splice', {
        id: this.obj.idtemplate,
        hide: url
      })
    },
    getComp(obj) {
      this.listTemplate = obj
      var self = this
      this.rerender = true
      // console.log(this.layoutDB[obj.component.layout])
      this.selectedTemplate =
        this.layoutDB[
          obj.component.layout._id
            ? obj.component.layout._id
            : obj.component.layout
        ]
      this.selectedCategory = obj.category.name
      this.backgroundColor = obj.properties.background
        ? obj.properties.background
        : this.$axios.defaults.baseURL + obj.backgroundImage.split('/api/')[1]
      this.$emit('background', {
        bg: this.backgroundColor,
        i: this.indexLoop
      })

      this.scaleinner = obj.properties.scale
      this.$emit('scale' , {
        scale: obj.properties.scale,
        i: this.indexLoop
      })
      
      this.templatename = obj.name

      if (obj.properties.footer) {
        this.useFooter = true
        this.runningText = obj.properties.footer.text
      }
      // if (obj.logo.items.length > 0) {
      //   this.logos =
      //     this.$axios.defaults.baseURL + obj.logo.items[0].split('/api/')[1]
      // }

      var array1 = []
      obj.component.widgets.forEach((data) => {
        array1.push({
          name: data.name,
          component: data.component,
        })
      })
      //   if (this.$refs['dynamic'])
      setTimeout(() => {
        this.rerender = false

        setTimeout(() => {
          var array2 = this.widget
          var result = []
          array2.forEach((data) => {
            array1.forEach((data2) => {
              if (data.name == data2.name) {
                data.remove = true
              }
            })
          })
          array2.forEach((data) => {
            if (!data.remove) {
              result.push(data)
            }
          })
          this.widget = result
          obj.component.properties.typeList.forEach((el, i) => {
            self.$refs['dynamic'][el].push(array1[i])
          })
        }, 500)
      }, 100)
      // return this.$parent.templateAddedList.find(db => db._id == this.selectedTemplate)
    },
  },
}
</script>