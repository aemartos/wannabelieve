  
  geolocateMe()
  .then(l => {
    console.log(l)
    document.querySelector('input[name=latitude]').value = l.lat;
    document.querySelector('input[name=longitude]').value = l.lng;
    
    document.querySelector('button').disabled=false;
    // document.querySelector('button').className+="addBtn";
  })

  
