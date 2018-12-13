const singleMarker = (title, position, map, type) => {
  let url = 'images/markers/small/';
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
  addWindow(title, description, map, type, marker, id);
  return marker;
};
let infowindow  = null;
const addWindow = (title, description, map, type, marker, id) => {
  let content = `<div class="infoPhenom">
                  <div class="infoPhenomDetails">
                    <div class="phenomText">
                      <p class="phenomId">${id}</p>
                      <p class="favorites"><span class="x-favorite"></span><span class="favNum"> 14</span></p>
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

  infowindow= new google.maps.InfoWindow({content, maxWidth: 200});
  marker.addListener('click', function() {
    infowindow.open(map, marker);
    google.maps.event.addListener(infowindow,'domready',()=>{
      [...document.getElementsByClassName('gm-style-iw')].forEach(el=>{
        el.previousElementSibling.style.display = "none";
      });
      // [...document.getElementsByClassName('gm-style-pbc')].nextSibling.addEventListener('click', (e) => {
      //   if (infowindow) infowindow.close();
      // });
    });
  });
  return infowindow;
};

const removeMarkers = (markers) => {
  markers.forEach(m => {
    m.setMap(null);
  });
};
