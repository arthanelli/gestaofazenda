var crudInsumoVacina = require('../model/crudInsumoVacina.js')  

module.exports = [
	//ROTAS QUE CHAMAM AS TELAS
  {
		method: 'GET',
		path: '/detalheInsumoVacina/{id}',
		handler: function (request, reply) {
				crudInsumoVacina.returnChange(request.params.id, function(array){
					var data = {
						pageName : 'detalheInsumoVacina',
						titlePage: 'Consultar Vacina',
						titleAlterar: 'Vacina',
						dados: array
					};
					return reply.view('detalheInsumoVacina', data);
				});			
		}
	},
	{
		method: 'GET',
			path: '/cadastrarInsumoVacina',
			handler: function(request, reply) {
				var data = {
						title: 'Vacina',
				};
				return reply.view('cadastrarInsumoVacina', data);
			}
	},
	{
		method: 'GET',
			path: '/consultarInsumoVacina',
			handler: function(request, reply) {
				crudInsumoVacina.read(function(array){
					var data = {
						titlePage: 'Consultar estoque de vacinas',
						title: 'Vacinas',
						dados: array
					};
					return reply.view('consultarInsumoVacina', data);
				});
			}
	},

	//ROTAS QUE REALIZAM AÇÕES
	{
		method: 'POST',
		path: '/insertInsumoVacina',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				crudInsumoVacina.insert(request.payload);
				reply.redirect('cadastrarInsumoVacina');
			}
		}
	},
	{
		method: 'POST',
		path: '/alterarInsumoVacina',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				crudInsumoVacina.change(request.payload, function(erro){
					if(!erro){
						reply.redirect('consultarInsumoVacina');
					}
				});
			}
		}
	},
	{
		method: 'GET',
		path: '/deletarInsumoVacina/{id}',
		handler: function(request, reply){
			crudInsumoVacina.del(request.params.id);
			reply.redirect('../consultarInsumoVacina');
		}
	}
]