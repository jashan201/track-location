'use strict';


//Elements and Variables
let latitude = 0;
let longitude = 0
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2xpbnNraSIsImEiOiJjbHVyZGY2eXYwNjFpMnZuNXRrcGRmcjc3In0.6Qd47pEzatkIT80J1WimVA';
//Map, id = map
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: [0, 0], // starting position [lng, lat]
  style: 'mapbox://styles/mapbox/light-v11',
  zoom: 18, // starting zoom
  pitch: 40,
  style: "mapbox://styles/mapbox/navigation-night-v1", // style URL
});

//Show Controls
map.addControl(new mapboxgl.NavigationControl());
map.addControl(
  new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
  })
);

//Get Coordinates
function getLocation(position){
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}

//The Error Callback function
function errorHandler(){
  console.log('Unable to retieve location');
}

function getMyLocation(){
  if (navigator.geolocation){
    //Callback functions
    navigator.geolocation.getCurrentPosition(getLocation,errorHandler);
  }
  else{
    console.log('Geolocation not supported by browser');
  }

  // console.log('coordinate',latitude,longitude);
  
  map.flyTo({
    center: [
       longitude, 
       latitude 
    ],
    essential: true,
    zoom: 17
 });
}

const button = document.getElementById('tracker');
button.addEventListener('click',getMyLocation)
