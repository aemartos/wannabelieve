let filters = false;

document.addEventListener("DOMContentLoaded", function () {

  /*---------------- REAL TIME LOCATION ---------------*/

  let RTL = false;
  let RTLinterval = null;
  document.getElementById('findMeBtn').onclick = (e) => {
    document.getElementById('findMeBtn').classList.toggle("active");
    if (RTL && RTLinterval) {
      if (meMarker) meMarker.setMap(null);
      isGeolocating = false;
      clearInterval(RTLinterval);
      window.realTimeLocation = false;
    } else {
      isGeolocating = true;
      RTLinterval = setInterval(realTimeLocation, 1000);
    }
    RTL = !RTL;
  };


  /*---------------- MAP TYPE ---------------*/

  let satellite = false;
  document.getElementById('layersBtn').onclick = (e) => {
    document.getElementById('layersBtn').classList.toggle("active");
    if (!satellite) {
      map.setMapTypeId('satellite');
    } else {
      map.setMapTypeId('roadmap');
    }
    satellite = !satellite;
  };


  /*---------------- ZOOM IN ---------------*/

  document.getElementById('zoomInBtn').onclick = (e) => {
    map.setZoom(map.getZoom() + 1);
  };


  /*---------------- ZOOM OUT ---------------*/

  document.getElementById('zoomOutBtn').onclick = (e) => {
    map.setZoom(map.getZoom() - 1);
  };


  /*---------------- MAP SEARCH ---------------*/

  let searchInput = document.getElementById('searchInput');

  //convert serarch input in a searchBox to find places with this library
  let searchBox = null;
  
  // Initialize search box after Google Maps loads
  const initializeSearchBox = () => {
    if (window.searchBoxActive && searchInput) { 
      try {
        searchBox = new google.maps.places.SearchBox(searchInput);
      } catch (error) {
        console.error('Failed to initialize SearchBox:', error);
        searchBox = null;
      }
    }
  };

  try {
    initializeSearchBox();
  } catch (error) {
    console.error('Failed to load Google Maps Places library:', error);
    window.searchBoxActive = false;
  }

  //let searchBox = new google.maps.places.SearchBox(searchInput);

  const searchReq = (e) => {
    e.preventDefault();
    let searchVal = searchInput.value;
    
    // Check if searchBox is available
    if (!searchBox) {
      console.warn('SearchBox not initialized yet');
      return;
    }
    
    //get all suggested places with my input search
    let places = searchBox.getPlaces();
    let lat, lng, l, t, r, b;
    //if there are suggested places I retrieve the most similar place to my query
    if (places && places.length > 0) {
      //the first one is the most similar
      let geom = places[0].geometry.location;
      let vw = places[0].geometry.viewport;
      //get coordinates rounded to 5 decimals
      lat = geom.lat();
      lng = geom.lng();

      // the name of the keys changes and if you specify them, it fails
      const keys = Object.keys(vw);
      // TODO: review viewport, not working at the moment
      l = vw[keys[0]].hi;
      r = vw[keys[0]].lo;
      t = vw[keys[1]].lo;
      b = vw[keys[1]].hi;

      // console.log('-------->', { places: places[0], geom, vw, lat, lng });

      // FIXME: old config
      // l = vw[keys[0]].j;
      // r = vw[keys[0]].l;
      // t = vw[keys[1]].l;
      // b = vw[keys[1]].j;

      // l = vw.fa.j; vw.ea.j;
      // r = vw.fa.l;
      // t = vw.ma.l;  vw.la.l;
      // b = vw.ma.j;
    }

    //remote request to server passing my search query and coordinates of the closest place name
    fetch(encodeURI("/map/mapsearch?query=" + searchVal + ((lat && lng) ? ("&t=" + t + "&l=" + l + "&b=" + b + "&r=" + r) : "")))
      .then(res => res.json()).then(searchPhenomena => {
        //retrive results and substitute window variable
        window.phenomena = searchPhenomena.phenomena;
        //remove all previous markers
        removeMarkers(markers);
        //if there're results
        if (searchPhenomena.phenomena && searchPhenomena.phenomena.length > 0) {
          //I load them into the map
          loadData(map);
          //if there's no result from Places API
          if (!lat && !lng) {
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

  if (document.getElementById('mGlass')) {
    document.getElementById('mGlass').onclick = searchReq;
    searchInput.onkeydown = (event) => {
      if (event.key == 'Enter') {
        event.preventDefault();
        searchReq(event);
        return false;
      }
    }
  }

  /*---------------- FILTERS ---------------*/

  if (document.getElementById('filtersBtn')) {
    document.getElementById('filtersBtn').onclick = (e) => {
      document.getElementById('filtersBtn').classList.toggle("active");
      if (!filters) {
        document.getElementById('filtersBox').style.display = 'block';
      } else {
        document.getElementById('filtersBox').style.display = 'none';
      }
      filters = !filters;
    };

    [...document.getElementsByClassName('checkboxCat')].forEach((el) => {
      el.onchange = (e) => {
        document.getElementById('showAll').checked = false;
        let activeFilters = [...document.getElementsByClassName('checkboxCat')]
          .filter(el => el.checked)
          .map(filter => filter.value);
        removeMarkers(markers);
        filteredPhenomena = window.phenomena.filter(ph => activeFilters.includes(ph.type));
        loadData(map, { phenomena: filteredPhenomena });
        if ([...document.getElementsByClassName('checkboxCat')].every(val => val.checked === true)) {
          document.getElementById('showAll').checked = true;
        };
      };
    });

    document.getElementById('showAll').onchange = (e) => {
      removeMarkers(markers);
      loadData(map, { phenomena: e.target.checked ? window.phenomena : [] });
      [...document.getElementsByClassName('checkboxCat')].forEach(el => {
        el.checked = e.target.checked;
      });
    };
  }

});
