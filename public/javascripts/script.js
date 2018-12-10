document.addEventListener('DOMContentLoaded', () => {

  const map = new google.maps.Map(
    document.getElementById('mainMap'), {
      zoom: 14
    }
  );

  loadData(map)

  geolocateMe()
  .then(center => {
    const marker = new google.maps.Marker({
      position: center,
      title: "You are here",
      icon: {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      }
    })
    map.setCenter(center);
    marker.setMap(map);
    
  })
  .catch(e => console.log(e))

}, false);
