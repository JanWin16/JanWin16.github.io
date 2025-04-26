Tolet map = L.map('map').setView([58.373523, 26.716045], 12)

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'OpenStreetMap contributors',
})
osm.addTo(map)

 // add geoJSON polygons layer
 async function addDistrictsGeoJson(url) {
  const response = await fetch(url)
  const data = await response.json()
  const polygons = L.geoJson(data, {
    onEachFeature: popUPinfo,
    style: polygonStyle,
  })
  polygons.addTo(map)
}
addDistrictsGeoJson('geojson/tartu_city_districts_edu.geojson')

// Default map view
function defaultMapSettings() {
  map.setView([58.373523, 26.716045], 12)
}


// add geoJSON layer
async function addGeoJson(url) {
  const response = await fetch(url)
  const data = await response.json()
  L.choropleth(data, {
    valueProperty: 'OBJECTID',
    scale: ['#ffffff', '#ff9900'],
    steps: 5,
    mode: 'q', // q for quantile, e for equidistant
    style: {
      color: '#fff',
      weight: 2,
      fillOpacity: 0.8,
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        `${feature.properties.NIMI}<br>Cell Towers: ${feature.properties.OBJECTID}`
      );
    },
  }).addTo(map)
}

addGeoJson('geojson/tartu_city_districts_edu.geojson')





  
