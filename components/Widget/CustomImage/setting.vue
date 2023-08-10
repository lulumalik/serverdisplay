<template>
    <div>
        <div>
            <div>Choose data format</div>
            <select v-model="isStatic" class="border py-2 px-3 mt-2 w-full rounded">
                <option value="url">URL</option>
                <option value="static">Static</option>
            </select>
        </div>
        <div v-if="isStatic == 'static'">
            <div class="mt-2">Image Background URL</div>
            <ChooseLogo v-if="chooseLogo" @url="changeImg" :emitonly="true" />

            <div @click="chooseLogo = true" class="cursor-pointer">
                <img @error="handleImageError" class="rounded-md border-4 mb-1 border-white shadow-md cursor-pointer" :src="img.includes('/api/') ? $axios.defaults.baseURL +
                    img.split('/api/')[1] : img" style="width: 200px;" />
                <input disabled type="text" class="px-2 py-1.5 w-full border border-gray-300 rounded" @input="changeImg"
                    v-model="img" placeholder="name place" />
            </div>
        </div>
        <div v-else>
            <input type="text" class="border py-2 px-3 mt-2 w-full rounded" v-model="img" />
            <button @click="changeImg(img)"
                class="border py-2 px-3 mt-2 w-full bg-blue-500 text-white cursor-pointer text-center rounded">
                Submit
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        idTemplate: {
            default: () => {
                return ''
            },
        },
    },
    methods: {
        handleImageError(event) {
            event.target.src = '/plus.png';
        },
        changeImg(img) {
            this.chooseLogo = false
            this.img = img
            this.$store.commit('displayWidget/mutationWidget', {
                key: this.idTemplate + '_WidgetCustomImage_img',
                value: img,
            })
        },
    },
    mounted() {
        if (
            this.$store.state.displayWidget.widgetSaved[
            this.idTemplate + '_WidgetCustomImage_img'
            ]
        ) {
            this.img =
                this.$store.state.displayWidget.widgetSaved[
                this.idTemplate + '_WidgetCustomImage_img'
                ]
        }
    },
    data() {
        return {
            img: '/plus.png',
            chooseLogo: false,
            isStatic: 'static',
            urlform: ''
        }
    },
}
</script>
  