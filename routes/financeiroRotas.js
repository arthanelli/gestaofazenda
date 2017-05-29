var crudFinancas = require('../model/crudFinancas.js') 

module.exports = [

  //ROTAS QUE CHAMAM AS TELAS
	{
		method: 'GET',
			path: '/cadastrarLancamento',
			handler: function(request, reply) {

				var data = {
						title: 'Financeiro',
				};

				return reply.view('cadastrarLancamento', data);
			}
	},
	{
		method: 'GET',
			path: '/consultarLancamento',
			handler: function(request, reply) {
				crudFinancas.read(function(array){
					var data = {
						titlePage: 'Consultar Lançamento',
						title: 'Financeiro',
						dados: array
					};
					return reply.view('consultarLancamento', data);
				});
			}
	},
	{
			method: 'GET',
			path: '/alterarLancamento/{codlancamento}',
			handler: function (request, reply) {
					crudFinancas.returnChange(request.params.codlancamento, function(array){
						var data = {
							pageName : 'alterarLancamento',
							titlePage: 'Alterar Lançamento',
							titleAlterar: 'Finanças',
							dados: array
						};
						return reply.view('alterarLancamento', data);
					});			
			}
	},
	//ROTAS QUE REALIZAM AÇÕES
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
					reply.redirect('cadastrarLancamento');
				}
			}
	},
	{
		method: 'POST',
		path: '/alterarDadosLancamento',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				crudFinancas.change(request.payload, function(erro){
					if(!erro){
						reply.redirect('alterarLancamento/' + request.payload.codlancamento);
					}
				});
			}
		}
	},
	{
		method: 'GET',
		path: '/deletarLancamento/{codlancamento}',
		handler: function(request, reply){
			crudFinancas.del(request.params.codlancamento);
			reply.redirect('../consultarLancamentos');
		}
	},
];