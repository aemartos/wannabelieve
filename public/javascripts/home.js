const loadData = (map) => {

  phenomena.forEach(p => addMarker(p.name, p.description, {
    lat: p.location.coordinates[0],
    lng: p.location.coordinates[1]
  }, map, "pink"))
  
}