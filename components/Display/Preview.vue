<template>
  <div class="px-3 py-4 relative">
    <!-- button zoom -->
    <div class="absolute top-16 right-6 z-50">
      <button @click="scaleparent = scaleparent + 0.01" class="
          w-6
          h-6
          rounded-t
          flex
          justify-center
          items-center
          text-xs
          bg-sky-400
          text-white
          hover:bg-sky-300
        ">
        +
      </button>
      <button @click="scaleparent = scaleparent - 0.01" class="
          w-6
          h-6
          rounded-b
          flex
          justify-center
          items-center
          text-xs
          bg-sky-400
          text-white
          hover:bg-sky-300
        ">
        -
      </button>

      <button @click="reloadPreview" class="
          w-6
          h-6
          rounded
          mt-2
          flex
          justify-center
          items-center
          text-xs
          bg-sky-400
          text-white
          hover:bg-sky-300
        ">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
          <path fill="#fff"
            d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.527 7.708c.741-.444 1.6-.708 2.527-.708 2.757 0 5 2.243 5 5h2c0-3.86-3.141-7-7-7-1.336 0-2.58.385-3.641 1.038l-1.359-2.038-1.719 6h5.719l-1.527-2.292zm5.054 8.584c-.741.444-1.6.708-2.527.708-2.757 0-5-2.243-5-5h-2c0 3.86 3.141 7 7 7 1.336 0 2.58-.385 3.641-1.038l1.359 2.038 1.719-6h-5.719l1.527 2.292z" />
        </svg>
      </button>
    </div>
    <div class="text-sm">
      <div class="flex items-center">
        <div class="flex-grow">Preview Display</div>
        <div class="flex flex-none space-x-3">
          <input type="number" v-model="width" class="py-1 w-24 text-xs px-4 rounded border border-gray-300" />
          <div>x</div>
          <input type="number" v-model="height" class="py-1 w-24 text-xs px-4 rounded border border-gray-300" />
        </div>
      </div>
      <div class="
          bg-gray-300
          w-full
          rounded
          mt-1.5
          overflow-y-hidden overflow-x-auto
          relative
        " style="height: calc(100vh - 360px)">
        <div class="w-screen">
          <div v-show="$parent.selectedTemplateID" :style="{
            transform: 'scale(' + scaleparent + ')',
            'transform-origin': '20% 0%',
            width: width + 'px',
            height: height + 'px',
          }">
            <BackgroundVideo v-if="objData && objData.properties.video !== null" />
            <ShowLayout v-if="objData" :obj="objData" :style="getBackground(objData)" :layoutDB="layoutDB"
              :widgetDB="widget" class="w-full h-full overflow-hidden" ref="layout" @scale="scale = $event.scale"
              @background="initialbackground" />
          </div>
        </div>
        <div>
          <div v-if="objData" class="
              absolute
              bottom-4
              right-0
              left-0
              mx-auto
              z-50
              bg-white
              rounded-full
              shadow
              py-1
            " style="width: 250px">
            <vue-slider style="width: 200px" ref="slider" :tooltip-placement="'right'" v-model="scale"
              @change="scaleToChild" class="mx-auto" v-bind="{ min: 0, max: 4, interval: 0.001 }"></vue-slider>
          </div>
        </div>
      </div>
      <div class="relative">
        <div class="absolute right-2 -top-12 flex">
          <div class="
              rounded
              bg-sky-400
              px-2
              py-1
              flex
              items-center
              justify-center
            ">
            <img src="/bx_time-five.svg" class="w-5" alt="time" />
          </div>
        </div>
        <div class="my-2">Display Pages</div>
        <div class="overflow-x-auto overflow-y-hidden">
          <draggable class="grid gap-x-4" :style="{
            'grid-template-columns': `repeat(${$parent.templateAddedList.length}, minmax(0, 1fr))`,
            width: $parent.templateAddedList.length * 14 + '0px',
          }" :list="$parent.templateAddedList">
            <div v-for="(db, i) in $parent.templateAddedList" :key="i" class="
                rounded
                px-4
                flex
                items-center
                justify-center
                shadow
                cursor-pointer
                relative
                overflow-hidden
                inline-block
              " :class="$parent.selectedTemplateID == db.idtemplate
                ? 'border-2 border-sky-500'
                : ''
                " style="height: 90px; width: 140px">
              <button class="
                  text-white
                  bg-red-500
                  rounded-full
                  w-5
                  h-5
                  flex
                  items-center
                  justify-center
                  absolute
                  right-2
                  top-2
                  z-30
                " @click="spliceData(db, i)">
                <span class="relative" style="bottom: 0.8px">&times;</span>
              </button>

              <div
                class="p-0.5 z-50 bg-white rounded border border-black text-xs absolute left-2 bottom-2 flex items-center space-x-1">
                <input type="number" v-model="times[db.idtemplate]" class="w-10 p-1 text-xs" />
                <div class="pr-1">s</div>
              </div>

              <img @click="getComp(db)" v-if="db.preview" :src="$axios.defaults.baseURL + db.preview.split('/api/')[1]"
                class="absolute w-full h-full z-10" />
              <p class="truncate relative z-20" @click="getComp(db)">
                {{ db.name }}
              </p>
              <div class="
                  absolute
                  top-0
                  left-0
                  z-50
                  font-bold
                  bg-sky-500
                  p-0.5
                  text-xs text-white
                  w-4
                  text-center
                ">
                {{ i + 1 }}
              </div>
            </div>
          </draggable>
        </div>
        <div v-if="$parent.templateAddedList.length == 0" class="mt-2">
          no data selected
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      objData: null,
      background: '#ffffff',
      times: {},
      scale: 1,
      scaleparent: 0.5,
      layoutDB: {},
      widget: [],
      width: 1366,
      height: 768,
      logos: {},
    }
  },
  async mounted() {
    const res1 = await this.$axios.$get('widget')
    this.widget = res1.data

    const res = await this.$axios.$get('layout')
    res.data.forEach((data) => {
      this.$set(this.layoutDB, data._id, data.name)
    })
    setTimeout(() => {
      if (this.$parent.templateAddedList.length > 0) {
        this.$parent.selectedTemplateID =
          this.$parent.templateAddedList[0].idtemplate
        this.objData = this.$parent.templateAddedList[0]
      }
    }, 1000)
  },

  watch: {
    '$parent.templateAddedList': {
      handler: function (val) {
        // var obj = {}
        if (typeof this.times == 'number') {
          this.times = {}
          val.forEach(el => {
            this.times[el.idtemplate] = 60
          })
        } else {
          // console.log(val)
          val.forEach(el => {
            if (this.times[el.idtemplate]) {
              // 
            } else {
              this.times[el.idtemplate] = 60
            }
          })
        }
      },
      deep: true,

    }
  },
  methods: {
    reloadPreview() {
      var objParsed = this.objData
      var selected = this.$parent.selectedTemplateID

      this.$parent.selectedTemplateID = null
      this.objData = null

      setTimeout(() => {
        this.$parent.selectedTemplateID = selected
        this.objData = objParsed
      }, 1000)
    },
    getBackground(el) {
      var background = {}
      if (el.backgroundImage) {
        background = {
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
          background = 'transparent'
        } else {
          background = el.properties.background
        }
      }
      return background
    },
    scaleToChild(val) {
      // console.log(this.objData)
      for (let i = 0; i < this.$parent.templateAddedList.length; i++) {
        if (
          this.$parent.templateAddedList[i].idtemplate ==
          this.$parent.selectedTemplateID
        ) {
          this.$parent.templateAddedList[i].properties.scale = val
          break
        }
      }
      this.$refs['layout'].scaleinner = val
    },
    spliceData(db, i) {
      this.$parent.selectedTemplateID = null
      // console.log(db)
      delete this.times[db.idtemplate]
      // this.$parent.templateDB.push(db)
      this.$parent.templateAddedList.splice(i, 1)
    },
    getComp(obj) {
      this.objData = null

      setTimeout(() => {
        this.$parent.selectedTemplateID = obj.idtemplate
        this.objData = obj
      }, 300)
    },
    initialbackground(bg) {
      this.background = bg.bg
    },
  },
}
</script>