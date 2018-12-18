const singleMarker = (title, position, map, type) => {
  let url = '/images/markers/small/';
  url += type + ".png";
  let marker = new google.maps.Marker({
    title,
    position,
    map,
    icon: url
  });
  return marker;
};

const addMarker = (title, description, position, map, type, id) => {
  let marker = singleMarker(title, position, map, type);
  //console.log(title, description, map, type, marker, id);
  addWindow(title, description, map, type, marker, id);
  return marker;
};

const newMeMarker = (position) => {
  return new google.maps.Marker({
    position,
    map,
    icon: "/images/markers/small/geolocation.png"
  });
};

const addWindow = (title, description, map, type, marker, id) => {
  let infowindow = null;
  let content = `<div class="infoPhenom">
                  <div class="infoPhenomDetails">
                    <div class="phenomText">
                      <p class="phenomId">${id}</p>
                      <p class="favorites"><span class="x-favorite heart"></span><span class="favNum"> 14</span></p>
                    </div>
                    <div class="phenomTitle">
                      <h1>${title}</h1>
                    </div>
                    <div class="phenomDetails">
                      <p class="distance">100m</p>
                      <p> | </p>
                      <p class="cat">${type}</p>
                      <p> | </p>
                      <p class="difficulty">hard</p>
                    </div>
                  </div>
                  <a class="goPhenom" href="/phenomena/${id}"><span class="x-back"></span></a>
                </div>`;

  infowindow = new google.maps.InfoWindow({content, maxWidth: 200});
  marker.addListener('click', function() {
    infowindow.open(map, marker);
    google.maps.event.addListener(infowindow,'domready',()=>{
      [...document.getElementsByClassName('gm-style-iw')].forEach(el=>{
        el.previousElementSibling.style.display = "none";
      });
    });
  });
  return infowindow;
};

//Close infoWindow and filtersBox when clicking the map
const closeInfoWindow = () => {
  document.getElementById('mainMap').onclick = e => {
    if (e.target && e.target.tagName === 'DIV' && !e.target.getAttribute('id')&& !e.target.getAttribute('class')) {
      if (infowindow) { infowindow.close(); }
      //Close filterBox
      if (document.getElementById('filtersBox')) {
        document.getElementById('filtersBox').style.display = 'none';
        filters = false;
      }
    }
  }
};
closeInfoWindow();

const removeMarkers = (markers) => {
  markers.forEach(m => {
    m.setMap(null);
  });
};

const calculateBoundsToFitAllMarkers = (phenomena) => {
  let bounds = new google.maps.LatLngBounds();
  //I need to iterate over all the places in my search to fit the bounds
  for (let i = 0; i < phenomena.length; i++) {
    //search all coordinates
    let coorLoc = phenomena[i].location.coordinates;
    //create geographic area to fit all the markers in the search
    bounds.extend({lng: coorLoc[0], lat: coorLoc[1]});
  }
  return bounds;
};
