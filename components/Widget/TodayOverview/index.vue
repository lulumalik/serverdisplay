<template>
  <div>
    <div>
      <div class="font-semibold text-xl ml-5 mb-5">Today Overview</div>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div
          class="bg-white rounded-lg px-8 py-4 flex items-center space-x-6"
          v-for="(val, key) in todays"
          :key="key"
        >
          <div>
            <img :src="parseIcon[key]" class="w-8" />
          </div>
          <div>
            <div>{{ parseKey[key] }}</div>
            <div class="text-xl flex space-x-1">
              <div>{{ val }}</div>
              <div>{{ parseUnit[key] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todays: {
        wSpd: 12,
        pressure: 150,
        rain: 25,
        uv: 2.5,
      },
      parseIcon: {
        wSpd: '/general3/wind.svg',
        pressure: '/general3/pressure.svg',
        rain: '/general3/rain.svg',
        uv: '/general3/uv.svg',
      },
      parseKey: {
        wSpd: 'Wind Speed',
        pressure: 'Pressure',
        rain: 'Rain Chance',
        uv: 'UV Index',
      },
      parseUnit: {
        wSpd: 'km/h',
        pressure: 'hpa',
        rain: '%',
        uv: '',
      },
    }
  },
}
</script>