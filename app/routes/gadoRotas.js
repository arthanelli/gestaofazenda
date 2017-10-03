const crudGado = require('../model/crudGado.js');	
const ordenha = require('../model/ordenha.js');

module.exports = [
	//ROTAS QUE CHAMAM AS TELAS
	{
		method: 'GET',
		path: '/alterarGado/{brinco}',
		handler: function (request, reply) {
				crudGado.returnChange(request.params.brinco, function(array){
					var data = {
						pageName : 'alterarGado',
						titlePage: 'Alterar dados do Gado',
						title: 'Alterar Gado',
						dados: array
					};
					return reply.view('alterarGado', data);
				});			
		}
	},
	{
		method: 'GET',
			path: '/cadastroGado',
			handler: function(request, reply) {
				var data = {
						title: 'Cadastrar Gado',
				};
				return reply.view('cadastrarGado', data);
			}
	},
	{
		method: 'GET',
			path: '/consultarGado',
			handler: function(request, reply) {
				crudGado.read(function(array){
					var data = {
						titlePage: 'Consultar Gado',
						title: 'Consultar Gado',
						dados: array
					};
					return reply.view('consultarGado', data);
				});
			}
	},
	{
		method: 'GET',
		path: '/readGado',		
		handler: function(request, reply) {
			crudGado.read(function(array){
				return reply(array);
			});
		}
	},
	{
		method: 'GET',
			path: '/cadastrarOrdenha',
			handler: function(request, reply) {
				var data = {
						title: 'Ordenha Gado',
				};
				return reply.view('cadastrarOrdenha', data);
			}
	},
	//ROTAS QUE FAZEM AÇÕES
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
				reply.redirect('cadastroGado');
			}
		}
	},
	{
		method: 'POST',
		path: '/alterarDadosGado',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				console.log(request.payload);
				crudGado.change(request.payload, function(erro){
					if(!erro){
						reply.redirect('alterarGado/' + request.payload.brinco);
					}
				});
			}
		}
	},
	{
		method: 'GET',
		path: '/deletarGado/{id}',
		handler: function(request, reply){
			console.log(request.params.id);
			crudGado.del(request.params.id);
			reply.redirect('../consultarGado');
		}
	},
	//ROTAS DA ORDENHA
	{
		method: 'POST',
		path: '/insertOrdenha',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				ordenha.insert(request.payload);
				reply.redirect('home');
			}
		}
	},
	{
		method: 'GET',
			path: '/consultarOrdenha',
			handler: function(request, reply) {
				ordenha.read(function(array){
					var data = {
						titlePage: 'Consultar Ordenha',
						title: 'Consultar Ordenha',
						dados: array
					};
					return reply.view('consultarOrdenha', data);
				});
			}
	},

];