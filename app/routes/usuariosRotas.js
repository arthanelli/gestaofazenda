var crudUsuario = require('../model/crudUsuario.js')

module.exports = [

	//ROTAS QUE CHAMAM AS TELAS
	{
		method: 'GET',
		path: '/alterarUsuario/{id}',
		handler: function (request, reply) {
				crudUsuario.returnChange(request.params.id, function(array){
					var data = {
						pageName : 'alterarUsuario',
						titlePage: 'Alterar dados do Usuario',
						title: 'Alterar Usuario',
						dados: array
					};
					return reply.view('alterarUsuario', data);
				});			
		}
	},
	{
		method: 'GET',
			path: '/cadastroUsuario',
			handler: function(request, reply) {
				var data = {
						title: 'Cadastrar Usuario',
				};
				return reply.view('cadastrarUsuario', data);
			}
	},
	{
		method: 'GET',
			path: '/consultarUsuario',
			handler: function(request, reply) {
				crudUsuario.read(function(array){
					var data = {
						titlePage: 'Consultar Usuario',
						title: 'Consultar Usuario',
						dados: array
					};
					return reply.view('consultarUsuario', data);
				});
			}
	},
	//ROTAS QUE FAZEM AÇÕES
	{
		method: 'POST',
		path: '/cadastrarUsuario',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				crudUsuario.insert(request.payload);
				reply.redirect('consultarUsuario');
			}
		}
	},
	{
		method: 'POST',
		path: '/alterarDadosUsuario',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				crudUsuario.change(request.payload, function(erro){
					if(!erro){
						reply.redirect('consultarUsuario');
					}
				});
			}
		}
	},
	{
		method: 'GET',
		path: '/deletarUsuario/{idusuario}',
		handler: function(request, reply){
			crudUsuario.del(request.params.idusuario);
			reply.redirect('/consultarUsuario');
		}
	},
];