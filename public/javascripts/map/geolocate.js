let isGeolocating = false;

const geolocateMe = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, (e) => reject(`Error in the geolocation service - ${e.message}`), {timeout: 4000});
    } else {
      reject('Browser does not support geolocation.');
    }
  })
};

let meMarker;

const realTimeLocation = () => {
  geolocateMe()
    .then(location => {
      if (isGeolocating) {
        // console.log('Position updated');
        // console.log(location);
        if (!window.realTimeLocation) {
          if (map && map.setCenter) {
            map.setCenter(location);
          }
          window.realTimeLocation = true;
        }
        if (meMarker) meMarker.setMap(null);
        
        // Create marker directly since Google Maps loads synchronously
        meMarker = newMeMarker(location);
        if (map) {
          loadData(map);
        }
        
        return location;
      }
    })
    .catch(e => {
      console.log(e);
      if (!window.alerted) {
        window.alert(`Error in the geolocation service - ${e.message}`);
        window.alerted = true;
      };
    });
};
