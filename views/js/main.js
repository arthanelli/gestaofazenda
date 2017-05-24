
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

	var menuAberto = false;
	var subMenu = $('.mainmenu li .submenu');

	$('.mainmenu li').on('click', function(){
		if($(this).find('ul').hasClass('activate')){
			subMenu.removeClass('activate');
		} else {
			subMenu.removeClass('activate');
			$(this).find('ul').addClass('activate');
		}
	});

	$('tbody tr').on('click', function(){
    var pathEdit = $(this).attr('data-id');
		location.href = pathEdit;
  });

	$('#button-deletar').on('click', function(){
		var pathEdit = $(this).attr('data-path');
		var id = $('#id').val();
		location.href = pathEdit+'/'+id;
	});
});