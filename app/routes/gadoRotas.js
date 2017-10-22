const crudGado = require('../model/crudGado.js');	
const ordenha = require('../model/ordenha.js');
const vacina = require('../model/vacinarGado.js');
const estoquevacina = require('../model/crudInsumoVacina.js');

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
		path: '/readOrdenha',		
		handler: function(request, reply) {
			ordenha.read(function(array){
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
				reply.redirect('consultarGado');
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
				reply.redirect('consultarOrdenha');
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

	//ROTAS DE VACINA NO GADO
	{
		method: 'GET',
			path: '/vacinarGado/{brinco}',
			handler: function(request, reply) {
				crudGado.returnChange(request.params.brinco, function(array){
					var data = {
						pageName : 'cadastrarVacina',
						titlePage: 'Cadastrar dados de Vacina',
						title: 'Cadastrar vacina',
						dados: array
					};
					return reply.view('cadastrarVacinaRealizada', data);
				});
			}
	},
	{
		method: 'GET',
		path: '/dadosVacina',		
		handler: function(request, reply) {
			estoquevacina.read(function(array){
				return reply(array);
			});
		}
	},
	{
		method: 'POST',
		path: '/alterarDadosOrdenha',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				console.log(request.payload);
				vacina.insert(request.payload);
				reply.redirect('cadastrarVacinaRealizada');
			}
		}
	},
	{
		method: 'GET',
			path: '/consultarVacinaRealizada',
			handler: function(request, reply) {
				ordenha.read(function(array){
					var data = {
						titlePage: 'Consultar Vacina Realizada',
						title: 'Consultar Vacina Realizada',
						dados: array
					};
					return reply.view('consultarVacinaRealizada', data);
				});
			}
	},
	{
		method: 'GET',
		path: '/deletarVacina/{id}',
		handler: function(request, reply){
			vacinas.del(request.params.id);
			reply.redirect('consultarVacinasRealizadas');
		}
	},
	{
		method: 'POST',
		path: '/alterarDadosVacina',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				vacinas.change(request.payload, function(erro){
					if(!erro){
						reply.redirect('alterarVacinaRealizada/' + request.payload.brinco);
					}
				});
			}
		}
	},

	//ROTAS DE ALIMENTAÇÃO NO GADO
	{
		method: 'GET',
			path: '/alimentarGado/{brinco}',
			handler: function(request, reply) {
				const brinco = request.params.brinco;
				crudGado.returnChange(brinco, array => {
					const data = {
						pageName : 'cadastrarVacina',
						titlePage: 'Cadastrar dados de vacina',
						title: 'Cadastrar Vacina',
						dados: array
					};
					return reply.view('cadastrarAlimentacao', data);
				});
			}
	},

];