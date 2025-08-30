const createMap = (map, {lat,lng}) => {
  // if phenom lat lng --> got go to phenom
  return new google.maps.Map(
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
}

let map;

// Initialize map after Google Maps API is loaded
const initializeMap = async () => {
  try {
    const {lat,lng} = await geolocateMe();
    map = createMap('mainMap', {lat,lng});
    meMarker = newMeMarker({lat,lng});
    map.setCenter({lat,lng});
    loadData(map);
    centerMapInPhenom();
  } catch(err) {
    map = createMap('mainMap', {});
    loadData(map);
    centerMapInPhenom();
    console.log(err);
    // window.alert(err);
  }
};

// Wait for Google Maps to load, then initialize
waitForGoogleMaps().then(() => {
  initializeMap();
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
