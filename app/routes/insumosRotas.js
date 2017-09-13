var crudInsumo = require('../model/crudInsumo.js')  

module.exports = [
	//ROTAS QUE CHAMAM AS TELAS
  {
		method: 'GET',
		path: '/detalheInsumos/{id}',
		handler: function (request, reply) {
				crudInsumo.returnChange(request.params.id, function(array){
					var data = {
						pageName : 'detalheInsumos',
						titlePage: 'Consultar Insumos',
						titleAlterar: 'Insumos',
						dados: array
					};
					return reply.view('detalheInsumo', data);
				});			
		}
	},
	{
		method: 'POST',
		path: '/insertInsumo',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				crudInsumo.insert(request.payload);
				reply.redirect('cadastroInsumo');
			}
		}
	},
	{
		method: 'GET',
			path: '/cadastroInsumo',
			handler: function(request, reply) {
				var data = {
						title: 'Insumo',
				};
				return reply.view('cadastrarInsumo', data);
			}
	},
	{
		method: 'POST',
		path: '/alterarInsumos',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				console.log(request.payload)
				crudInsumo.change(request.payload, function(erro){
					if(!erro){
						reply.redirect('detalheInsumos/' + request.payload.id);
					}
				});
			}
		}
	},
	{
		method: 'GET',
			path: '/consultarInsumo',
			handler: function(request, reply) {
				crudInsumo.read(function(array){
					var data = {
						titlePage: 'Consultar Insumos',
						title: 'Insumos',
						dados: array
					};
					return reply.view('consultarInsumo', data);
				});
			}
	},
	{
		method: 'GET',
		path: '/deletarInsumos/{id}',
		handler: function(request, reply){
			console.log(request.params.id)
			crudInsumo.del(request.params.id);
			reply.redirect('../consultarInsumo');
		}
	}
]