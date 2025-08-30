const createMap = (map, {lat,lng}) => {
  // if phenom lat lng --> got go to phenom
  return new google.maps.Map(
    document.getElementById(map), {
      zoom: 14,
      center: {
        lat: lat || 40.4169473,
        lng: lng || -3.7035285
      },
      disableDefaultUI: true,
      clickableIcons: false,
      clickableLabels: false,
      styles: style15_4
    }
  );
}

let map;

// Initialize map after Google Maps API is loaded
const initializeMap = async () => {
  try {
    const {lat,lng} = await geolocateMe();
    map = createMap('mainMap', {lat,lng});
    meMarker = newMeMarker({lat,lng});
    map.setCenter({lat,lng});
    loadData(map);
    centerMapInPhenom();
  } catch(err) {
    map = createMap('mainMap', {});
    loadData(map);
    centerMapInPhenom();
    console.log(err);
    // window.alert(err);
  }
};

// Initialize map directly since Google Maps loads synchronously
try {
  initializeMap();
} catch (error) {
  console.error('Failed to initialize map:', error);
  
  // Check if it's an API key issue
  if (error.message.includes('API key') || error.message.includes('InvalidKeyMapError')) {
    console.error('Google Maps API key issue detected');
    
    // Show error message in the map container
    const mapContainer = document.getElementById('mainMap');
    if (mapContainer) {
      mapContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #666; background: #f5f5f5; border-radius: 8px; margin: 20px;">
          <h3>⚠️ Google Maps Configuration Error</h3>
          <p>The Google Maps API key is missing or invalid.</p>
          <p>Please contact the administrator to configure the Google Maps API key.</p>
          <p><small>Error: ${error.message}</small></p>
        </div>
      `;
    }
    return;
  }
  
  // For other errors, show generic error message
  const mapContainer = document.getElementById('mainMap');
  if (mapContainer) {
    mapContainer.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">Map loading failed. Please refresh the page or check your internet connection.</div>';
  }
}

//center map in phenom with url params
const centerMapInPhenom = () => {
  let url = new URL(window.location.href);
  let lat = Number(url.searchParams.get("lat"));
  let lng = Number(url.searchParams.get("lng"));
  if(lat && lng) {
    map.setCenter({lat, lng});
    map.setZoom(13);
  }
};
