<template>
    <div>
        <div class="absolute border flex space-x-4 items-center border-black bg-white p-4 bottom-4 left-4 rounded-lg"
            style="z-index:1000">
            <div>
                <img src="/bmkg.png" width="50" alt="bmkg" />
            </div>
            <div class="leading-none">
                <div class="text-xl">Satellite Himawari - 9</div>
                <div class="color-legend-container" style="margin-top:10px;">
                    <div id="radar-legend" class="color-legend"></div>
                    <div id="radar-legend-labels" class="color-legend-labels"></div>
                </div>
            </div>
        </div>
        <div id="maps" class="rounded-xl" style="width:1366px;height:768px"></div>
    </div>
</template>

<script>
var maplibregl = require('maplibre-gl')
export default {
    data() {
        return {
            dates: null
        }
    },
    methods: {
        fetchData() {
            if (this.map.getLayer('satellite')) {
                this.map.removeLayer('satellite')
            }
            if (this.map.getSource('satellite')) {
                this.map.removeSource('satellite')
            }
            fetch('https://satellite.bmkg.go.id/api22/modelrun') // Replace with your API URL
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    this.map.addSource('satellite', {
                        type: 'raster',
                        tiles: [
                            `https://satellite.bmkg.go.id/api22/tile/{z}/{x}/{y}.png?tiletype=himawari9&modelname=himawari9&param=EH&baserun=${data.himawari9[0]}`,
                        ],
                        scheme: 'tms',
                        tileSize: 256,
                    })
                    this.map.addLayer({
                        id: 'satellite',
                        type: 'raster',
                        source: 'satellite',
                        minzoom: 0,
                        maxzoom: 22,
                    }, "indocg")
                    this.dates = data.himawari9[0]
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    // document.getElementById('data-container').innerHTML = 'Error loading data.';
                });
        }
    },
    mounted() {
        process.nextTick(() => {
            this.map = new maplibregl.Map({
                container: 'maps', // container id
                style: 'https://gis.co.id/tiles/circlegeo_3d',
                center: [120, 0], // starting position
                zoom: 4, // starting zoom
            })
            this.map.on('load', () => {
                this.map.addSource("contours", {
                    type: "vector",
                    url: "https://tiles.circlegeo.com/data/indocg.json",
                });

                this.map.addLayer({
                    id: "indocg",
                    type: "line",
                    source: "contours",
                    "source-layer": "indocg",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": "#fff",
                        "line-width": 2.5,
                    },
                });

                this.fetchData()

                const colorData = {
                    contour: [
                        [-100, 233, 63, 51],
                        [-80, 234, 84, 86],
                        [-75, 248, 212, 184],
                        [-69, 246, 195, 140],
                        [-62, 242, 159, 51],
                        [-56, 235, 90, 51],
                        [-48, 205, 155, 40],
                        [-41, 197, 187, 36],
                        [-34, 156, 211, 19],
                        [-28, 133, 242, 0],
                        [-21, 118, 231, 135],
                        [-13, 95, 193, 146],
                        [-7, 67, 175, 251],
                        [0, 73, 135, 251],
                        [8, 52, 98, 180],
                        [14, 14, 72, 130],
                        [21, 0, 0, 0],
                        [60, 0, 0, 0],
                    ]
                };

                function generateLegend(colors, id) {
                    const legend = document.getElementById(`${id}-legend`);
                    const labels = document.getElementById(`${id}-legend-labels`);

                    // Create gradient string
                    let gradient = 'linear-gradient(to right';
                    colors.forEach((stop, index) => {
                        gradient += `, rgba(${stop[1]},${stop[2]},${stop[3]},1) ${index / (colors.length - 1) * 100}%`;
                    });
                    gradient += ')';
                    legend.style.background = gradient;

                    // Add labels
                    colors.forEach(stop => {
                        const span = document.createElement('span');
                        span.textContent = stop[0];
                        labels.appendChild(span);
                    });
                }

                generateLegend(colorData.contour, 'radar')

                this.map.scrollZoom.disable();
            })

        })
    }
}
</script>

<style>
.color-legend {
    height: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    position: relative;
}

.color-legend-labels {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    top: 15px;
}

.color-legend-labels span {
    font-size: 0.5rem;
    color: #000;
    /* text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); */
}

.color-legend-container {
    position: relative
}
</style>