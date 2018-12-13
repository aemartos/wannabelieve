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

const addMarker = (title, description, position, map, type) => {
  let marker = singleMarker(title, position, map, type);
  addWindow(title, description, map, marker);
  return marker;
};
let infowindow  = null;
const addWindow = (title, description, map, marker) => {
  //let content = `<h1>${title}</h1><p>${description}</p><img class="infowBg" src="images/windows/infowbg.png"></img><img class="arrowBg" src="images/windows/arrowbg.png"></img>`;
  let content = `<div class="infoPhenom"><h1>${title}</h1><p>${description}</p></div><img class="arrowBg" src="images/windows/arrowbg.png"></img>`;
  if (infowindow) infowindow.close();
  infowindow= new google.maps.InfoWindow({content, maxWidth: 200});
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

const removeMarkers = (markers) => {
  markers.forEach(m => {
    m.setMap(null);
  });
};
