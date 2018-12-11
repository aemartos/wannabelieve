const singleMarker = (title, position, map, cat) => {
  let url = 'images/markers/';
  url += cat + ".png";
  let marker = new google.maps.Marker({
    title,
    position,
    map,
    icon: {
      //size: new google.maps.Size(40, 40),
      url
    }
  });
  return marker;
};

const addMarker = (title, description, position, map, cat) => {
  let marker = singleMarker(title, position, map, cat);
  addWindow(title, description, map, marker);
  return marker;
};

const addWindow = (title, description, map, marker) => {
  let content = `<h1>${title}</h1><p>${description}</p>`;
  let infowindow = new google.maps.InfoWindow({content, maxWidth: 200});
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  return infowindow;
};

const removeMarkers = (markers) => {
  markers.forEach(m => {
    m.setMap(null);
  });
};
