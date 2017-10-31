const crudGado = require('../model/crudGado.js');	
const ordenha = require('../model/ordenha.js');
const vacina = require('../model/vacinarGado.js');
const alimento = require('../model/alimentarGado.js');
const reproducao = require('../model/reproducao.js');
const estoquevacina = require('../model/crudInsumoVacina.js');
const estoque = require('../model/crudInsumo.js');
const dieta = require('../model/dieta.js')

module.exports = [
	//ROTAS QUE CHAMAM AS TELAS
	{
		method: 'GET',
		path: '/painelGado/{brinco}',
		handler: function (request, reply) {
				crudGado.returnChange(request.params.brinco, function(array){
					var data = {
						pageName : 'alterarGado',
						titlePage: 'Alterar dados do Gado',
						title: '',
						dados: array
					};
					return reply.view('alterarGado', data);
				});			
		}
	},
	{
		method: 'GET',
			path: '/cadastroGado',
			config: {
				handler: function(request, reply) {
					var data = {
							title: 'Cadastrar Gado',
					};
					return reply.view('cadastrarGado', data);
				}	
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
						reply.redirect('/painelGado/' + request.payload.brinco);
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
			ordenha.del(request.params.id);
			reply.redirect('../consultarOrdenha');
		}
	},

		//ROTAS DA REPRODUCAO
		{
		method: 'GET',
		path: '/readReproducao',		
		handler: function(request, reply) {
			reproducao.read(function(array){
				return reply(array);
			});
		}
	},
	{
		method: 'GET',
			path: '/cadastrarReproducao',
			handler: function(request, reply) {
				var data = {
						title: 'Ordenha Gado',
				};
				return reply.view('cadastrarReproducao', data);
			}
	},
	{
		method: 'POST',
		path: '/insertReproducao',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				reproducao.insert(request.payload);
				reply.redirect('consultarReproducao');
			}
		}
	},
	{
		method: 'GET',
			path: '/consultarReproducao',
			handler: function(request, reply) {
				reproducao.read(function(array){
					var data = {
						titlePage: 'Consultar Reproducao',
						title: 'Consultar Reproducao',
						dados: array
					};
					return reply.view('consultarReproducao', data);
				});
			}
	},	{
		method: 'GET',
		path: '/alterarReproducao/{id}',
		handler: function (request, reply) {
				reproducao.returnChange(request.params.id, function(array){
					var data = {
						pageName : 'alterarReproducao',
						titlePage: 'Alterar dados da Reproducao',
						title: 'Alterar Reproducao',
						dados: array
					};
					return reply.view('alterarReproducao', data);
				});			
		}
	},
	{
		method: 'POST',
		path: '/alterarDadosReproducao',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				reproducao.change(request.payload, function(erro){
					if(!erro){
						reply.redirect('consultarReproducao');
					}
				});
			}
		}
	},
	{
		method: 'GET',
		path: '/deletarReproducao/{id}',
		handler: function(request, reply){
			console.log(request.params.id);
			reproducao.del(request.params.id);
			reply.redirect('../consultarReproducao');
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
	{
		method: 'GET',
			path: '/consultarVacinaRealizada',
			handler: function(request, reply) {
				vacina.read(function(array){
					var data = {
						titlePage: 'Consultar Vacina Realizada',
						title: 'Consultar Vacina Realizada',
						dados: array
					};
					return reply.view('consultarVacinasRealizadas', data);
				});
			}
	},
	{
		method: 'GET',
		path: '/deletarVacina/{id}',
		handler: function(request, reply){
			vacina.del(request.params.id);
			reply.redirect('/consultarVacinaRealizada');
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
					reply.redirect('/consultarVacinaRealizada');
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
	{
		method: 'GET',
		path: '/historicoVacinacao/{brinco}',
		handler: function (request, reply) {
				vacina.consultarHistoricoVacinacao(request.params.brinco, function(array){
					var data = {
						pageName : 'historicoVacinacao',
						titlePage: 'Histórico de vacinação do Gado',
						title: '',
						dados: array
					};
					return reply.view('consultarVacinacaoEspecifica', data);
				});			
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
						brinco: array.brinco,
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
			console.log(request.params);
			reply.redirect('../painelGado/' + request.params.codgado);
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
	{
		method: 'POST',
		path: '/dietaGado',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				dieta(request.payload.brinco, data => {
					console.log(data)
					reply(data);
				});
			}
		}
	},
	{
		method: 'GET',
		path: '/historicoAlimentacao/{brinco}',
		handler: function (request, reply) {
				alimento.consultarHistoricoAlimentacao(request.params.brinco, function(array){
					var data = {
						pageName : 'historicoAlimentacao',
						titlePage: 'Histórico de alimentação do Gado',
						title: 'Histórico de alimentação do Gado',
						dados: array
					};
					return reply.view('consultarAlimentacaoEspecifica', data);
				});			
		}
	}
];