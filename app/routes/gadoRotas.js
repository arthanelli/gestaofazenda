const crudGado = require('../model/crudGado.js');	
const ordenha = require('../model/ordenha.js');
const vacina = require('../model/vacinarGado.js');
const alimento = require('../model/alimentarGado.js');
const estoquevacina = require('../model/crudInsumoVacina.js');
const estoque = require('../model/crudInsumo.js');

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
						reply.redirect('/consultarGado');
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
	},	{
		method: 'GET',
		path: '/alterarOrdenha/{id}',
		handler: function (request, reply) {
				ordenha.returnChange(request.params.id, function(array){
					var data = {
						pageName : 'alterarOrdenha',
						titlePage: 'Alterar dados da Ordenha',
						title: 'Alterar Ordenha',
						dados: array
					};
					return reply.view('alterarOrdenha', data);
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
				ordenha.change(request.payload, function(erro){
					if(!erro){
						reply.redirect('consultarOrdenha');
					}
				});
			}
		}
	},
	{
		method: 'GET',
		path: '/deletarOrdenha/{id}',
		handler: function(request, reply){
			console.log(request.params.id);
			crudGado.del(request.params.id);
			reply.redirect('../consultarOrdenha');
		}
	},

	//ROTAS DE VACINA NO GADO
	{
		method: 'GET',
			path: '/vacinarGado/{brinco}',
			handler: function(request, reply) {
				crudGado.returnChange(request.params.brinco, function(array){
					var data = {
						pageName : 'cadastrarVacinacao',
						titlePage: 'Cadastrar dados de vacinacao',
						title: 'Cadastrar dados de Vacinação',
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
	//{
	//	method: 'POST',
	//	path: '/alterarDadosOrdenha',
	//	config: {
	//		payload: {
	//			output: 'data',
	//			parse: true
	//		},
	//		handler: function(request, reply){
	//			console.log(request.payload);
	//			vacina.insert(request.payload);
	//			reply.redirect('cadastrarVacinaRealizada');
	//		}
	//	}
	//},
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
			vacina.del(request.params.id);
			reply.redirect('../consultarVacinasRealizadas');
		}
	},
	{
		method: 'GET',
		path: '/alterarVacinaRealizada/{id}',
		handler: function (request, reply) {
				vacina.returnChange(request.params.id, function(array){
					var data = {
						pageName : 'alterarVacina',
						titlePage: 'Alterar dados de Vacinacao',
						title: 'Alterar dados de Vacinação',
						dados: array
					};
					return reply.view('alterarVacinaRealizada', data);
				});			
		}
	},
	{
		method: 'POST',
		path: '/insertVacinaGado',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				const id = request.payload.codvacina;
				estoquevacina.returnChange(id, function(array){
					var data = {
						pageName : 'cadastrarVacina',
						titlePage: 'Cadastrar dados de vacinacao',
						title: 'Cadastrar dados de Vacinação',
						dados: array,
					};
					const nomevacina = data.dados[0].nome;
					request.payload.nomevacina = nomevacina;
					vacina.insert(request.payload);
					reply.redirect('consultarVacinasRealizadas');
				});
			}
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
				const id = request.payload.codvacina;
				estoquevacina.returnChange(id, function(array){
					var data = {
						pageName : 'alterarVacina',
						titlePage: 'Alterar dados de vacinacao',
						title: 'Alterar dados de Vacinação',
						dados: array,
					};
					const nomevacina = data.dados[0].nome;
					request.payload.nomevacina = nomevacina;
					vacina.change(request.payload, function(erro){
						if(!erro){
							reply.redirect('consultarVacinasRealizadas');
						}
					});
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
						pageName : 'cadastrarAlimentacao',
						titlePage: 'Cadastrar dados de Alimentação',
						title: 'Cadastrar dados de Alimentação',
						dados: array
					};
					return reply.view('cadastrarAlimentacao', data);
				});
			}
	},
	{
		method: 'GET',
			path: '/consultarAlimentacao',
			handler: function(request, reply) {
				alimento.read(function(array){
					var data = {
						titlePage: 'Consultar Alimentação',
						title: 'Consultar Alimentação',
						dados: array
					};
					return reply.view('consultarAlimentacao', data);
				});
			}
	},
	{
		method: 'GET',
		path: '/dadosAlimentos',		
		handler: function(request, reply) {
			estoque.consultarAlimentos(function(array){
				return reply(array);
			});
		}
	},
	{
		method: 'GET',
		path: '/dadosSuplementos',		
		handler: function(request, reply) {
			estoque.consultarSuplementos(function(array){
				return reply(array);
			});
		}
	},
	{
		method: 'GET',
		path: '/deletarAlimentacao/{id}',
		handler: function(request, reply){
			alimento.del(request.params.id);
			reply.redirect('../consultarAlimentacao');
		}
	},
	{
		method: 'GET',
		path: '/alterarAlimentacao/{id}',
		handler: function (request, reply) {
				alimento.returnChange(request.params.id, function(array){
					var data = {
						pageName : 'alterarVAlimentacao',
						titlePage: 'Alterar dados de Alimentação',
						title: 'Alterar dados de Alimentação',
						dados: array
					};
					return reply.view('alterarAlimentacao', data);
				});			
		}
	},
	{
		method: 'POST',
		path: '/insertAlimentacao',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				const idalimento = request.payload.codalimento;
				const idsuplemento = request.payload.codsuplemento;
				estoque.returnChange(idalimento, function(array){
					var data = {
						pageName : 'cadastrarAlimentacao',
						titlePage: 'Cadastrar dados de alimentação',
						title: 'Cadastrar Alimentação',
						dados: array
					};
					const nomealimento = data.dados[0].nome;
					request.payload.nomealimento = nomealimento;
				});
				estoque.returnChange(idsuplemento, function(array){
					var data = {
						pageName : 'cadastrarAlimentacao',
						titlePage: 'Cadastrar dados de alimentação',
						title: 'Cadastrar Alimentação',
						dados: array,
					};
					const nomesuplemento = data.dados[0].nome;
					request.payload.nomesuplemento = nomesuplemento;
					alimento.insert(request.payload);
					reply.redirect('consultarAlimentacao');
				});
			}
		}
	},
	{
		method: 'POST',
		path: '/alterarDadosAlimentacao',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				const idalimento = request.payload.codalimento;
				const idsuplemento = request.payload.codsuplemento;
				estoque.returnChange(idalimento, function(array){
					var data = {
						pageName : 'alterarAlimentacao',
						titlePage: 'Alterar dados de alimentação',
						title: 'Alterar Alimentação',
						dados: array,
					};
					const nomealimento = data.dados[0].nome;
					request.payload.nomealimento = nomealimento;
				});
				estoque.returnChange(idsuplemento, function(array){
					var data = {
						pageName : 'alterarAlimentacao',
						titlePage: 'Alterar dados de alimentação',
						title: 'Alterar Alimentação',
						dados: array,
					};
					const nomesuplemento = data.dados[0].nome;
					request.payload.nomesuplemento = nomesuplemento;
					alimento.change(request.payload, function(erro){
						if(!erro){
							reply.redirect('consultarAlimentacao');
						}
					});
				});
			}
		}
	},
];