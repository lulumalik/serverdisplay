<template>
  <div>
    <div
      v-if="saving"
      class="fixed h-screen w-screen flex items-center justify-center"
      style="z-index: 9999999; background-color: rgba(0, 0, 0, 0.3)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="animate-spin"
      >
        <path
          d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-19 0c0-6.065 4.935-11 11-11v2c-4.962 0-9 4.038-9 9 0 2.481 1.009 4.731 2.639 6.361l-1.414 1.414.015.014c-2-1.994-3.24-4.749-3.24-7.789z"
        />
      </svg>
      <div class="ml-3 font-bold">Upload data ...</div>
    </div>
    <Navbar class="w-full" />
    <div class="flex w-full" style="height: calc(100vh - 65.5px)">
      <client-only>
        <div
          class="
            flex-grow
            bg-gray-100
            w-full
            h-full
            pl-4
            py-4
            relative
            overflow-auto
          "
        >
          <div class="absolute top-6 right-2 z-50">
            <button
              @click="scale = scale + 0.1"
              class="
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
              "
            >
              +
            </button>
            <button
              @click="scale = scale - 0.1"
              class="
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
              "
            >
              -
            </button>
          </div>
          <div class="flex bg-white" style="height: calc(100vh - 30%)">
            <!-- sidebar -->
            <div
              class="
                flex-none
                border-r border-gray-200
                bg-white
                h-full
                p-5
                space-y-3
                text-xs
                relative
              "
              style="z-index: 1000"
            >
              <div
                @click="backto"
                class="
                  text-xs
                  cursor-pointer
                  flex
                  items-center
                  space-x-2
                  text-sky-400
                  font-bold
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  class="text-sky-400 relative bottom-0.5"
                >
                  <path
                    fill="currentColor"
                    d="M13.427 3.021h-7.427v-3.021l-6 5.39 6 5.61v-3h7.427c3.071 0 5.561 2.356 5.561 5.427 0 3.071-2.489 5.573-5.561 5.573h-7.427v5h7.427c5.84 0 10.573-4.734 10.573-10.573s-4.733-10.406-10.573-10.406z"
                  />
                </svg>
                <div>Back</div>
              </div>
              <div class="text-lg">Template Name</div>
              <div>
                <input
                  v-model="templatename"
                  type="text"
                  placeholder="name ..."
                  class="py-2 px-2 w-full shadow rounded border border-gray-500"
                />
              </div>
              <DisplayBase ref="display" />
              <div class="mt-1 text-lg">Category</div>
              <div>
                <select
                  v-model="selectedCategory"
                  class="py-2 px-2 w-full shadow rounded border border-gray-500"
                >
                  <option value="Maritim">Maritim</option>
                  <option value="Umum">Umum</option>
                  <option value="Bandara">Bandara</option>
                  <option value="Wisata">Wisata</option>
                </select>
              </div>
              <div class="mt-1 text-lg">Widget</div>
              <div
                style="height: calc(100vh - 670px)"
                class="overflow-y-auto overflow-x-hidden"
              >
                <draggable group="widget" :list="widget" class="list-group">
                  <div
                    class="
                      py-2
                      px-2
                      shadow
                      rounded
                      flex
                      space-x-3
                      border border-blue-500
                      list-group-item
                      mt-2
                      cursor-pointer
                    "
                    v-for="(w, i) in widget"
                    :key="i"
                  >
                    <svg
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      stroke-linejoin="round"
                      stroke-miterlimit="2"
                      viewBox="0 0 24 24"
                      width="100%"
                      height="100%"
                      class="w-4"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m12 16.495c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0-6.75c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0-6.75c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25z"
                      />
                    </svg>
                    <div>{{ w.name }}</div>
                  </div>
                </draggable>
                <div v-show="widget.length == 0" class="text-center text-xs">
                  No data found
                </div>
              </div>
            </div>
            <!-- canvas -->
            <div
              class="
                flex-grow
                bg-gray-200
                items-center
                justify-center
                overflow-auto
                pt-2
              "
            >
              <!-- <div class="baseBrowser"></div> -->
              <div
                class="w-full overflow-hidden baseBrowser rounded relative"
                id="canvas"
                style="transform-origin: top center"
                :style="backgroundInitial"
              >
                <HeaderTemplate
                  ref="header"
                  class="z-50 baseBrowserWidth px-8 py-2"
                  v-if="useHeader"
                />
                <div
                  style="transform-origin: top center"
                  :style="{
                    transform: 'scale(' + scaleinner + ')',
                  }"
                >
                  <div class="mx-auto w-full h-full">
                    <component
                      ref="dynamic"
                      class="px-6 pt-2"
                      v-if="!rerender"
                      v-bind:is="selectedTemplate"
                      :selectedCategory="selectedCategory"
                      @returnList="returning"
                    />
                  </div>
                </div>
                <!-- <FooterTemplate
                  ref="footer"
                  class="
                    z-50
                    baseBrowserWidth
                    absolute
                    bottom-0
                    overflow-hidden
                  "
                  v-if="useFooter"
                /> -->
              </div>
            </div>
          </div>
          <div class="flex items-start pr-6">
            <div class="w-3/12 p-4">
              <div class="text-left flex justify-start items-center space-x-3">
                <button
                  v-if="!isRoled"
                  @click="savingTemplate(false)"
                  class="
                    bg-blue-200
                    border border-blue-400
                    shadow
                    px-6
                    py-3
                    text-blue-600
                    font-semibold
                    rounded
                    text-xs
                  "
                >
                  {{ saving ? 'Saving ...' : 'Save' }}
                </button>
                <div class="text-xs" v-if="$route.query.id && !isRoled">Or</div>
                <button
                  v-if="$route.query.id"
                  @click="savingTemplate(true)"
                  class="
                    bg-blue-200
                    border border-blue-400
                    shadow
                    px-2
                    py-3
                    text-blue-600
                    font-semibold
                    rounded
                    text-xs
                  "
                >
                  {{ saving ? 'Saving ...' : 'Save as new Template' }}
                </button>
              </div>
            </div>
            <div class="flex space-x-3 justify-end mt-4 w-9/12 relative">
              <div
                class="
                  absolute
                  -top-14
                  right-0
                  left-0
                  mx-auto
                  z-50
                  bg-white
                  rounded-full
                  shadow
                  py-1
                "
                style="width: 250px"
              >
                <vue-slider
                  style="width: 200px"
                  ref="slider"
                  :tooltip-placement="'right'"
                  v-model="scaleinner"
                  class="mx-auto"
                  v-bind="{ min: 0, max: 5, interval: 0.001 }"
                ></vue-slider>
              </div>
              <div
                v-for="(data, i) in Object.keys(layoutDB)"
                :key="i"
                class="cursor-pointer"
                @click="selectingTemplate(data)"
              >
                <img
                  :class="
                    data == selectedTemplate ? 'border-2 border-sky-800' : ''
                  "
                  :src="'/Layout/' + data + '.svg'"
                  class="w-24"
                />
              </div>
            </div>
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  middleware: ['checkLogin'],
  data() {
    return {
      templateDB: [],
      layoutDB: {},
      categoryDB: {},
      rerender: false,
      selectedCategory: 'Maritim',
      widget: [],
      selectedTemplate: 'Layout_1',
      saving: false,
      templatename: '',
      backgroundColor: '#ffffff',
      isUpdating: null,
      useHeader: false,
      useFooter: false,
      useDynamic: false,
      useVideo: false,
      runningText: '',
      logos: [null, null, null],
      scale: 1,
      scaleinner: 1,
      isRoled:null
    }
  },
  computed: {
    backgroundInitial() {
      if (this.backgroundColor.toString().length == 7) {
        return {
          transform: 'scale(' + this.scale + ')',
          background: this.backgroundColor,
        }
      } else {
        return {
          transform: 'scale(' + this.scale + ')',
          'background-image': 'url(' + this.backgroundColor + ')',
          'background-size': 'cover',
          'background-position': 'center',
          'background-repeat': 'no-repeat',
        }
      }
    },
  },
  async mounted() {
    var widget = await this.$axios.$get('widget')
    this.widget = widget.data

    this.$axios.$get('template').then((res) => {
      this.templateDB = res.data
      if (this.$route.query.id) {
        var obj = this.templateDB.find(
          (data) => data._id == this.$route.query.id
        )
        this.templateDBSelected(obj)
      }
    })
    this.$axios.$get('layout').then((res) => {
      res.data.forEach((data) => {
        this.$set(this.layoutDB, data.name, data._id)
      })
    })
    this.$axios.$get('category').then((res) => {
      res.data.forEach((data) => {
        this.$set(this.categoryDB, data.name, data._id)
      })
    })
  },
  watch: {
    selectedTemplate(val, old) {
      this.rerender = true
      var obj = {
        length: parseInt(old.split('_')[1]),
      }

      this.reInitData(old, this.selectedCategory, obj)

      setTimeout(() => {
        this.rerender = false
      }, 500)
    },
  },
  methods: {
    toDataUrl(url, callback) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.onload = function () {
          var reader = new FileReader()
          reader.onloadend = function () {
            resolve(reader.result)
          }
          reader.readAsDataURL(xhr.response)
        }
        xhr.open('GET', url)
        xhr.responseType = 'blob'
        xhr.send()
      })
    },
    selectingTemplate(data) {
      if (!this.$cookies.get('reminderTemplate')) {
        this.$confirm('Are you sure?, current change will be removed').then(
          (res) => {
            this.selectedTemplate = data
            this.$cookies.set('reminderTemplate', true)
          }
        )
      } else {
        this.selectedTemplate = data
      }
    },
    backto() {
      window.history.back()
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },
    generate() {
      // this.$refs.html2Pdf.generatePdf();
      return new Promise((resolve) => {
        var self = this
        html2canvas(document.getElementById('canvas'), {
          useCORS: true,
        }).then(function (canvas) {
          resolve(canvas.toDataURL('image/png'))
          // self.saveAs(canvas.toDataURL("image/png"), "mapsqpe24h.png");
        })
      })
    },
    saveAs(uri, filename) {
      var link = document.createElement('a')

      if (typeof link.download === 'string') {
        link.href = uri
        link.download = filename

        //Firefox requires the link to be in the body
        document.body.appendChild(link)

        //simulate click
        link.click()

        //remove the link when done
        document.body.removeChild(link)
      } else {
        window.open(uri)
      }
    },
    templateDBSelected(obj) {
      this.rerender = true
      this.isRoled = obj.role
      this.selectedTemplate = obj.component.layout.name
      this.selectedCategory = obj.category.name
      this.backgroundColor = obj.properties.background
        ? obj.properties.background
        : this.$axios.defaults.baseURL + obj.backgroundImage.split('/api/')[1]

      this.scaleinner = obj.properties.scale
      this.templatename = obj.name
      this.useHeader = obj.properties.header ? true : false

      if (obj.properties.video) {
        this.useVideo = true
        this.$refs['display'].subdistrict = obj.properties.video
      }

      if (obj.properties.footer) {
        this.useFooter = true
        this.runningText = obj.properties.footer.text
      }
      if (obj.logo.items.length > 0) {
        obj.logo.items.forEach((el, i) => {
          this.logos[i] =
            this.$axios.defaults.baseURL + obj.logo.items[0].split('/api/')[1]
        })
      }
      var array1 = []
      obj.component.widgets.forEach((data) => {
        array1.push({
          name: data.name,
          component: data.component,
        })
      })

      // if (this.$refs['dynamic'])
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
            this.$refs['dynamic'][el].push(array1[i])
          })
        }, 500)
      }, 100)
    },
    reInitData(template, category, obj) {
      var arr = []
      var typeList = []
      if (obj.length == 1) {
        if (this.$refs['dynamic'].list1.length > 0) {
          // this.widget[template][category].push(this.$refs['dynamic'].list1[0])
          this.$refs['dynamic'].list1.forEach((data) => {
            typeList.push('list1')
            this.widget.push(data)
            arr.push(data)
          })
        }
      } else if (obj.length == 2) {
        if (this.$refs['dynamic'].list1.length > 0) {
          this.$refs['dynamic'].list1.forEach((data) => {
            typeList.push('list1')
            this.widget.push(data)
            arr.push(data)
          })
        }
        if (
          this.$refs['dynamic'].list2 &&
          this.$refs['dynamic'].list2.length > 0
        ) {
          this.$refs['dynamic'].list2.forEach((data) => {
            typeList.push('list2')
            this.widget.push(data)
            arr.push(data)
          })
        }
      } else if (obj.length == 3) {
        if (this.$refs['dynamic'].list1.length > 0) {
          this.$refs['dynamic'].list1.forEach((data) => {
            typeList.push('list1')
            this.widget.push(data)
            arr.push(data)
          })
        }
        if (
          this.$refs['dynamic'].list2 &&
          this.$refs['dynamic'].list2.length > 0
        ) {
          this.$refs['dynamic'].list2.forEach((data) => {
            typeList.push('list2')
            this.widget.push(data)
            arr.push(data)
          })
        }
        if (
          this.$refs['dynamic'].list3 &&
          this.$refs['dynamic'].list3.length > 0
        ) {
          this.$refs['dynamic'].list3.forEach((data) => {
            typeList.push('list3')
            this.widget.push(data)
            arr.push(data)
          })
        }
      } else if (obj.length == 4) {
        if (this.$refs['dynamic'].list1.length > 0) {
          this.$refs['dynamic'].list1.forEach((data) => {
            typeList.push('list1')
            this.widget.push(data)
            arr.push(data)
          })
        }
        if (
          this.$refs['dynamic'].list2 &&
          this.$refs['dynamic'].list2.length > 0
        ) {
          this.$refs['dynamic'].list2.forEach((data) => {
            typeList.push('list2')
            this.widget.push(data)
            arr.push(data)
          })
        }
        if (
          this.$refs['dynamic'].list3 &&
          this.$refs['dynamic'].list3.length > 0
        ) {
          this.$refs['dynamic'].list3.forEach((data) => {
            typeList.push('list3')
            this.widget.push(data)
            arr.push(data)
          })
        }
        if (
          this.$refs['dynamic'].list4 &&
          this.$refs['dynamic'].list4.length > 0
        ) {
          this.$refs['dynamic'].list4.forEach((data) => {
            typeList.push('list4')
            this.widget.push(data)
            arr.push(data)
          })
        }
      }
      return {
        widget: arr,
        typeList: typeList,
      }
    },
    returning(val) {
      this.widget.push(val)
    },
    async createTemplate(data, img, background, logo) {
      this.$axios
        .$post('template/create', data)
        .then(async (res) => {
          await this.uploadImage(img, res.data._id)
          await this.uploadBackground(background, res.data._id)
          // console.log(logo)
          // logo.forEach(async el => {
          //   await this.uploadLogos(el, res.data._id)
          // })

          this.rerender = false
          this.saving = false
          this.$toast.open({
            message: 'Template saved',
            type: 'success',
            duration: 2000,
          })
          this.$axios.$get('template').then((res) => {
            this.templateDB = res.data
          })
        })
        .catch((err) => {
          console.log(err)
          this.saving = false
          this.rerender = false
          this.$toast.open({
            message: 'Error saving template',
            type: 'error',
            duration: 2000,
          })
        })
    },
    updateTemplate(data, _id, img, background, logo) {
      this.$axios
        .$put('template/update/' + _id, data)
        .then(async (res) => {
          await this.uploadImage(img, res.data._id)
          await this.uploadBackground(background, res.data._id)

          var obj = this.templateDB.find(
            (data) => data._id == this.$route.query.id
          )
          var url2 = obj.logo.items
          
          url2.forEach(async (el) => {
            await this.$axios.$put('template/logo/delete/' + res.data._id, {
              logo: el,
            })
          })
          console.log(logo)
         setTimeout(el => {
           logo.forEach(async el => {
            console.log(el)
            await this.uploadLogos(el, res.data._id)
          })
         },5000)

          this.rerender = false
          this.saving = false
          // this.$toast.open({
          //   message: 'Template saved',
          //   type: 'success',
          //   duration: 2000,
          // })
          // this.$axios.$get('template').then((res) => {
          //   this.templateDB = res.data
          // })
        })
        .catch((err) => {
          console.log(err)
          this.saving = false
          this.rerender = false
          this.$toast.open({
            message: 'Error saving template',
            type: 'error',
            duration: 2000,
          })
        })
    },
    async savingTemplate(isNewTemplate) {
      // generate preview
      var preview = await this.generate()
      var filepreview = this.dataURLtoFile(preview, 'preview.png')
      // prepare filebackground for saving
      var filebackground
      if (this.useVideo) {
        // filter video disini klo misalkan ada video maka remove background iamge yang sudah
        // diganti sama background putih
        this.backgroundColor = '#ffffff'
      } else {
        if (this.backgroundColor.length > 7) {
          if (this.backgroundColor.toString().includes('data:image')) {
            filebackground = this.dataURLtoFile(
              this.backgroundColor,
              'background.png'
            )
          } else if (
            this.backgroundColor.toString().includes('/template/assets')
          ) {
            var img = await this.toDataUrl(this.backgroundColor)
            filebackground = this.dataURLtoFile(img, 'background.png')
          } else {
            filebackground = 'no upload'
          }
        }
      }
      // prepare logos for saving
      var fileLogos = []
      this.logos.forEach(async (el, i) => {
        if (el) {
          if (el.toString().includes('data:image')) {
            fileLogos[i] = this.dataURLtoFile(el, 'logos.png')
          } else if (
            this.backgroundColor.toString().includes('/template/assets')
          ) {
            var img = await this.toDataUrl(el)
            fileLogos[i] = this.dataURLtoFile(img, 'background.png')
          } else {
            // fileLogos[i] = 'no upload'
          }
        }
      })
      this.saving = true
      this.rerender = true
      var layout = {
        length: this.selectedTemplate.split('_')[1],
      }
      // get widget data
      var widgetList = this.reInitData(
        this.selectedTemplate,
        this.selectedCategory,
        layout
      )
      var properties = {
        background:
          this.backgroundColor.length > 7 ? null : this.backgroundColor,
        scale: this.scaleinner,
      }
      // header section
      if (this.useHeader) {
        properties.header = true
      } else {
        properties.header = null
      }
      // footer section
      if (this.useFooter) {
        properties.footer = {
          text: this.runningText,
        }
      } else {
        properties.footer = null
      }

      if (this.useVideo) {
        properties.video = this.$refs['display'].subdistrict
      } else {
        properties.video = null
      }
      var data = {
        name: this.templatename,
        category: this.categoryDB[this.selectedCategory],
        component: {
          layout: this.layoutDB[this.selectedTemplate],
          widgets: widgetList.widget,
          properties: {
            typeList: widgetList.typeList,
          },
        },
        properties: properties,
      }
      // filter dengan new template
      if (isNewTemplate) {
        this.createTemplate(data, filepreview, filebackground, fileLogos)
        return
      }
      if (this.$route.query.id) {
        this.updateTemplate(
          data,
          this.$route.query.id,
          filepreview,
          filebackground,
          fileLogos
        )
      } else {
        this.createTemplate(data, filepreview, filebackground, fileLogos)
      }
    },
    uploadImage(img, id) {
      return new Promise((resolve, reject) => {
        var data = new FormData()
        data.append('file', img)

        this.$axios
          .$put('template/preview/upload/' + id, data)
          .then((res) => {
            //
            resolve(res)
          })
          .catch((err) => {
            // this.saving = false
            // this.rerender = false
            resolve()
            this.$toast.open({
              message: 'Error saving preview',
              type: 'error',
              duration: 2000,
            })
          })
      })
    },
    uploadLogos(img, id) {
      if (img == 'no upload') {
        return new Promise((resolve) => {
          resolve()
        })
      }
      if (!img) {
        return new Promise((resolve) => {
          resolve()
        })
      }
      var url = 'logo'

      return new Promise(async (resolve, reject) => {
        var data = new FormData()
        data.append('file', img)

        this.$axios
          .$put('template/' + url + '/upload/' + id, data)
          .then((res) => {
            //
            resolve(res)
          })
          .catch((err) => {
            // this.saving = false
            // this.rerender = false
            resolve()
            this.$toast.open({
              message: 'Error saving background',
              type: 'error',
              duration: 2000,
            })
          })
      })
    },
    uploadBackground(img, id) {
      if (img == 'no upload') {
        return new Promise((resolve) => {
          resolve()
        })
      }
      var url = 'background'
      return new Promise((resolve, reject) => {
        if (!img) {
          return this.$axios
            .$put('template/' + url + '/delete/' + id)
            .then((res) => {
              //
              resolve(res)
            })
            .catch((e) => {
              resolve(e)
            })
        }
        var data = new FormData()
        data.append('file', img)

        this.$axios
          .$put('template/' + url + '/upload/' + id, data)
          .then((res) => {
            //
            resolve(res)
          })
          .catch((err) => {
            // this.saving = false
            // this.rerender = false
            resolve()
            this.$toast.open({
              message: 'Error saving background',
              type: 'error',
              duration: 2000,
            })
          })
      })
    },
  },
}
</script>