<template>
  <div class="flex space-x-4">
    <div class="flex-none">
      <Map ref="map" @mapready="mapReady" style="width: 640px; height: 360px" />
    </div>
    <div class="flex-grow p-6">
      <div>
        <p class="text-4xl text-center">SPARTAN</p>
        <p class="text-xl text-center border-b pb-2 border-gray-200">
          System Peringatan Kebakaran Hutan dan Lahan
        </p>
        <div class="text-center mt-4 leading-tight">
          <small>
            <span
              >{{ idToName[spartanIndex] }},
              {{ penjelasan[spartanIndex] }}</span
            >
          </small>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
var axios = require('axios')
import { penjelasanProduct, idToName } from '../../../utils/helperSpartan.js'
export default {
  data() {
    return {
      modelrun: null,
      spartanIndex: 'fwi',
      penjelasan: penjelasanProduct,
      idToName: idToName,
      dataLayer: {
        'Hotspot Indonesia': [
          {
            name: 'Low',
            id: 'Rendah',
            icon: '/wp-content/plugins/geo-data/dist/hotspot/burn-2.png',
            geojson: {},
          },
          {
            name: 'Middle',
            id: 'Sedang',
            icon: '/wp-content/plugins/geo-data/dist/hotspot/burn-1.png',
            geojson: {},
          },
          {
            name: 'High',
            id: 'Tinggi',
            icon: '/wp-content/plugins/geo-data/dist/hotspot/burn.png',
            geojson: {},
          },
        ],
      },
    }
  },
  methods: {
    parseTime(date) {
      var split = date.split('T')
      var date = split[0]
      var time = split[1]
      var splitDate = date.split('-').join('')
      var splitTime = time.split(':').splice(0, 2).join('')
      return splitDate + splitTime
    },
    getRasterSource(val) {
      return {
        type: 'raster',
        tiles: [val],
        scheme: 'tms',
        attribution:
          'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
      }
    },
    addFilterHotspot(res, self) {
      var percaya7 = {
        type: 'FeatureCollection',
        features: [],
      }
      var percaya8 = {
        type: 'FeatureCollection',
        features: [],
      }
      var percaya9 = {
        type: 'FeatureCollection',
        features: [],
      }

      res.features.forEach((el) => {
        if (el.properties.Kepercayaan == 7) {
          percaya7.features.push(el)
        } else if (el.properties.Kepercayaan == 8) {
          percaya8.features.push(el)
        } else if (el.properties.Kepercayaan == 9) {
          percaya9.features.push(el)
        }
      })

      self.totalHotspot = {
        Low: percaya7.features.length,
        Middle: percaya8.features.length,
        High: percaya9.features.length,
      }

      self.dataLayer['Hotspot Indonesia'][0].geojson = percaya7
      self.dataLayer['Hotspot Indonesia'][1].geojson = percaya8
      self.dataLayer['Hotspot Indonesia'][2].geojson = percaya9

      console.log(self.dataLayer['Hotspot Indonesia'])
    },
    async mapReady() {
      this.modelrun = await this.$axios.$get(
        'https://spartan.bmkg.go.id/map/modelrun'
      )
      var map = this.$refs['map'].map
      var currentDate = new Date().toISOString().split('T')[0] + 'T00:00:00Z'
      // console.log(this.parseTime(this.modelrun['spartan'][0]))
      var obj = this.getRasterSource(
        'https://spartan.bmkg.go.id/map/rgb_req/spartan/' +
          this.spartanIndex +
          '/0/' +
          this.parseTime(this.modelrun['spartan'][0]) +
          '/' +
          this.parseTime(currentDate) +
          '/{z}/{x}/{y}.png'
      )
      map.addSource('spartan', obj)
      map.addLayer(
        {
          id: 'spartan',
          type: 'raster',
          source: 'spartan',
          paint: {
            'raster-opacity': 0.8,
          },
        },
        'place_label_other'
      )
      const token = await axios.get('https://spartan.bmkg.go.id/api/users/guestlogin')
      console.log(token)
      const res = await axios.get('https://spartan.bmkg.go.id/api/data/hotspot/getlatest', {
        headers: {
          Authorization: `Bearer ${token.data.user.token}`,
        },
      })
      console.log(res)
      // axios.get('https://spartan.bmkg.go.id/api/data/hotspot/getlatest').then((res) => {
      //   this.addFilterHotspot(res, self)
      // })
      //   https://spartan.bmkg.go.id/map/rgb_req/spartanobs/fwi/0/202209080000/202209080000/5/25/17.png
    },
  },
}
</script>