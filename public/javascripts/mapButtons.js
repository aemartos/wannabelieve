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

document.getElementById('zoomOutBtn').onclick = (e) => {
  map.setZoom(map.getZoom()-1);
};
