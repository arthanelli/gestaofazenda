
window.onload = function(){
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
}