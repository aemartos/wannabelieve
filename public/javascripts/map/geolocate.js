let isGeolocating = false;

const geolocateMe = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, () => reject('Error in the geolocation service.'), {timeout: 4000});
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
        console.log('Position updated');
        console.log(location);
        if (!window.realTimeLocation) {
          map.setCenter(location);
          window.realTimeLocation = true;
        }
        if (meMarker) meMarker.setMap(null);
        meMarker = newMeMarker(location);
        loadData(map);
        return location;
      }
    })
    .catch(e => {
      console.log(e);
      if (!window.alerted) {
        window.alert('Error in the geolocation service.');
        window.alerted = true;
      };
    });
};
