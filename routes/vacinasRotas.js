var crudVacinacao = require('../model/crudVacinacao.js')

module.exports = [
  {
		method: 'POST',
		path: '/insertVacina',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				crudVacinacao.insert(request.payload);
				reply.redirect('cadastrovacina');
			}
		}
	},
	{
		method: 'GET',
			path: '/cadastrovacina',
			handler: function(request, reply) {

				var data = {
						title: 'Vacina',
				};

				return reply.view('cadastrarVacina', data);
			}
	},
	{
		method: 'GET',
			path: '/consultarvacina',
			handler: function(request, reply) {
				crudVacinacao.read(function(array){
					var data = {
						titlePage: 'Consultar Vacina',
						title: 'Vacina',
						dados: array
					};
					console.log(data.dados);
					return reply.view('consultarVacina', data);
				});
			}
	},
]