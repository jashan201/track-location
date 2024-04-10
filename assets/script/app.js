// import classes from './class.js';
// import * as utils from './utils.js';

const mapDisplay = document.querySelector('.map-display');
let latitude = 0;
let longitude = 0


mapboxgl.accessToken = 'pk.eyJ1IjoiZ2xpbnNraSIsImEiOiJjbHVyZGY2eXYwNjFpMnZuNXRrcGRmcjc3In0.6Qd47pEzatkIT80J1WimVA';

const map = new mapboxgl.Map({
  container: "map", // container ID
  center: [0, 0], // starting position [lng, lat]
  style: 'mapbox://styles/mapbox/light-v11',
  zoom: 20, // starting zoom
  pitch: 40,
  style: "mapbox://styles/mapbox/navigation-night-v1", // style URL
});



map.addControl(new mapboxgl.NavigationControl());
// map.scrollZoom.disable();
map.addControl(
  new mapboxgl.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
  })
);



map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});

// The following values can be changed to control rotation speed:

// At low zooms, complete a revolution every two minutes.
const secondsPerRevolution = 240;
// Above zoom level 5, do not rotate.
const maxSpinZoom = 5;
// Rotate at intermediate speeds between zoom levels 3 and 5.
const slowSpinZoom = 3;

let userInteracting = false;
const spinEnabled = true;

function spinGlobe() {
    const zoom = map.getZoom();
    if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
            // Slow spinning at higher zooms
            const zoomDif =
                (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
        }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        // Smoothly animate the map over one second.
        // When this animation is complete, it calls a 'moveend' event.
        map.easeTo({ center, duration: 1000, easing: (n) => n });
    }
}

// Pause spinning on interaction
map.on('mousedown', () => {
    userInteracting = true;
});
map.on('dragstart', () => {
    userInteracting = true;
});

// When animation is complete, start spinning if there is no ongoing interaction
map.on('moveend', () => {
    spinGlobe();
});



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

  console.log('coordinate',latitude,longitude);
  
  map.flyTo({
    center: [
       longitude, 
       latitude 
    ],
    essential: true // this animation is considered essential with respect to prefers-reduced-motion
 });

}

const button = document.getElementById('tracker');
button.addEventListener('click',getMyLocation)
// zoomIn.addEventListener('click', zoomInMap);
//-90 to 90 for latitude and -180 to 180 for longitude.