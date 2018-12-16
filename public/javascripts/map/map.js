const createMap = (map, {lat,lng}) => {
  return new google.maps.Map(
    document.getElementById(map), {
      zoom: 14,
      center: {
        lat: lat || 40.4169473,
        lng: lng || -3.7035285
      },
      disableDefaultUI: true,
      clickableIcons: false,
      clickableLabels: false,
      styles: style15_4
    }
  );
}


let map;
const {lat,lng} = geolocateMe().then(({lat,lng})=>{
  console.log(lat,lng)
  map = createMap('mainMap', {lat,lng});
  meMarker = newMeMarker({lat,lng});
  loadData(map);
}).catch(err=>{
  map = createMap('mainMap', {});
  loadData(map);
});


const markers = [];
const loadData = (map, extra = {}) => {
  (extra.phenomena || phenomena).forEach(p => {
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
