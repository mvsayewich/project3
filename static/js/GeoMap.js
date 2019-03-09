
// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?" + "access_token=pk.eyJ1IjoidGlrb3o4NiIsImEiOiJjanMyZjhidmQyNGVvNDNucm1wbXI5d2FrIn0._W0mEArHKzmv0DxqqOEflA", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  //accessToken: API_KEY
}).addTo(myMap);

//var mergedDF = d3.csv("/db/mergeddataset2.csv").then(function(data){
   
 // console.log(data);
  //data.filter(function(row) {
    //  return row['YYYYMMDD'] == '20190101'; })
  //});

//console.log(mergedDF);
  // An array containing each city's name, location and the most recent price
var cities = [{
  location: [44.391049, -79.686561],
  name: "Barrie",
  price: "297,900"
},
{
  location: [51.046117, -114.061580],
  name: "Calgary",
  price: "284,300"
},
{
  location: [53.566622, -113.484256],
  name: "Edmonton",
  price: "213,100"
},
{
  location: [49.171320, -121.953047],
  name: "Fraser Valley",
  price: "522,100"
},
{
  location: [46.094629, -64.774260],
  name: "Moncton",
  price: "145,600"
},
{
  location: [45.509167, -73.554354],
  name: "Montreal",
  price: "425,000"
},{
  location: [43.653673, -79.384058],
  name: "Toronto",
  price: "568,900"
},{
  location: [49.264816, -123.113602],
  name: "Vancouver",
  price: "800,600"
},{
  location: [43.543536, -80.248445],
  name: "Guelph",
  price: "375,400"
},{
  location: [43.255640, -79.873157],
  name: "Hamilton-Burlington",
  price: "457,800"
},{
  location: [49.212655, -123.142828],
  name: "Lower Mainland",
  price: "675,700"
},{
  location: [43.040254, -79.260213],
  name: "Niagara Region",
  price: "316,400"
},{
  location: [43.491452, -79.749416],
  name: "Oakville-Milton",
  price: "629,000"
},{
  location: [45.401274, -75.705632],
  name: "Ottawa",
  price: "263,600"
},{
  location: [50.447118, -104.617468],
  name: "Regina",
  price: "230,100"
},{
  location: [52.130910, -106.656897],
  name: "Saskatoon",
  price: "217,200"
},{
  location: [49.685952, -124.999710],
  name: "Vancouver Island",
  price: "407,600"
},{
  location: [48.432150, -123.365743],
  name: "Victoria",
  price: "587,500"
}
];

// Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
for (var i = 0; i < cities.length; i++) {
  var city = cities[i];
  L.marker(city.location)
    .bindPopup("<h1>" + city.name + "</h1> <hr> <p>Price " + city.price "</p>")
    .addTo(myMap);
};