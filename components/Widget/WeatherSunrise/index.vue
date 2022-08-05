<template>
  <div>
    <div>
      <div
        class="bg-sky-100 rounded-t-lg flex space-x-4 items-center px-4 py-4"
      >
        <div class="flex-grow">
          <div class="font-bold text-lg">Batununggal</div>
          <div><small>Bandung, Indonesia</small></div>
        </div>
        <div class="font-bold text-right">07:00 AM</div>
      </div>
      <div class="bg-white px-4 pb-4 rounded-b-lg">
        <div class="flex items-end pb-2 border-b border-gray-600 pt-8">
          <div class="flex-grow text-sky-500 font-bold text-4xl">
            23<sup>o</sup>C
          </div>
          <div class="flex-none"><small>Cloudy</small></div>
        </div>
        <div class="pt-2">
          <div class="font-bold">Chance of rain</div>
          <div class="py-2 flex space-x-4 items-center" v-for="i in 4" :key="i">
            <div class="font-bold flex-none"><small>7 PM</small></div>
            <div
              class="flex-grow bg-sky-100 rounded-full w-full py-2.5 relative"
            >
              <div
                class="w-7/12 bg-sky-500 py-2.5 top-0 absolute rounded-full"
              ></div>
            </div>
            <div class="font-bold flex-none"><small>50%</small></div>
          </div>
        </div>
        <div class="flex mt-4">
          <div class="flex-grow font-bold">Sunrise & Sunset</div>
          <div class="flex-none">Bandung</div>
        </div>
        <div class="bg-sky-700 mt-4 rounded-lg p-4 flex items-center space-x-6">
          <div>
            <img src="/general3/sunrise.svg" class="w-8" />
          </div>
          <div class="text-white">
            <div>Sunrise</div>
            <div class="text-xl flex space-x-3">
              <div>4.20 AM</div>
              <div><small>4 hours ago</small></div>
            </div>
          </div>
        </div>
        <div class="bg-sky-700 mt-4 rounded-lg p-4 flex items-center space-x-6">
          <div>
            <img src="/general3/sunset.svg" class="w-8" />
          </div>
          <div class="text-white">
            <div>Sunset</div>
            <div class="text-xl flex space-x-3">
              <div>4.20 AM</div>
              <div><small>4 hours ago</small></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>