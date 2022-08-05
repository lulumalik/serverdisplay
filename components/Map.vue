<template>
  <div>
    <div id="map" class="h-full w-full"></div>
  </div>
</template>

<script>
var maplibregl;
import "maplibre-gl/dist/maplibre-gl.css";
if (process.client) {
  maplibregl = require("maplibre-gl");
}
export default {
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    process.nextTick(() => {
      this.map = new maplibregl.Map({
        container: "map", // container id
        style:
          "https://api.maptiler.com/maps/streets/style.json?key=zL67rlwPleFgF3BK3rIC",
        center: [115, 0], // starting position
        zoom: 4, // starting zoom
      });
      this.map.on("load", () => {

      this.$emit('mapready', true)
        // Insert the layer beneath any symbol layer.
        var layers = this.map.getStyle().layers;

        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
          if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
            labelLayerId = layers[i].id;
            break;
          }
        }

        // initial source
        this.map.addSource("vector_layer_", {
          type: "vector",
          url: "https://tiles.circlegeo.com/data/kotkab.json",
        });
        this.map.addSource("radar", {
          type: "raster",
          tiles: [
            "https://rami.bmkg.go.id/api/rgb_req/HIMA_EH/EH/0/202206290240/202206290302/{z}/{x}/{y}.png",
          ],
          scheme: "tms",
          attribution:
            'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
        });

        this.map.addLayer(
          {
            id: "3d-buildings",
            source: "openmaptiles",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",

              // use an 'interpolate' expression to add a smooth transition effect to the
              // buildings as the user zooms in
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 0.6,
            },
          },
          labelLayerId
        );
      });

      this.map.addControl(new maplibregl.NavigationControl());
    });
  },
};
</script>