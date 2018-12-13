const geolocateMe = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, () => reject('Error in the geolocation service.'));
    } else {
      reject('Browser does not support geolocation.');
    }
  })
};

let meMarker;

const realTimeLocation = () => {
  geolocateMe()
    .then(location => {
      console.log('Position updated');
      console.log(location);
      map.setCenter(location);
      if (meMarker) meMarker.setMap(null);
      meMarker = new google.maps.Marker({
        position: location,
        map,
        icon: "images/markers/small/geolocation.png"
      });
      loadData(map);
    })
    .catch(e => console.log(e));
};
