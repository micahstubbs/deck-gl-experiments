mapboxgl.accessToken =
  'pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoiY2pudzRtaWloMDAzcTN2bzN1aXdxZHB5bSJ9.2bkj3IiRC8wj3jLThvDGdA'

const { MapboxLayer, HexagonLayer } = deck

const map = new mapboxgl.Map({
  container: document.body,
  style: 'mapbox://styles/mapbox/dark-v9',
  center: [-1.4157, 52.2324],
  zoom: 6,
  pitch: 40.5
})

const DATA_URL =
  'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'
const OPTIONS = ['radius', 'coverage', 'upperPercentile']
const COLOR_RANGE = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
]
const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
}

let hexagonLayer

map.on('load', () => {
  hexagonLayer = new MapboxLayer({
    type: HexagonLayer,
    id: 'heatmap',
    data: d3.csv(DATA_URL),
    radius: 1000,
    coverage: 1,
    upperPercentile: 100,
    colorRange: COLOR_RANGE,
    elevationRange: [0, 1000],
    elevationScale: 250,
    extruded: true,
    getPosition: d => [Number(d.lng), Number(d.lat)],
    lightSettings: LIGHT_SETTINGS,
    opacity: 1
  })

  map.addLayer(hexagonLayer, 'waterway-label')
})

OPTIONS.forEach(key => {
  document.getElementById(key).oninput = evt => {
    const value = Number(evt.target.value)
    document.getElementById(key + '-value').innerHTML = value
    if (hexagonLayer) {
      hexagonLayer.setProps({ [key]: value })
    }
  }
})
