<template>
  <div>
    <client-only>
      <picture-input
        id="fileUpload"
        type="file"
        accept="image/jpeg,image/png"
        @change="dataFile"
        class="hidden"
      >
      </picture-input>
    </client-only>
    <Navbar class="w-full" />
    <div class="flex w-full" style="height: calc(100vh - 65.5px)">
      <Sidebar class="flex-none" />
      <client-only>
        <div
          class="
            flex-grow
            bg-gray-100
            w-full
            h-full
            px-4
            py-4
            overflow-auto
            relative
          "
        >
          <div class="mb-6 flex space-x-6 absolute top-4 right-4">
            <div class="relative">
              <input
                type="text"
                v-model="searchname"
                placeholder="Search"
                class="rounded-full w-56 py-2 px-4 border border-sky-400"
              />
              <div class="absolute right-4 top-3.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  class="text-sky-400"
                >
                  <path
                    fill="currentColor"
                    d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div style="height: 85%">
            <div class="mt-24 grid grid-cols-5 gap-12">
              <!-- <DisplayList :templateDB="templateDB" /> -->
              <div
                v-for="(img, i) in filterTempalteByName"
                :key="i"
                class="relative"
                style="width: 200px; height: 200px"
              >
                <div class="absolute -top-6 bg-white rounded p-1 left-0 right-0 mx-auto text-center w-full">{{img.filename.split('-')[1]}}</div>
                <button
                  @click="deleteLogos(img._id)"
                  class="
                    text-red-500
                    font-bold
                    absolute
                    right-4
                    top-2
                    text-xl
                    cursor-pointer
                  "
                >
                  &times;
                </button>
                <div
                  @click="copyimage(img.url)"
                  class="rounded-md border-4 border-white shadow-md cursor-pointer"
                  style="width: 200px; height: 200px; background-size: cover"
                  :style="{
                    backgroundImage:
                      'url(' +
                      $axios.defaults.baseURL +
                      img.url.split('/api/')[1] +
                      ')',
                  }"
                ></div>
                <button
                  @click="copyimage(img.url)"
                  class="
                    text-sky-400
                    absolute
                    bg-white
                    rounded-lg
                    bottom-2
                    left-2
                    cursor-pointer
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M21 2h-19v19h-2v-21h21v2zm3 2v20h-20v-20h20zm-2 2h-1.93c-.669 0-1.293.334-1.664.891l-1.406 2.109h-6l-1.406-2.109c-.371-.557-.995-.891-1.664-.891h-1.93v16h16v-16zm-3 6h-10v1h10v-1zm0 3h-10v1h10v-1zm0 3h-10v1h10v-1z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="text-right flex justify-end w-full">
            <!-- <div class="flex-none">
              <paginate
                :page-count="total"
                :click-handler="functionName"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'flex space-x-4'"
              >
              </paginate>
            </div> -->
            <div class="flex-grow">
              <button
                class="
                  bg-blue-200
                  border border-blue-400
                  shadow
                  px-6
                  py-2
                  text-blue-600
                  font-semibold
                  rounded
                  text-xs
                "
                @click="creating"
              >
                Upload Assets
              </button>
            </div>
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>

<style >
ul li {
  text-align: center !important;
  padding: 5px !important;
  border-radius: 5px !important;
  width: auto !important;
  background: white;
}
ul li.active {
  background: #3b82f6 !important;
  color: white;
}
</style>

<script>
export default {
  data() {
    return {
      templateDB: [],
      layoutDB: {},
      categoryDB: {},
      selectedCategory: '',
      templateDBSelected: null,
      searchname: '',
      page: 1,
      total: 10,
    }
  },
  mounted() {
    this.callAllData()
  },
  middleware: ['checkLogin'],
  computed: {
    filterTempalteByName() {
      return this.templateDB.filter((item) => {
        return item.filename.toLowerCase().includes(this.searchname.toLowerCase())
      })
    }
  },
  methods: {
    copyimage(url) {
      var self = this
      var str = this.$axios.defaults.baseURL + url.split('/api/')[1]
      navigator.clipboard.writeText(str).then(
        function () {
          // console.log('Async: Copying to clipboard was successful!')
          self.$toast.open({
            message: 'Image has been copied',
            type: 'success',
            duration: 2000,
          })
        },
        function (err) {
          console.error('Async: Could not copy text: ', err)
        }
      )
    },
    creating() {
      document.getElementById('fileUpload').click()
    },
    callAllData() {
      this.$axios.$get('logo?row=10000').then((res) => {
        this.total = res.count / 10 + 1
        this.templateDB = res.data
      })
    },
    functionName(e) {
      this.$axios.$get('logo?row=10000&page=' + e).then((res) => {
        this.total = res.count / 20 + 1
        this.templateDB = res.data
      })
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
    deleteLogos(id) {
      this.$axios.$delete('logo/delete/' + id).then(() => {
        this.$toast.open({
          message: 'Logo saved',
          type: 'success',
          duration: 2000,
        })
        this.callAllData()
      })
    },
    uploadImage(img) {
      return new Promise((resolve, reject) => {
        var data = new FormData()
        data.append('file', img)

        this.$axios
          .$post('logo/create', data)
          .then((res) => {
            //
            this.$toast.open({
              message: 'Logo saved',
              type: 'success',
              duration: 2000,
            })
            this.callAllData()
            resolve(res)
          })
          .catch((err) => {
            // this.saving = false
            // this.rerender = false
            resolve()
            this.callAllData()
            this.$toast.open({
              message: 'Error saving preview',
              type: 'error',
              duration: 2000,
            })
          })
      })
    },
    dataFile(e) {
      this.uploadImage(this.dataURLtoFile(e, 'logos.png'))
    },
  },
}
</script>