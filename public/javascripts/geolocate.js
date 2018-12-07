const geolocateMe = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, () => reject('error in the geolocation service.'));
    } else {
      reject('browser does not support geolocation.');
    }
  })
};



document.querySelector(".findMe").onclick = (e) => {
  //Update position each second after btn click
  //setInterval(()=>{
  geolocateMe()
    .then(location => {
      console.log('position updated');
      console.log(location);
    })
    .catch(e => console.log(e));
  //}, 1000);
};
