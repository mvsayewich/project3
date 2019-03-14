// Function to determine marker size based on population
function markerSize(house) {
  return house/100;
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
        name: "Greater Toronto Area",
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
          name: "Hamilton-Burlington",
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
          name: "Oakville-Milton",
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
var AptMarkers = [];
var TownhouseMarkers =[];
var Two_StoreyMarkers =[];
var One_StoreyMarkers =[];
var Single_FamilyMarkers =[];
var CompositeMarkers=[];

for (var i = 0; i < locations.length; i++) {
  // Setting the marker radius for the city by passing population into the markerSize function
  AptMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "purple",
      fillColor: "purple",
      radius: markerSize(locations[i].city.Apartment*5)
    })
  );
  TownhouseMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "yellow",
      fillColor: "yellow",
      radius: markerSize(locations[i].city.Townhouse*6)
    })
  );
  Two_StoreyMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "red",
      fillColor: "red",
      radius: markerSize(locations[i].city.Two_Storey*8)
    })
  );

  One_StoreyMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "blue",
      fillColor: "blue",
      radius: markerSize(locations[i].city.One_Storey*9)
    })
  );

  Single_FamilyMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "orange",
      fillColor: "orange",
      radius: markerSize(locations[i].city.Single_Family*12)
    })
  );

  CompositeMarkers.push(
    L.circle(locations[i].coordinates, {
      stroke: false,
      fillOpacity: 0.75,
      color: "#f06bb4",
      fillColor: "#f06bb4",
      radius: markerSize(locations[i].city.Composite*15)
    })
  );

  }

// Define variables for our base layers
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?" + "access_token=pk.eyJ1IjoicHVybmltYWNoYW5kZWwiLCJhIjoiY2pzMmY3djg2MjRpbDQ5bWxmbzJ0bjNvaCJ9.ocFJPfl7pMGeXxRaPj3esA", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 10000,
  id: "mapbox.streets",
  //accessToken: ON_API_KEY
});

/// Create separate layer groups
var Apartment = L.layerGroup(AptMarkers);
var Townhouse =L.layerGroup(TownhouseMarkers);
var Two_Storey =L.layerGroup(Two_StoreyMarkers);
var One_Storey =L.layerGroup(One_StoreyMarkers);
var Single_Family=L.layerGroup(Single_FamilyMarkers);
var Composite =L.layerGroup(CompositeMarkers);

// Create a baseMaps object
var baseMaps = {
    "Street Map": streetmap   
  };
  
  // Create an overlay object
  var overlayMaps = {
    "Apartment": Apartment,
    "Town House": Townhouse,
    "Two Storey House": Two_Storey,
    "One Storey House": One_Storey,
    "Single Family House": Single_Family,
    "Composite": Composite
  };
  
// Define a map object
var myMap = L.map("map", {
    center: [45.4215, -75.6972],
    zoom: 6,
    layers: [streetmap, Composite, Single_Family, One_Storey, Two_Storey, Townhouse, Apartment]
  });
  
  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
    
