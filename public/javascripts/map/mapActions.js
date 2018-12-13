document.addEventListener("DOMContentLoaded", function() {

  /*---------------- REAL TIME LOCATION ---------------*/

  let RTL = false;
  let RTLinterval = null;
  document.getElementById('findMeBtn').onclick = (e) => {
    document.getElementById('findMeBtn').classList.toggle("active");
    if(RTL && RTLinterval) {
      meMarker.setMap(null);
      clearInterval(RTLinterval);
    } else {
      RTLinterval = setInterval(realTimeLocation, 1000);
    }
    RTL = !RTL;
  };


  /*---------------- MAP TYPE ---------------*/

  let satellite = false;
  document.getElementById('layersBtn').onclick = (e) => {
    document.getElementById('layersBtn').classList.toggle("active");
    if(!satellite) {
      map.setMapTypeId('satellite');
    } else {
      map.setMapTypeId('roadmap');
    }
    satellite = !satellite;
  };


  /*---------------- ZOOM IN ---------------*/

  document.getElementById('zoomInBtn').onclick = (e) => {
    map.setZoom(map.getZoom()+1);
  };


  /*---------------- ZOOM OUT ---------------*/

  document.getElementById('zoomOutBtn').onclick = (e) => {
    map.setZoom(map.getZoom()-1);
  };


  /*---------------- MAP SEARCH ---------------*/

  let searchInput = document.getElementById('searchInput');
  let searchBox = new google.maps.places.SearchBox(searchInput);

  document.getElementById('mGlass').onclick = (e) => {
    let searchVal = searchInput.value;
    let places = searchBox.getPlaces();
    let lat, lng;
    if (places && places.length > 0) {
      let geom = places[0].geometry.location;
      lat =  Math.round(geom.lat() * 100000)/100000;
      lng =  Math.round(geom.lng() * 100000)/100000;
      console.log(geom)

    }

    fetch(encodeURI("/mapsearch?query=" + searchVal + ((lat && lng) ? ("&lat=" + lat + "&lng=" + lng ):"")))
    .then(res => res.json()).then(searchPhenomena => {
      // document.getElementById('searchInput').value = "";
      window.phenomena = searchPhenomena.phenomena;
      console.log(searchPhenomena.phenomena)
      removeMarkers(markers);
      loadData(map);
      if (searchPhenomena.phenomena && searchPhenomena.phenomena.length > 0) {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < searchPhenomena.phenomena.length; i++) {
          let markerLoc = searchPhenomena.phenomena[i].location.coordinates;
          bounds.extend({lat: markerLoc[0], lng: markerLoc[1]});
        }
        const MAX_ZOOM = 14;
        map.fitBounds(bounds);
        if (map.getZoom() > MAX_ZOOM) {
          map.setZoom(MAX_ZOOM);
        }
      }

    })
    .catch(e => console.error('Error:', e));
  };

});
