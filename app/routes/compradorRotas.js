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
				reply.redirect('cadastroAnaliseLeite');
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
];