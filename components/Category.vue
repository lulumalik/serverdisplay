<template>
  <div>
    <div class="text-xl mb-4 font-bold text-sky-500">Category</div>
    <div class="flex space-x-8 items-center">
      <div v-for="(l, i) in list" :key="i" class="cursor-pointer"
        @click="$parent.selectedCategory = (l.name == 'All' ? '' : l.name)">
        <div class="
            rounded-full
            w-10
            h-10
            flex
            items-center
            justify-center
            shadow-md
            mx-auto
          "
          :class="$parent.selectedCategory === (l.name == 'All' ? '' : l.name) ? 'bg-sky-500 text-white' : 'bg-white text-sky-500'">
          <component :is="l.id" class="w-5 h-5" />
        </div>

        <div class="texst-xs text-gray-500 text-center mt-2"><small>{{ l.name }}</small></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        // {
        //   name: 'All',
        //   id: 'CategoryiconAll',
        // },
        {
          name: 'Bandara',
          id: 'CategoryiconBandara',
        },

        // {
        //   name: 'Maritim',
        //   id: 'CategoryiconMaritim',
        // },
        // {
        //   name: 'Umum',
        //   id: 'CategoryiconUmum',
        // },
        // {
        //   name: 'Wisata',
        //   id: 'CategoryiconWisata',
        // },
        // {
        //   name: 'Custom',
        //   id: 'CategoryiconCustom',
        // },
      ],
    }
  },
}
</script>