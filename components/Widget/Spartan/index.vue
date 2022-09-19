<template>
  <div>
    <div class="text-center">
      <p class="text-4xl text-center">SPARTAN</p>
      <p class="text-2xl text-center border-b pb-2 border-gray-200">
        System Peringatan Kebakaran Hutan dan Lahan
      </p>
    </div>
    <div class="relative mt-6">
      <div
        class="absolute bottom-8 right-8 bg-white/60 rounded p-4"
        style="z-index: 1000"
      >
        <div class="leading-tight">
          <span class="uppercase font-bold">{{ spartanIndex }}</span>
        </div>
        <div class="mb-3">{{ idToName[spartanIndex] }}</div>
        <WidgetSpartanLegendOptions :params="spartanIndex" class="mb-4" />
        <div>Total Titik Panas di Indonesia :</div>
        <div class="flex space-x-4 items-center mt-2">
          <div>
            <img
              src="https://spartan.bmkg.go.id/wp-content/plugins/geo-data/dist/hotspot/burn-2.png"
              alt="low"
            />
          </div>
          <div class="flex">
            <div class="w-20">Rendah</div>
            <div>( {{ totalHotspot.Low }} )</div>
          </div>
        </div>
        <div class="flex space-x-4 items-center mt-2">
          <div>
            <img
              src="https://spartan.bmkg.go.id/wp-content/plugins/geo-data/dist/hotspot/burn-1.png"
              alt="medium"
            />
          </div>
          <div class="flex">
            <div class="w-20">Sedang</div>
            <div>( {{ totalHotspot.Middle }} )</div>
          </div>
        </div>
        <div class="flex space-x-4 items-center mt-2">
          <div>
            <img
              src="https://spartan.bmkg.go.id/wp-content/plugins/geo-data/dist/hotspot/burn.png"
              alt="high"
            />
          </div>
          <div class="flex">
            <div class="w-20">Tinggi</div>
            <div>( {{ totalHotspot.High }} )</div>
          </div>
        </div>
      </div>
      <div class="rounded">
        <Map
          ref="map"
          @mapready="mapReady"
          style="width: 1320px; height: 600px"
        />
      </div>
    </div>
  </div>
</template>

<script>
var axios = require('axios')
var maplibregl = require('maplibre-gl')
import { penjelasanProduct, idToName } from '../../../utils/helperSpartan.js'
export default {
  data() {
    return {
      modelrun: null,
      spartanIndex: 'fwi',
      penjelasan: penjelasanProduct,
      idToName: idToName,
      map: null,
      token: null,
      idTemplate: null,
      totalHotspot: {
        Low: 0,
        Middle: 0,
        High: 0,
      },
      allMarker: {
        Low: [],
        Middle: [],
        High: [],
      },
      flying: null,
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
  mounted() {
    var parentDisplay = this.$parent.$parent.$parent
    this.idTemplate = parentDisplay.obj && parentDisplay.obj.idtemplate

    if (parentDisplay.production) {
      var setting = parentDisplay.responseDisplay.properties.allSetting
      var obj = parentDisplay.obj.idtemplate
      setting[obj].forEach((el) => {
        var key = el.key.split('_')[2]
        if (key == 'province') {
          this.flying = el.value
        } else if (key == 'spartan') {
          this.spartanIndex = el.value.id
        }
      })
    }
    process.nextTick(async () => {
      var self = this
      function IsJsonString(str) {
        try {
          JSON.parse(str)
        } catch (e) {
          return false
        }
        return true
      }
      this.token = await axios.get(
        'https://spartan.bmkg.go.id/api/users/guestlogin'
      )
      var ws = await new WebSocket(`wss://spartan.bmkg.go.id/ws`)
      ws.onopen = function () {
        ws.send(
          JSON.stringify({
            command: 'login',
            data: self.token.data.user.token,
          })
        )
      }
      ws.addEventListener('message', function (event) {
        var that = self
        if (IsJsonString(event.data)) {
          var eventData = JSON.parse(event.data)
          if (eventData.data == 'Welcome') {
            ws.send(
              JSON.stringify({
                command: 'subscribe',
                data: 'all',
              })
            )
          } else {
            var obj = {
              type: 'FeatureCollection',
              features: (eventData.data && eventData.data.features) || {},
            }
            switch (eventData.section) {
              case 'hotspot':
                // code block
                if (!that.dataLayer['Hotspot Indonesia']) {
                  return
                }
                that.addFilterHotspot(obj, that)

                break
              default:
              // code block
            }
          }
        }
      })
    })
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

      self.dataLayer['Hotspot Indonesia'].forEach((el) => {
        var id = el.name
        if (self.allMarker[id].length > 0) {
          self.allMarker[id].forEach((el) => {
            el.remove()
          })
          self.allMarker[id] = []
        }

        el.geojson.features.forEach(function (marker) {
          // create a DOM element for the marker
          var el2 = document.createElement('div')
          el2.className = 'marker'
          el2.style.backgroundImage =
            'url(https://spartan.bmkg.go.id/' + el.icon + ')'
          el2.style.width = 13 + 'px'
          el2.style.height = 13 + 'px'

          // add marker to map
          var marker = new maplibregl.Marker(el2)
            .setLngLat(marker.geometry.coordinates)
            .addTo(self.map)

          self.allMarker[id].push(marker)
        })
      })
    },
    async getSpartanIndex() {
      this.modelrun = await this.$axios.$get(
        'https://spartan.bmkg.go.id/map/modelrun'
      )
      // var map =
      this.map = this.$refs['map'].map
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
      if (this.map.getLayer('spartan')) {
        this.map.removeLayer('spartan')
      }
      if (this.map.getSource('spartan')) {
        this.map.removeSource('spartan')
      }

      if (this.flying) {
        this.map.flyTo({
          // These options control the ending camera position: centered at
          // the target, at zoom level 9, and north up.
          center: [this.flying.longitude, this.flying.latitude],
          zoom: this.flying.zoom || 7,
          bearing: 0,

          // These options control the flight curve, making it move
          // slowly and zoom out almost completely before starting
          // to pan.
          speed: 0.5, // make the flying slow
          curve: 1, // change the speed at which it zooms out

          // This can be any easing function: it takes a number between
          // 0 and 1 and returns another number between 0 and 1.
          easing: function (t) {
            return t
          },

          // this animation is considered essential with respect to prefers-reduced-motion
          essential: true,
        })
      }

      setTimeout(() => {
        this.map.addSource('spartan', obj)
        this.map.addLayer(
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
      }, 500)
    },
    async mapReady() {
      this.getSpartanIndex()
    },
  },
}
</script>