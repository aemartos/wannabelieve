const createMap = (map, {lat,lng}) => {
  return new google.maps.Map(
    document.getElementById(map), {
      zoom: 14,
      center: {
        lat: lat || 40.4169473,
        lng: lng || -3.7035285
      },
      disableDefaultUI: true,
      clickableIcons: false,
      clickableLabels: false,
      styles: style15_4
    }
  );
}

let map = createMap('mainMap', {});
//console.log(window.phenomena) ;
loadData(map);
if (window.phenomena.length > 1) {
  map.fitBounds(calculateBoundsToFitAllMarkers(window.phenomena));
  fixZoom();
} else if (window.phenomena.length == 1) {
  map.setCenter({lat: window.phenomena[0].location.coordinates[1], lng: window.phenomena[0].location.coordinates[0]});
  map.setZoom(5);
}

//avoid markers to open infoWindow onclick in route detail
markers.forEach(el => {
  el.addListener('click', function() {
    infoWindows.forEach(e => e.close());
  });
});

/* ------------ START ROUTE -------------- */


//hide and show map
const sections = [...document.getElementsByClassName('section')];
document.getElementById('startRoute').onclick = (el) => {
  map.setZoom(2);
  document.getElementById('mainMap').style.height = "100%";
  document.getElementById('finishRoute').style.display = "inline-block";
  sections.forEach(e => {
    e.style.display = "none";
  });
};

document.getElementById('finishRoute').onclick = (el) => {
  fixZoom();
  document.getElementById('mainMap').style.height = "33%";
  document.getElementById('finishRoute').style.display = "none";
  sections.forEach(e => {
    e.style.display = "block";
  });
};
