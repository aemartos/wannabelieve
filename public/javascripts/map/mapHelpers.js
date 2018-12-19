//set min and max zoom to avoid grey areas in the map
const fixZoom = () => {
  const MAX_ZOOM = 14;
  const MIN_ZOOM = 2.3;
  if (map.getZoom() > MAX_ZOOM) {
    map.setZoom(MAX_ZOOM);
  } else if (map.getZoom() < MIN_ZOOM) {
    map.setZoom(MIN_ZOOM);
  }
  //console.log(map.getZoom())
};

const calculateBoundsToFitAllMarkers = (phenomena) => {
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
};

const markers = [];
const loadData = (map, extra = {}) => {
  (extra.phenomena || phenomena).forEach(p => {
    //console.log(p);
    let markerPhenom = addMarker(
      p.name,
      p.description, {
        lng: extra.lng || p.location.coordinates[0],
        lat: extra.lat || p.location.coordinates[1]
      },
      map,
      p.type,
      p._id,
      p.sighted
    );
    markers.push(markerPhenom);
  })
};
