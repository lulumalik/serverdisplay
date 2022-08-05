<template>
  <div
    class="
      bg-gradient-to-b
      from-sky-100
      flex
      justify-center
      items-center
      via-stone-300 via-stone-300 via-stone-300
      to-red-300
      h-screen
      w-screen
    "
  >
    <div class="flex items-start space-x-4">
      <div v-for="f in 2" :key="f">
        <div
          class="
            bg-gray-100
            rounded
            shadow-md
            p-6
            flex
            items-start
            space-x-4
            text-gray-800
          "
          :class="i == 1 ? '' : 'mt-5'" 
          v-for="i in 3"
          :key="i"
        >
          <div class="bg-gray-200 rounded bg-gray-200 w-36 h-36"></div>
          <div class="text-lg relative top-0.5">
            <div><b>Nama Bandara - Lokasi Bandara</b></div>
            <div>Hujan Ringan</div>
            <div>Angin: (dari) arah barat, 12.5 km/jam</div>
            <div>Jarak Pandang: >10km</div>
            <div>Suhu: 20 Derajat</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>