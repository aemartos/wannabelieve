document.addEventListener("DOMContentLoaded", function() {

  /*---------------- REAL TIME LOCATION ---------------*/

  let RTL = false;
  let RTLinterval = null;
  document.getElementById('findMeBtn').onclick = (e) => {
    document.getElementById('findMeBtn').classList.toggle("active");
    if(RTL && RTLinterval) {
      if (meMarker) meMarker.setMap(null);
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
  //convert serarch input in a searchBox to find places with this library
  let searchBox = new google.maps.places.SearchBox(searchInput);

  //set min and max zoom to avoid grey areas in the map
  const fixZoom = () => {
    const MAX_ZOOM = 14;
    const MIN_ZOOM = 2.3;
    if (map.getZoom() > MAX_ZOOM) {
      map.setZoom(MAX_ZOOM);
    } else if (map.getZoom() < MIN_ZOOM) {
      map.setZoom(MIN_ZOOM);
    }
  };

  const searchReq = (e) => {
    e.preventDefault();
    let searchVal = searchInput.value;
    //get all suggested places with my input search
    let places = searchBox.getPlaces();
    let lat,lng,l,t,r,b;
    //if there are suggested places I retrieve the most similar place to my query
    if (places && places.length > 0 ) {
      //the first one is the most similar
      let geom = places[0].geometry.location;
      let vw = places[0].geometry.viewport;
      //get coordinates rounded to 5 decimals
      lat = geom.lat();
      lng = geom.lng();
      l = vw.ea.j;
      r = vw.ea.l;
      t = vw.la.l;
      b = vw.la.j;
    }

    //remote request to server passing my search query and coordinates of the closest place name
    fetch(encodeURI("/mapsearch?query=" + searchVal + ((lat && lng) ? ("&t=" + t + "&l=" + l + "&b=" + b  + "&r=" + r) : "")))
      .then(res => res.json()).then(searchPhenomena => {
        //retrive results and substitute window variable
        window.phenomena = searchPhenomena.phenomena;
        console.log(searchPhenomena.phenomena);
        //remove all previous markers
        removeMarkers(markers);
        //if there're results
        if (searchPhenomena.phenomena && searchPhenomena.phenomena.length > 0) {
          //I load them into the map
          loadData(map);
          //if there's no result from Places API
          if(!lat && !lng) {
            //calculate bounds to fit all markers in the map
            map.fitBounds(calculateBoundsToFitAllMarkers(searchPhenomena.phenomena));
          } else {
            //if there're results from Places API
                //map.setCenter({lat,lng});
            //the viewport adjust center and zoom to fit all geography area
                  //geometry.viewport --> appropriate viewport size to fit the place
            map.fitBounds(places[0].geometry.viewport);
          }
          //if there're no results, at least, center the map in the place searched
        } else if (places && places.length > 0) {
          map.fitBounds(places[0].geometry.viewport);
          //map.setCenter({lat,lng});
        }
        fixZoom();
      })
      .catch(e => console.error('Error:', e));
  };

  document.getElementById('mGlass').onclick = searchReq;
  searchInput.onkeydown = (event) => {
    if(event.keyCode == 13) {
      event.preventDefault();
      searchReq(event);
      return false;
    }
  }

  /*---------------- FILTERS ---------------*/

  let filters = false;
  document.getElementById('filtersBtn').onclick = (e) => {
    document.getElementById('filtersBtn').classList.toggle("active");
    if(!filters) {
      document.getElementById('filtersBox').style.display = 'block';
    } else {
      document.getElementById('filtersBox').style.display = 'none';
    }
    filters = !filters;
  };

  [...document.getElementsByClassName('checkboxCat')].forEach((el)=>{
    el.onchange = (e) => {
      let activeFilters = [...document.getElementsByClassName('checkboxCat')]
        .filter(el=>el.checked)
        .map(filter=>filter.value);
      removeMarkers(markers);
      filteredPhenomena= window.phenomena.filter(ph => activeFilters.includes(ph.type));
      loadData(map,{phenomena: filteredPhenomena});
    };
  });

  document.getElementById('showAll').onchange = (e) => {
    removeMarkers(markers);
    loadData(map,{phenomena: e.target.checked ? window.phenomena : []});
    [...document.getElementsByClassName('checkboxCat')].forEach(el=>{
      el.checked = e.target.checked;
    });
  };


});
