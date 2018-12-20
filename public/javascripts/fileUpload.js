$(document).ready(function () {

var inputs = document.querySelectorAll( '.inputfile' );
Array.prototype.forEach.call( inputs, function( input )
{
	var label	 = input.nextElementSibling,
		labelVal = label.innerHTML;

	input.addEventListener( 'change', function( e )
	{
		var fileName = '';
		if( this.files && this.files.length > 1 )
			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
		else
			fileName = e.target.value.split( '\\' ).pop();

	});
});


function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#imgUpl').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#file").change(function() {
  readURL(this);
});


$(function() {
	// Multiple images preview in browser
	var imagesPreview = function(input, idPic) {

			if (input.files) {
					

					
							var reader = new FileReader();

							reader.onload = function(event) {
									$(`${idPic}`).attr('src', event.target.result)
							}

							reader.readAsDataURL(input.files[0]);
					
			}

	};

	$('#file1').on('change', function() {
			imagesPreview(this,"#imgUpl1");
	});

	$('#file2').on('change', function() {
		imagesPreview(this,"#imgUpl2");
});

$('#file3').on('change', function() {
	imagesPreview(this,"#imgUpl3");
});

$('#file4').on('change', function() {
	imagesPreview(this,"#imgUpl4");
});

});


{/* <input type="file" multiple id="gallery-photo-add">
<div class="gallery"></div> */}


})

