<template>
  <div
    style="background-image: url('weather.png')"
    class="h-full w-full flex items-center justify-center font-color relative"
  >
    <div
      class="
        absolute
        top-8
        left-0
        mx-auto
        flex
        items-center
        justify-center
        space-x-6
        right-0
      "
    >
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
                <div class="text-4xl flex space-x-3">
                  <div>{{ val }}</div>
                  <div>{{ parseUnit[key] }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
            
          <div class="font-semibold text-xl ml-5 mb-5">Average Weekly Temperature</div>
          <div id="chart" class="bg-white rounded-lg px-4 py-4">

            <apexchart
              type="area"
              height="250"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
        </div>
      </div>
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
            <div
              class="py-2 flex space-x-4 items-center"
              v-for="i in 4"
              :key="i"
            >
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
      parseIcon: {
        wSpd: '/general3/wind.svg',
        pressure: '/general3/pressure.svg',
        rain: '/general3/rain.svg',
        uv: '/general3/uv.svg',
      },
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'area',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '2018-09-19T00:00:00.000Z',
            '2018-09-19T01:30:00.000Z',
            '2018-09-19T02:30:00.000Z',
            '2018-09-19T03:30:00.000Z',
            '2018-09-19T04:30:00.000Z',
            '2018-09-19T05:30:00.000Z',
            '2018-09-19T06:30:00.000Z',
          ],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
      },
    }
  },
}
</script>