<template>
  <div>
    <!-- <div
      v-if="showPopup"
      class="
        fixed
        top-0
        left-0
        w-screen
        h-screen
        flex
        items-center
        justify-center
      "
    >
      <div class="bg-white p-8 rounded relative shadow">
        <div
          class="text-red-500 absolute top-2 right-4 font-bold cursor-pointer"
          @click="showPopup = false"
        >
          &times;
        </div>
        <div class="font-bold">
          Input text for running text ( {{ $parent.runningText.length }} / 160 )
        </div>
        <div class="mt-4">
          <textarea
            v-model="$parent.runningText"
            class="rounded p-3 border border-gray-500 w-full"
            maxlength="160"
            rows="4"
          ></textarea>
        </div>
      </div>
    </div>
    <div :class="$parent.runningText.length > 0 ? '' : 'px-2'" class="flex items-center">
          <div class="flex-none mx-2" v-if="!nodrag">
        <button @click="showPopup = true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              d="M24 13.616v-3.232l-2.869-1.02c-.198-.687-.472-1.342-.811-1.955l1.308-2.751-2.285-2.285-2.751 1.307c-.613-.339-1.269-.613-1.955-.811l-1.021-2.869h-3.232l-1.021 2.869c-.686.198-1.342.471-1.955.811l-2.751-1.308-2.285 2.285 1.308 2.752c-.339.613-.614 1.268-.811 1.955l-2.869 1.02v3.232l2.869 1.02c.197.687.472 1.342.811 1.955l-1.308 2.751 2.285 2.286 2.751-1.308c.613.339 1.269.613 1.955.811l1.021 2.869h3.232l1.021-2.869c.687-.198 1.342-.472 1.955-.811l2.751 1.308 2.285-2.286-1.308-2.751c.339-.613.613-1.268.811-1.955l2.869-1.02zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"
            />
          </svg>
        </button>
      </div> -->
    <div class="flex-grow">
      <div >
        <div
          class="p-2 para"
          id="para1"
          v-if="runningText.length > 0"
        >
          <div class="flex space-x-4 text-xl">
            <img src="/bmkg.png" class="w-6 mx-3" alt="bmkg" />
            {{ runningText.join(', ') }}
          </div>
        </div>
        <div class="p-2 para" v-else id="para1">
          <div class="flex space-x-4 text-xl">
            <img src="/bmkg.png" class="w-6 mx-3" alt="bmkg" />
            <div class="flex space-x-3 items-center">
              <div>
                Badan Meteorologi Klimatologi dan Geofisika - Cepat Tepat Akurat
                Luas dan Mudah Dipahami,
              </div>
              <div>https://www.bmkg.go.id,</div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000"
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                  />
                </svg>
              </div>
              <div>Twitter: InfoBMKG,</div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </div>
              <div>Instagram: @infobmkg,</div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000"
                    d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                  />
                </svg>
              </div>
              <div>YouTube: InfoBMKG,</div>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000"
                    d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"
                  />
                </svg>
              </div>
              <div>Call Center: BMKG 196</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<style>
.para {
  color: #000;
  font-weight: 400;
  white-space: nowrap;
  clear: both;
  float: left;
}
</style>

<script>
const xml = require('txml')

export default {
  props: {
    nodrag: {
      default: () => false,
    },
  },
  mounted() {
    //
    this.getRunningText()

    var element = document.getElementById('para1')
    let elementWidth = element.offsetWidth
    let parentWidth = element.parentElement.offsetWidth
    let flag = 0
    setInterval(() => {
      element.style.marginLeft = --flag + 'px'

      if (elementWidth == -flag) {
        flag = parentWidth
      }
    }, 10)

    this.interval = setInterval(() => {
      this.getRunningText()
    }, 1800000)
  },
  destroyed() {
    clearTimeout(this.interval)
  },
  data() {
    return {
      showPopup: false,
      runningText: [],
      interval: null,
    }
  },
  methods: {
    getRunningText() {
      this.$axios
        .post('https://weather.circlegeo.com/api/cgms/weather/forward', {
          url: 'https://warningcuaca.bmkg.go.id/cap/xml/id/newsflash.xml',
        })
        .then((res) => {
          const json = xml.parse(res.data)
          var id = 'CBB'
          if (this.$parent.useFooter) {
            var split = this.$parent.useFooter.id.split('')
            id = split[0] + split[1] + split[2]
          }
          var dataparsed = json[0].children[0].children
          var index = json[0].children[0].children.length - 1
          var listParsedArray = dataparsed[index].children
          this.runningText.length = 0
          // console.log(listParsedArray)
          listParsedArray.forEach((item) => {
            // this.runningText.push(item.text)
            if (item.children[0].children[0].includes(id)) {
              this.runningText.push(item.children[4].children[0])
            }
          })
        })
    },
  },
}
</script>