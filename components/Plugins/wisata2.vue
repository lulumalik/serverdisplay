<template>
  <div
    style="background-image: url('wisata.png')"
    class="h-screen w-screen font-color"
  >
    <div class="absolute top-6 left-6">
      <img src="bmkg.png" class="w-12" />
    </div>
    <div
      class="p-20 absolute top-0 h-full w-6/12 right-0"
      style="background: #ffeeff"
    >
      <div>
        <div class="font-thin">
          {{ new Date().toString().split(' ').splice(0, 4).join(' ') }}
        </div>
        <div
          class="font-bold w-8/12 text-8xl mt-6 relative right-1 text-shadow"
        >
          Labuan Bajo
        </div>
      </div>
      <div class="mt-16">
        <div class="w-full">
          <div class="font-thin flex space-x-12">
            <div class="text-7xl">
              29 <sub class="relative bottom-1">°C</sub>
            </div>
            <div class="relative top-1">
              <div class="flex text-sm">
                <div class="w-24">Curah Hujan</div>
                <div class="">: 60%</div>
              </div>
              <div class="flex text-sm">
                <div class="w-24">Kelembapan</div>
                <div class="">: 80%</div>
              </div>
              <div class="flex text-sm">
                <div class="w-24">Angin</div>
                <div class="">: 10 km/jam</div>
              </div>
            </div>
          </div>
          <div class="text-md mt-6">
            <div>Cuaca <b>Cerah Berawan</b></div>
          </div>
          <div class="mt-6">
            <img src="/weather/cerah.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 w-full">
      <!-- slow duration -->
      <marquee-text :duration="20" class="bg-gray-800 text-white p-3">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna.
      </marquee-text>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.font-color {
  color: #4e256c;
}
</style>