const ordemPedido = require('../model/ordemPedido.js');	

module.exports = [
	//ROTAS QUE CHAMAM AS TELAS
	{
		method: 'GET',
			path: '/cadastrarPedido',
			config: {
				handler: function(request, reply) {
					var data = {
							title: 'Realizar Pedido',
					};
					return reply.view('cadastrarPedido', data);
				}
			},
	},
	{
		method: 'GET',
			path: '/consultarPedido',
			handler: function(request, reply) {
				ordemPedido.read(function(array){
					var data = {
						titlePage: 'Consultar Pedido',
						title: 'Pedido',
						dados: array
					};
					return reply.view('consultarPedido', data);
				});
			}
	},
	{
		method: 'GET',
		path: '/readPedidos',		
		handler: function(request, reply) {
			ordemPedido.read(function(array){
				return reply(array);
			});
		}
	},
  	{
		method: 'GET',
		path: '/alterarPedido/{id}',
		handler: function (request, reply) {
				ordemPedido.returnChange(request.params.id, function(array){
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
				ordemPedido.insert(request.payload);
				reply.redirect('consultarPedido');
			}
		}
	},
	{
		method: 'POST',
		path: '/alterarDadosPedido',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				ordemPedido.change(request.payload, function(erro){
					if(!erro){
						reply.redirect('alterarPedido/' + request.payload.id);
					}
				});
		}
	}
  },
  {
		method: 'GET',
		path: '/deletarPedido/{id}',
		handler: function(request, reply){
			ordemPedido.del(request.params.id);
			reply.redirect('../consultarPedido');
		}
	},
];