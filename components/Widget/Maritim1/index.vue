<template>
  <div
    class="flex items-center justify-center font-color bg-transparent"
  >
    <div
      class="
        rounded
        text-3xl
        leading-relaxed
        text-center
        font-bold
        text-orange-700
        bg-orange-200
        shadow-lg
      "
    >
      <div class="p-10">
        <div>Laut Jawa</div>
        <div>Bagian Tengah</div>
      </div>
      <div class="bg-orange-400 p-10">
        <div class="flex items-center space-x-6">
          <div>
            <button
              class="
                uppercase
                font-semibold
                text-white
                bg-orange-700
                text-xs
                w-32
                rounded
                py-2
              "
            >
              Cuaca
            </button>
            <div class="h-24 flex items-center mt-3">
              <img src="/weather/cerah.png" class="mx-auto" alt="cerah" />
            </div>
            <div class="text-sm mt-2">Hujan Ringan</div>
          </div>
          <div>
            <button
              class="
                uppercase
                font-semibold
                text-white
                bg-orange-700
                text-xs
                w-32
                rounded
                py-2
              "
            >
              Angin
            </button>
            <div class="h-24 flex items-center mt-3 text-4xl justify-center font-thin">
              <span>2-5</span><sup class="ml-2"><small>kts</small></sup>
            </div>
            <div class="text-sm mt-2">Timur Laut-Tenggara</div>
          </div>
          <div>
            <button
              class="
                uppercase
                font-semibold
                text-white
                bg-orange-700
                text-xs
                w-32
                rounded
                py-2
              "
            >
              Gelombang
            </button>
            <div class="h-24 flex items-center mt-3 text-3xl justify-center font-thin">
              Rendah
            </div>
            <div class="text-sm mt-2">0.5-1.25 m</div>
          </div>
        </div>
      </div>
      <div class="p-12 text-sm font-thin">
        <div>
        <b>Berlaku</b>: {{new Date().toString().split(' ').splice(0,5).join(' ')}} WIB</div>
        <div><b>Sampai,</b> {{new Date(new Date().setDate(new Date().getDate() + 2)).toString().split(' ').splice(0,5).join(' ')}} WIB</div>
      </div>
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