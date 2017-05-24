var crudInsumo = require('../model/crudInsumo.js')  

module.exports = [
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
	}
]