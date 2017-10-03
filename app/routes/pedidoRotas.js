const pedido = require('../model/ordemPedido.js');	

module.exports = [
	//ROTAS QUE CHAMAM AS TELAS
	{
		method: 'GET',
			path: '/cadastrarPedido',
			handler: function(request, reply) {
				var data = {
						title: 'Realizar Pedido',
				};
				return reply.view('cadastrarPedido', data);
			}
	},
	{
		method: 'GET',
			path: '/consultarPedido',
			handler: function(request, reply) {
				pedido.read(function(array){
					var data = {
						titlePage: 'Consultar Pedidos',
						title: 'Consultar Pedidos',
						dados: array
					};
					return reply.view('consultarPedido', data);
				});
			}
  },
  {
		method: 'GET',
		path: '/alterarPedido/{id}',
		handler: function (request, reply) {
				pedido.returnChange(request.params.id, function(array){
					var data = {
						pageName : 'alterarPedido',
						titlePage: 'Alterar dados do Pedido',
						title: 'Alterar Pedido',
						dados: array
					};
					return reply.view('alterarPedido', data);
				});			
		}
	},
	//ROTAS QUE FAZEM AÇÕES
	{
		method: 'POST',
		path: '/insertPedido',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				pedido.insert(request.payload);
				reply.redirect('cadastrarPedido');
			}
		}
	},
	{
		method: 'POST',
		path: '/alterarPedido',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				pedido.change(request.payload, function(erro){
					if(!erro){
						reply.redirect('alterarPedido/' + request.payload.id);
					}
				});
			}
		}
  }
];