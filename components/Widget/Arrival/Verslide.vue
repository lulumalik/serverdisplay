<template>
    <div class="vertical-carousel">
        <div class="carousel-container" :style="{ top: `${position}px` }">
            <slot class="carousel-item" ></slot>
            <!-- <div class="carousel-item" v-for="item in items" :key="item.id">
                {{ item.content }}
            </div> -->
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        items: {
            type: Array,
            default: [
                { id: 1, content: 'Slide 1' },
                { id: 2, content: 'Slide 2' },
                { id: 3, content: 'Slide 3' },
            ],
        },
    },
    data() {
        return {
            position: 0,
            intervalId: null,
        };
    },
    mounted() {
        this.startCarousel();
    },
    beforeDestroy() {
        this.stopCarousel();
    },
    methods: {
        startCarousel() {
            this.intervalId = setInterval(() => {
                this.position -= 100; // Ganti angka ini dengan tinggi slide Anda dalam satuan piksel
                if (this.position < -100 * (this.items.length - 1)) {
                    this.position = 0;
                }
            }, 1000); // Ganti angka ini (1000) dengan interval waktu dalam milidetik antara setiap slide
        },
        stopCarousel() {
            clearInterval(this.intervalId);
        },
    },
};
</script>
  
<style scoped>
.vertical-carousel {
    overflow: hidden;
    height: 200px;
    /* Ganti angka ini sesuai dengan tinggi slide Anda */
}

.carousel-container {
    position: relative;
    transition: top 0.5s ease-in-out;
}

.carousel-item {
    height: 100px;
    /* Ganti angka ini sesuai dengan tinggi slide Anda */
}
</style>
  