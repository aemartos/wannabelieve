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
  try {
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
  } catch (error) {
    console.warn('Google Maps operation failed:', error);
    return null;
  }
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

// Global error handler for Google Maps runtime issues
window.addEventListener('error', (event) => {
  if (event.message && event.message.includes('Google Maps')) {
    console.error('Google Maps error detected:', event);
  }
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message && event.reason.message.includes('Google Maps')) {
    console.error('Unhandled Google Maps promise rejection:', event.reason);
    event.preventDefault(); // Prevent the default error handling
  }
});
