const createMap = (map, {lat,lng}) => {
  // if phenom lat lng --> got go to phenom
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
  map = createMap('mainMap', {lat,lng});
  meMarker = newMeMarker({lat,lng});
  map.setCenter({lat,lng});
  loadData(map);
  centerMapInPhenom();
  //console.log('geolocate');
}).catch(err=>{
  map = createMap('mainMap', {});
  loadData(map);
  centerMapInPhenom();
  //console.log('no geolocate');
});

//center map in phenom with url params
const centerMapInPhenom = () => {
  let url = new URL(window.location.href);
  let lat = Number(url.searchParams.get("lat"));
  let lng = Number(url.searchParams.get("lng"));
  if(lat && lng) {
    map.setCenter({lat, lng});
    map.setZoom(13);
  }
};
