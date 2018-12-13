let RTL = false;
let RTLinterval = null;
document.querySelector(".findMe").onclick = (e) => {
  document.getElementById('findMeBtn').classList.toggle("active");
  if(RTL && RTLinterval) {
    meMarker.setMap(null);
    clearInterval(RTLinterval);
  } else {
    RTLinterval = setInterval(realTimeLocation, 1000);
  }
  RTL = !RTL;
};
