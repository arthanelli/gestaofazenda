var crudAnaliseLeite = require('../model/crudAnaliseLeite.js');

module.exports = [
	//ROTAS QUE CHAMAM TELAS
  {
		method: 'GET',
		path: '/consultarAnalise/{id}',
		handler: function (request, reply) {
				crudAnaliseLeite.returnChange(request.params.id, function(array){
					var data = {
						titlePage: 'Consultar Analise Leite',
						title: 'Analise do Leite',
						dados: array
					};
					return reply.view('alterarAnaliseLeite', data);
				});			
		}
	},
	{
		method: 'GET',
			path: '/cadastroAnaliseLeite',
			handler: function(request, reply) {
				var data = {
						title: 'Analise do Leite'
				};
				return reply.view('cadastrarAnaliseLeite', data);
			}
	},
	{
		method: 'GET',
			path: '/consultarAnaliseLeite',
			handler: function(request, reply) {
				crudAnaliseLeite.read(function(array){
					var data = {
						titlePage: 'Consultar Analise Leite',
						title: 'Analise do Leite',
						dados: array
					};
					return reply.view('consultarAnaliseLeite', data);
				});
			}
	},
	//ROTAS QUE FAZEM AÇÃO
	{
		method: 'GET',
		path: '/deletarAnaliseLeite/{id}',
		handler: function(request, reply){
			crudAnaliseLeite.del(request.params.id);
			reply.redirect('../consultarAnaliseLeite');
		}
	},
	{
		method: 'POST',
		path: '/insertAnaliseLeite',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				crudAnaliseLeite.insert(request.payload);
				reply.redirect('cadastroAnaliseLeite');
			}
		}
	},
	{
		method: 'POST',
		path: '/mudarDadosAnaliseLeite',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				crudAnaliseLeite.change(request.payload);
				reply.redirect('consultarAnalise/' + request.payload.id);
			}
		}
	}
];