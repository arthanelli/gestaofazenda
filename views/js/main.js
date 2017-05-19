
$(document).ready(function () {
	var width = $(document).height(); 
	var height = $(document).height();

	$('.content').css('width', width);
	$('.menu-itens').css('height', height);
	
	var openConfig = false;

	$('.logoff').on('click', function(){
		if(openConfig == true) {
			$('.box-logoff').css('display', 'none');
			openConfig = false;
		} else if (openConfig == false) {
			$('.box-logoff').css('display', 'block');
			openConfig = true;
		}
	});

	var aberturaMenu = false;
	var subMenu = $('.mainmenu li .submenu');

	$('.mainmenu li').on('click', function(){

		if(aberturaMenu == false){
			$(this).find('ul').addClass('activate');
			aberturaMenu = true;
		}
		else if(aberturaMenu == true){
			subMenu.removeClass('activate');
			aberturaMenu = false;
		}
	});

});