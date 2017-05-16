
$(document).ready(function () {
	var width = $(document).height(); 

	$('.content').css('width', width);
	
	var openConfig = false;

	$('.logoff').on('click', function(){
		if(openConfig == true) {
			$('.box-logoff').css('display', 'none');
			openConfig = false;
		} else if (openConfig == false) {
			$('.box-logoff').css('display', 'block');
			openConfig = true;
		}
	})

});