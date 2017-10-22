var crudComprador = require('../model/crudComprador.js');

module.exports = [
	{
		method: 'GET',
			path: '/cadastrarComprador',
			handler: function(request, reply) {
				var data = {
						title: 'Comprador'
				};
				return reply.view('cadastrarComprador', data);
			}
	},
	{
		method: 'GET',
			path: '/consultarComprador',
			handler: function(request, reply) {
				crudComprador.read(function(array){
					var data = {
						titlePage: 'Consultar Comprador',
						title: 'Comprador',
						dados: array
					};
					return reply.view('consultarComprador', data);
				});
			}
	},
	//ROTAS QUE FAZEM AÇÕES
	{
		method: 'POST',
		path: '/insertComprador',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				crudComprador.insert(request.payload);
				reply.redirect('consultarComprador');
			}
		}
	},
	{
		method: 'GET',
		path: '/readComprador',		
		handler: function(request, reply) {
			crudComprador.read(function(array){
				return reply(array);
			});
		}
	},
	{
		method: 'GET',
		path: '/alterarComprador/{id}',
		handler: function (request, reply) {
				crudComprador.returnChange(request.params.id, function(array){
					var data = {
						pageName : 'alterarComprador',
						titlePage: 'Alterar dados do Comprador',
						title: 'Alterar Comprador',
						dados: array
					};
					return reply.view('alterarComprador', data);
				});			
		}
	},
	{
		method: 'POST',
		path: '/alterarDadosComprador',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				console.log(request.payload);
				crudComprador.change(request.payload, function(erro){
					if(!erro){
						reply.redirect('alterarComprador/' + request.payload.id);
					}
				});
			}
		}
	},
	{
		method: 'GET',
		path: '/deletarComprador/{id}',
		handler: function(request, reply){
			console.log(request.params.id);
			crudComprador.del(request.params.id);
			reply.redirect('../consultarComprador');
		}
	},
];