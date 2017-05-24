var crudGado = require('../model/crudGado.js')

module.exports = [
  {
		method: 'POST',
		path: '/insertGado',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				crudGado.insert(request.payload);

				reply('/cadastroGado');
			}
		}
	},
	{
		method: 'GET',
			path: '/cadastroGado',
			handler: function(request, reply) {

				var data = {
						title: 'Gado',
				};

				return reply.view('cadastroGado', data);
			}
	}
]