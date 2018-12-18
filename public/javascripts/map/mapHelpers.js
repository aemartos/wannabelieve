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


const markers = [];
const loadData = (map, extra = {}) => {
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
      p._id
    );
    markers.push(markerPhenom);
  })
};
