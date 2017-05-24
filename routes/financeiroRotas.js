var crudFinancas = require('../model/crudFinancas.js') 

module.exports = [
  {
		method: 'POST',
		path: '/insertFinanceiro',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				crudFinancas.insert(request.payload);
				reply('/cadastroFinanceiro');
			}
		}
	},
	{
		method: 'GET',
			path: '/cadastroFinanceiro',
			handler: function(request, reply) {

				var data = {
						title: 'Financeiro',
				};

				return reply.view('cadastroFinanceiro', data);
			}
	}
]