var Hapi = require('hapi');
var Path = require('path');
var crudInsumo = require('./model/crudInsumo.js')  
var crudFinancas = require('./model/crudFinancas.js') 
var crudAnaliseLeite = require('./model/crudAnaliseLeite.js')
var crudTerreno = require('./model/crudTerreno.js')
var crudVacinacao = require('./model/crudVacinacao.js')

var Inert = require('inert');

var server = new Hapi.Server({
	connections: {
			routes: {
				files: {
						relativeTo: Path.join(__dirname, 'views')
				}
			}
    }
});

server.connection({
	host: 'localhost',
	port: 3000
});


server.register([require('vision'), Inert], (err) => {

	if (err) {
			throw err;
	}

	server.route({  
		method: 'GET',
		path: '/css/{file*}',
		handler: {
			directory: { 
				path: './css/'
			}
		}
	});

	server.route({  
		method: 'GET',
		path: '/js/{file*}',
		handler: {
			directory: { 
				path: './js/'
			}
		}
	});

	server.views({  
		engines: {
				html: require('handlebars')
		},
		path: 'views',
		layoutPath: 'views/layout',
		layout: 'default',
		partialsPath: 'views/partials'
		//helpersPath: 'views/helpers',
	});

	
	server.route({
		method: 'GET',
			path: '/',
			handler: function(request, reply) {

				var data = {
						title: 'Home',
						script: '../js/consultarVacina.js'
				};

				return reply.view('index', data);
			}
	});

	server.route({
		method: 'POST',
		path: '/insertVacina',
		config: {
			payload: {
				output: 'data',
				parse: true
			},
			handler: function(request, reply){
				crudVacinacao.insert(request.payload);

				reply('/cadastrovacina');
			}
		}
	});

	server.route({
		method: 'GET',
			path: '/cadastrovacina',
			handler: function(request, reply) {

				var data = {
						title: 'Vacina',
				};

				return reply.view('index', data);
			}
	});


	server.route({
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
	});

	server.route({
		method: 'GET',
			path: '/cadastroFinanceiro',
			handler: function(request, reply) {

				var data = {
						title: 'Financeiro',
				};

				return reply.view('cadastroFinanceiro', data);
			}
	});

    server.route({
    	method: 'GET',
    	path: '/read',
    	config: {
    		handler: function(request, reply){
    			var resultados = [];
				
    		}
    	}
    });

	server.route({
    	method: 'GET',
    	path: '/returnChange',
    	config: {
    		handler: function(request, reply){
    			var resultados = [];
				
    		}
    	}
    });

	server.route({
    	method: 'POST',
    	path: '/change',
    	config: {
    		payload: {
    			output: 'data',
    			parse: true
    		},
    		handler: function(request, reply){
				}
    	}
	});

    server.route({
    	method: 'POST',
    	path: '/deletar',
    	config: {
    		payload: {
    			output: 'data',
    			parse: true
    		},
    		handler: function(request, reply){
				
    		}
    	}
	});

});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});