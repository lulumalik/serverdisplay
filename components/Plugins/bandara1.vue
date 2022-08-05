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
      <div class="bg-gray-100 rounded shadow-md px-16 pt-4 pb-12">
        <div class="p-6">
          <div class="text-sky-600 font-semibold text-center text-3xl">
            Nama Bandara
          </div>
          <div class="text-sky-600 font-thin text-center text-3xl">Lokasi</div>
          <div class="mt-4">
            <img src="bandara.jpg" class="w-96" />
          </div>
          <div class="font-bold text-lg mt-5 flex items-center text-gray-700">
            <div class="flex-grow">Cerah Berawan</div>
            <div class="flex-none"><img src="/weather/cerah.png" class="w-16" /></div>
          </div>
        </div>
        <div class="flex">
          <div class="flex-grow leading-relaxed">
            <div><b class="text-gray-700">Suhu</b> 24<sup>o</sup>C</div>
            <div><b class="text-gray-700">Jarak Pandang</b></div>
            <div>> 10km</div>
          </div>
          <div class="flex-grow leading-relaxed">
            <div class="text-gray-700"><b>Angin</b></div>
            <div>(dari) arah barat,</div>
            <div>12.5 km/jam</div>
          </div>
        </div>
      </div>

      <div>
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