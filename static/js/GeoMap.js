// Function to determine marker size based on population
function markerSize(house) {
  return house/20;
}
// An array containing all of the information needed to create city and state markers
var locations = [
    {
      coordinates: [44.3894, -79.6903],
      city: {
        name: "Barrie and District",
        Composite:464400,
        Single_Family: 474700,
        One_Storey:459800,
        Two_Storey: 487500,
        Townhouse:297900,
        Apartment:352300
      }
    },
    {
      coordinates: [44.0384, -79.2000],
      city: {
        name: "Greater Toronoto Area",
        Composite:761800,
        Single_Family: 856000,
        One_Storey:742900,
        Two_Storey: 896300,
        Townhouse:568900,
        Apartment:506900
      }
    },
    {
        coordinates: [43.5448, -80.2482],
        city: {
          name: "Guelph",
          Composite:522300,
          Single_Family: 536800,
          One_Storey:505600,
          Two_Storey: 556100,
          Townhouse:375400,
          Apartment:334600
  
        }
    },
    {
        coordinates: [43.2557, -79.8711],
        city: {
          name: "Hamilton_Burlington",
          Composite:582300,
          Single_Family: 620700,
          One_Storey:560800,
          Two_Storey: 656400,
          Townhouse:457800,
          Apartment:390200
  
        }
    },
    {
        coordinates: [43.0896, -79.0849],
        city: {
          name: "Niagara Region",
          Composite:391300,
          Single_Family: 398500,
          One_Storey:387600,
          Two_Storey: 413200,
          Townhouse:316400,
          Apartment:277600
        }
    },
    {
        coordinates: [43.4675, -79.6877],
        city: {
          name: "Oakville_Milton",
          Composite:962800,
          Single_Family: 998900,
          One_Storey:962900,
          Two_Storey: 1006000,
          Townhouse:629000,
          Apartment:541900
        }
    },
    {
        coordinates: [45.4215, -75.6972],
        city: {
          name: "Ottawa",
          Composite:396300,
          Single_Family: 434700,
          One_Storey:389700,
          Two_Storey: 455400,
          Townhouse:263600,
          Apartment:287900
        }
    },
  ];
  
 // Define arrays to hold created city and state markers
var cityMarkers = [];
for (var i = 0; i < locations.length; i++) {
  // Setting the marker radius for the city by passing population into the markerSize function
  cityMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "purple",
      fillColor: "purple",
      radius: markerSize(locations[i].city.Apartment)
    })
  );
}
// Define variables for our base layers
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?" + "access_token=pk.eyJ1IjoicHVybmltYWNoYW5kZWwiLCJhIjoiY2pzMmY3djg2MjRpbDQ5bWxmbzJ0bjNvaCJ9.ocFJPfl7pMGeXxRaPj3esA", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  //accessToken: GEO_API_KEY
});
var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?" + "access_token=pk.eyJ1IjoicHVybmltYWNoYW5kZWwiLCJhIjoiY2pzMmY3djg2MjRpbDQ5bWxmbzJ0bjNvaCJ9.ocFJPfl7pMGeXxRaPj3esA", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  //accessToken: GEO_API_KEY
});
// Create separate layer groups
var cities = L.layerGroup(cityMarkers);
// Create a baseMaps object
var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };
  
  // Create an overlay object
  var overlayMaps = {
    "City House Price": cities
    
  };
  
// Define a map object
var myMap = L.map("map", {
    center: [45.4215, -75.6972],
    zoom: 5,
    layers: [streetmap, cities]
  });
  
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);