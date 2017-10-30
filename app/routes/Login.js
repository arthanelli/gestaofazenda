var crudUsuario = require('../model/crudUsuario.js');

module.exports = [
	{
		method: 'GET',
			path: '/Login',
			handler: function(request, reply) {
				crudUsuario.read(function(array){
					var data = {
						titlePage: 'Login',
						title: 'Login',
						dados: array
					};
					return reply.view('Login', data);
				});
			}
	},
	{
		method: 'GET',
		path: '/readUsuario',		
		handler: function(request, reply) {
			crudUsuario.read(function(array){
				return reply(array);
			});
		}
	},
	
];