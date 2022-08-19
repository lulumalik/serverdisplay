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
      <marquee-text
        :repeat="1"
        :duration="5000"
        class="bg-white text-gray-700 p-2"
      >
        <div class="flex space-x-4 text-xl">
          <img src="/bmkg.png" class="w-6 mx-3" alt="bmkg" /> {{runningText.join(', ')}}
        </div>
      </marquee-text>
      <!-- <div v-else>
          Running Text
        </div> -->
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
const xml = require("txml");

export default {
  props: {
    nodrag: {
      default: () => false,
    },
  },
  mounted() {
    // 
    this.$axios
          .post('https://sena.circlegeo.com/api/sena/research/forward', {
            url: 'https://warningcuaca.bmkg.go.id/cap/xml/id/newsflash.xml',
          })
          .then((res) => {
            const json = xml.parse(res.data);
            var dataparsed = json[0].children[0].children
            var index = json[0].children[0].children.length - 1
            var listParsedArray = dataparsed[index].children
            this.runningText.length = 0
            for (var i = 0; i < 2; i++) {
              this.runningText.push(listParsedArray[i].children[4].children[0])
            }
            // listParsedArray.forEach((item, index) => {
            //   // console.log(item)
            //   this.runningText.push(item.children[4].children[0])
            // })
          })
  },
  data() {
    return {
      showPopup: false,
      runningText: []
    }
  },
}
</script>