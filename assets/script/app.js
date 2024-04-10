'use strict';

//Elements and Variables
let latitude;
let longitude;
const marker1 = new mapboxgl.Marker();
const button = document.getElementById('tracker');

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2xpbnNraSIsImEiOiJjbHVyZGY2eXYwNjFpMnZuNXRrcGRmcjc3In0.6Qd47pEzatkIT80J1WimVA';
//Map, id = map
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: [-97.138451,49.895077], // starting position [lng, lat]
  style: 'mapbox://styles/mapbox/light-v11',
  zoom: 10, // starting zoom
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
function getCoordinates(position){
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}

//Update Marker
//Removes marker, updates location and adds
function updateMarker(longitude,latitude){
  marker1.remove();
  marker1.setLngLat([longitude, latitude]);
  marker1.addTo(map);
}

//The Error Callback function
function errorHandler(){
  console.log('Unable to retieve location');
}

//Sets maps position and zoom
function getMyLocation(){
  if (navigator.geolocation){
    //Callback functions
    navigator.geolocation.getCurrentPosition(getCoordinates,errorHandler);
    map.flyTo({
      center: [
         longitude, 
         latitude 
      ],
      essential: true,
      zoom: 17
   });
   updateMarker(longitude,latitude);
  }
  else{
    console.log('Geolocation not supported by browser');
  }
}

//Event Listeners
button.addEventListener('click',getMyLocation)
