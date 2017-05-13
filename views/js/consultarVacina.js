$(document).ready(function () {
  $.ajax({
      type: 'get',
      url: '/read',
      success: function (retorno) {
          retorno.forEach(function (element, i) {
              $('tbody').append('<tr data-index="'+ element.id +'">' +
                  '<td><button data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-edit"></span></a><button data-toggle="modal" data-target="#myModal" class="button-deletar"  data-id="' + element.id +'"><span class="glyphicon glyphicon-trash" style="color: #e00303;" ></span></a></td>' +
                  '<td>' + element.id + '</td>' +
                  '<td>' + element.quantidade + '</td>' +
                  '<td>' + element.produto + '</td>' +
                  '<td>' + element.endereco + '</td>' +
                  '<td>' + element.valor + '</td>' +
                  '<td>' + element.troco + '</td>' +
                  '<td>' + element.obs + '</td>' +
                  '<td>' + element.data + '</td>' +
                  '</td></tr>');
          });
          $('.button-deletar').click(function() { 
              id = $(this).attr('data-id');
          });
      }
  });
  
  $('#confirmaExcluir').click(function() { 
      excluirPedido(id);
  });
});