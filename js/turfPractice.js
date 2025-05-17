import { pointsCollection } from "../js/points.js"

// File: js/turfPractice.js
function turfFunctions(map) {
  console.log('This text is from a module')
  alert('Hello from my module!')

    // define point coordinates
    const pointCoords = [26.71552, 58.37393]
    // define a point
    const myPoint = turf.point(pointCoords)
    // convert the point to geoJSON object
    const geoJSON_point = L.geoJSON(myPoint)
    // add the geoJSON object to the map
    geoJSON_point.addTo(map)

    const pondPointCoords = [26.71489, 58.37439];
    const pondPoint = turf.point(pondPointCoords);
    const geoJSON_pondPoint = L.geoJSON(pondPoint);
    geoJSON_pondPoint.addTo(map); 
    
  // Define line coordinates
  const lineCoords = [
    [26.71379, 58.37476],
    [26.71554, 58.37349],
    [26.71553, 58.37434],
    [26.71630, 58.37378],
    [26.71473, 58.37407]
  ];

  // Define the line object using Turf.js
  const myLine = turf.lineString(lineCoords);
  // Convert the line to a GeoJSON object
  const geoJSON_line = L.geoJSON(myLine);
  // Add the GeoJSON line to the map
  geoJSON_line.addTo(map);

// define polygon coordinates
const polygonCoords = [[
  [26.71355, 58.37468],
  [26.71404, 58.37430],
  [26.71433, 58.37429],
  [26.71550, 58.37345],
  [26.71660, 58.37388],
  [26.71615, 58.37420],
  [26.71589, 58.37431],
  [26.71552, 58.37461],
  [26.71521, 58.37496],
  [26.71480, 58.37481],
  [26.71449, 58.37502],
  [26.71355, 58.37468]
]]
// define polygon object
const myPolygon = turf.polygon(polygonCoords);
// Convert the polygon to GeoJSON object
const geoJSON_polygon = L.geoJSON(myPolygon);
// Add the GeoJSON polygon to the map
geoJSON_polygon.addTo(map);



const options = { units: 'meters' };
const distance = turf.distance(myPoint, pondPoint, options);
const distanceRounded = Math.round(distance);
const roundedToTwoDecimals = Math.round(distance * 100) / 100;
//console.log(`rounded to nearest integer: ${distanceRounded}`)
//console.log(`rounded to two decimal points: ${roundedToTwoDecimals}`)

const areaMeasurement = turf.area(myPolygon)
const areaRounded = Math.round(areaMeasurement)
//console.log(`Area without rounding: ${areaMeasurement}`)
//console.log(`Rounded area is ${areaRounded} square meters`)

// Buffer for the point
const statueBuffer = turf.buffer(myPoint, 20, { units: 'meters' });
//L.geoJSON(statueBuffer).addTo(map); // ← comment this out if needed

// Buffer for the line
const lineBuffer = turf.buffer(myLine, 10, { units: 'meters' });
//L.geoJSON(lineBuffer).addTo(map); // ← comment this out if needed

// Buffer for the polygon
const polygonBuffer = turf.buffer(myPolygon, 5, { units: 'meters' });
//L.geoJSON(polygonBuffer).addTo(map); // ← comment this out if needed

// Optional: Negative buffer example
const negativePolygonBuffer = turf.buffer(myPolygon, -5, { units: 'meters' });
//L.geoJSON(negativePolygonBuffer).addTo(map);

const newPointCoords = [26.71216, 58.37428];
const myNewPoint = turf.point(newPointCoords);
const geoJSON_newPoint = L.geoJSON(myNewPoint);
//geoJSON_newPoint.addTo(map);

// create a feature collection
const features = turf.featureCollection([myPoint, myNewPoint, myLine, myPolygon])
// create the envelope
const enveloped = turf.envelope(features)
// add to map
//L.geoJSON(enveloped).addTo(map)


const points = turf.points(pointsCollection);
//L.geoJSON(points).addTo(map);

const pointsWithinBorders = turf.pointsWithinPolygon(points, myPolygon);
// this should log an object that contains all the features within the park polygon
console.log(pointsWithinBorders);
L.geoJSON(pointsWithinBorders).addTo(map)

map.on('click', function(event) {
  console.log(`[${event.latlng.lng}, ${event.latlng.lat}]`)
});

//map.on('click', function(event) {
  //console.log(`[${event.latlng.lng}, ${event.latlng.lat}]`)
  // define coordinates of the point
  //let pointCoords = [event.latlng.lng, event.latlng.lat]
  // create a turf point
  //let turfPoint = turf.point(pointCoords)
  // convert the point to GeoJSON format and add it to the map
  //L.geoJSON(turfPoint).addTo(map)
//})

// Own new Centroid Function
const newPolygonCoords = [
  [26.712965815931966, 58.37430870052085],
  [26.711753457457235, 58.37393988150288],
  [26.711056083113363, 58.37352038037641],
  [26.71152278748196, 58.37325572609331],
  [26.71215391139413, 58.37311903418557],
  [26.712947845262537, 58.37295855074457],
  [26.713967084688196, 58.373073986275806],
  [26.714541077417387, 58.37350475455835],
  [26.713773965639128, 58.37401998030339],
  [26.712965815931966, 58.37430870052085]
];

// Create a Turf polygon from the new coordinates
const newPolygon = turf.polygon([newPolygonCoords]);

// Use Turf's center function to find the center of the polygon
const polygonCenter = turf.center(newPolygon);

// Log the center point coordinates to the console
console.log('Center of the polygon:', polygonCenter.geometry.coordinates);

// Optionally, add the center point to the map
L.geoJSON(polygonCenter).addTo(map);
L.geoJSON(newPolygon).addTo(map)
}

export {turfFunctions}
