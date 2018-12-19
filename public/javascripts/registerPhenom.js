
  geolocateMe()
  .then(l => {
    console.log(l)
    document.querySelector('input[name=latitude]').value = l.lat;
    document.querySelector('input[name=longitude]').value = l.lng;

    document.querySelector('button').disabled=false;
    // document.querySelector('button').className+="addBtn";
  })


  /*--------------------- SLIDER ----------------------*/
  $(document).ready(function(){
    $('.owl-carousel').owlCarousel({
      loop:true,
      margin:10,
      nav:false,
      autoHeight:true,
      responsiveClass:true,
      responsive:{
          0:{
              items:1,
          },
          600:{
              items:1,
          },
          900:{
            items:1,
          },
          1100:{
              items:1
          }
      }
    });
  });
