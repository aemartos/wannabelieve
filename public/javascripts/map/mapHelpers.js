//set min and max zoom to avoid grey areas in the map
const fixZoom = () => {
  const MAX_ZOOM = 14;
  const MIN_ZOOM = 2.3;
  if (map && map.getZoom) {
    if (map.getZoom() > MAX_ZOOM) {
      map.setZoom(MAX_ZOOM);
    } else if (map.getZoom() < MIN_ZOOM) {
      map.setZoom(MIN_ZOOM);
    }
  }
  //console.log(map.getZoom())
};

const calculateBoundsToFitAllMarkers = (phenomena) => {
  return safeGoogleMapsOperation(() => {
    let bounds = new google.maps.LatLngBounds();
    //I need to iterate over all the places in my search to fit the bounds
    for (let i = 0; i < phenomena.length; i++) {
      //search all coordinates
      let coorLoc = phenomena[i].location.coordinates;
      //create geographic area to fit all the markers in the search
      bounds.extend({
        lng: coorLoc[0],
        lat: coorLoc[1]
      });
    }
    return bounds;
  }, null);
};

const markers = [];
const loadData = (map, extra = {}) => {
  if (!map) return;
  
  (extra.phenomena || phenomena).forEach(p => {
    //console.log(p);
    let markerPhenom = addMarker(
      p.name,
      p.description,
      {
        lng: extra.lng || p.location.coordinates[0],
        lat: extra.lat || p.location.coordinates[1]
      },
      map,
      p.type,
      p._id,
      p.sighted,
      p
    );
    markers.push(markerPhenom);
  })
};


const waitForGoogleMaps = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps && window.google.maps.places) {
      resolve();
    } else {
      let attempts = 0;
      const maxAttempts = 100; // 10 seconds timeout
      
      // Check every 100ms if Google Maps Places is loaded
      const checkInterval = setInterval(() => {
        attempts++;
        if (window.google && window.google.maps && window.google.maps.places) {
          clearInterval(checkInterval);
          resolve();
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          reject(new Error('Google Maps Places library failed to load within timeout'));
        }
      }, 100);
    }
  });
};

const safeGoogleMapsOperation = (operation, fallback = null) => {
  if (!!(window.google && window.google.maps && window.google.maps.places)) {
    try {
      return operation();
    } catch (error) {
      console.warn('Google Maps operation failed:', error);
      return fallback;
    }
  } else {
    console.warn('Google Maps not loaded yet');
    return fallback;
  }
};

window.waitForGoogleMaps = waitForGoogleMaps;
window.safeGoogleMapsOperation = safeGoogleMapsOperation;
