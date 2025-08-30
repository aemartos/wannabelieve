var directionsService;
var directionsDisplay;

const createMap = (map, {lat,lng}) => {
  map = new google.maps.Map(
    document.getElementById(map), {
      zoom: 14,
      center: {
        lat: lat || 40.4169473,
        lng: lng || -3.7035285
      },
      disableDefaultUI: true,
      clickableIcons: false,
      clickableLabels: false,
      styles: style15_4
    }
  );
  directionsDisplay.setMap(map);
  if(window.phenomena.length > 1) calculateAndDisplayRoute(directionsService, directionsDisplay);
  return map;
}

let map;

// Initialize map after Google Maps API is loaded
const initializeMap = () => {
  // Initialize Google Maps services
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
    polylineOptions: {strokeColor: "#39FF14"}
  });
  
  map = createMap('mainMap', {});
  //console.log(window.phenomena) ;
  loadData(map);
  if (window.phenomena.length > 1) {
    map.fitBounds(calculateBoundsToFitAllMarkers(window.phenomena));
    fixZoom();
  } else if (window.phenomena.length == 1) {
    map.setCenter({lat: window.phenomena[0].location.coordinates[1], lng: window.phenomena[0].location.coordinates[0]});
    //map.setZoom(5);
  }
};

// Initialize map directly since Google Maps loads synchronously
try {
  initializeMap();
} catch (error) {
  console.error('Failed to initialize map in routes:', error);
  // Show user-friendly error message
  const mapContainer = document.getElementById('mainMap');
  if (mapContainer) {
    mapContainer.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">Map loading failed. Please refresh the page or check your internet connection.</div>';
  }
}

/*------------------ CALCULATE ROUTE ---------------*/

function calculateAndDisplayRoute(directionsService, directionsDisplay, currentPosition) {
  var waypoints = window.phenomena.map(phenom => {
    let coords = phenom.location.coordinates;
    return {location: new google.maps.LatLng(coords[1], coords[0]), stopover: true};
  });
  let origin = currentPosition || waypoints.shift().location;
  let destination = waypoints.pop().location;
  directionsService.route({
    origin,
    destination,
    waypoints,
    optimizeWaypoints: true,
    provideRouteAlternatives: true,
    avoidFerries: true,
    avoidHighways: true,
    avoidTolls: true,
    travelMode: 'WALKING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
      //console.log(route);
    } else if (status === 'ZERO_RESULTS') {
      window.alert("You can't create routes across the ocean.");
      var waterCoordinates = window.phenomena.map(phenom => {
        let coords = phenom.location.coordinates;
        return {lat: coords[1], lng: coords[0]};
      });
      var waterPath = new google.maps.Polyline({
        path: waterCoordinates,
        geodesic: false,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      waterPath.setMap(map);
    } else {
      console.log('Directions request failed due to ' + status);
    }
    if (map.getZoom() < 1) map.setCenter({lat: 0, lng: 0});
  });
};


/* ------------ START ROUTE -------------- */

//enable and disable markers to open infoWindow onclick in route detail
const markersFunction = (boolean) => {
  markers.forEach(e => {
    e.setClickable(boolean);
  });
};

// Setup markers directly since Google Maps loads synchronously
try {
  if (map) {
    markersFunction(false);
  }
} catch (error) {
  console.error('Failed to setup markers:', error);
}

//hide and show map
const sections = [...document.getElementsByClassName('section')];

document.getElementById('startRoute').onclick = (el) => {
  isGeolocating = true;
  document.getElementById('mainMap').style.height = "100%";
  document.getElementById('finishRoute').style.display = "inline-block";
  document.getElementById('mapZoom').style.display = "flex";
  document.getElementById('mapOptions').style.display = "flex";
  sections.forEach(e => {
    e.style.display = "none";
  });
  geolocateMe().then((location)=>{
    let originMarker = new google.maps.Marker({
      position: location,
      map,
      icon: '/images/markers/small/markerFlag.png'
    });
    calculateAndDisplayRoute(directionsService, directionsDisplay, location);
  }).finally(() => {
    RTLinterval = setInterval(realTimeLocation, 1000);
    map.setZoom(12);
    markersFunction(true);
  });
};

document.getElementById('finishRoute').onclick = (el) => {
  isGeolocating = false;
  clearInterval(RTLinterval);
  if(meMarker) meMarker.setMap(null);
  fixZoom();
  markersFunction(false);
  document.getElementById('mainMap').style.height = "33%";
  document.getElementById('finishRoute').style.display = "none";
  document.getElementById('mapZoom').style.display = "none";
  document.getElementById('mapOptions').style.display = "none";
  sections.forEach(e => {
    e.style.display = "block";
  });
};
