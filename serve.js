var Hapi = require('hapi');
var Path = require('path');
var crudInsumo = require('./model/crudInsumo.js')  
var crudFinancas = require('./model/crudFinancas.js') 
var crudAnaliseLeite = require('./model/crudAnaliseLeite.js')
var crudTerreno = require('./model/crudTerreno.js')

var Inert = require('inert');

var server = new Hapi.Server({
	connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'app')
            }
        }
    }
});

server.connection({
	port: 3000
});


server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true
            }
        }
    });

    server.route({
    	method: 'POST',
    	path: '/insert',
    	config: {
    		payload: {
    			output: 'data',
    			parse: true
    		},
    		handler: function(request, reply){
				var urlRequest = request.info.referrer.split('/');
				var fileRequest = urlRequest[urlRequest.length - 1];		

				if(fileRequest == 'incluirAnaliseLeite.html') {
					crudAnaliseLeite.insert(request.payload);
				} else if (fileRequest == 'incluirFinancas.html') {
					crudFinancas.insert(request.payload);
				} else if (fileRequest == 'incluirInsumos.html') {
					crudInsumo.insert(request.payload);
				} else if (fileRequest == 'incluirTerreno.html') {
					crudTerreno.insert(request.payload);
				}
    		}
    	}
	});

    server.route({
    	method: 'GET',
    	path: '/read',
    	config: {
    		handler: function(request, reply){
    			var resultados = [];
				var nameCrud = request.payload.nameCrud;	

				if(nameCrud == 'analiseLeite') {
					crudAnaliseLeite.read(function(vetor){
						resultados = vetor;
					});
				} else if (nameCrud == 'financas') {
					crudFinancas.read(function(vetor){
						resultados = vetor;
					});
				} else if (nameCrud == 'insumos.html') {
					crudInsumo.read(function(vetor){
						resultados = vetor;
					});
				} else if (nameCrud == 'terreno.html') {
					crudTerreno.read(function(vetor){
						resultados = vetor;
					});
				}

    			
    		}
    	}
    });

	server.route({
    	method: 'GET',
    	path: '/returnChange',
    	config: {
    		handler: function(request, reply){
    			var resultados = [];
				var nameCrud = request.payload.nameCrud;	

				if(nameCrud == 'analiseLeite') {
					crudAnaliseLeite.returnChange(request.payload, function(vetor){
						resultados = vetor;
					});
				} else if (nameCrud == 'financas') {
					crudFinancas.returnChange(request.payload, function(vetor){
						resultados = vetor;
					});
				} else if (nameCrud == 'insumos.html') {
					crudInsumo.returnChange(request.payload, function(vetor){
						resultados = vetor;
					});
				} else if (nameCrud == 'terreno.html') {
					crudTerreno.returnChange(request.payload, function(vetor){
						resultados = vetor;
					});
				}
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
				var nameCrud = request.payload.nameCrud;	

				if(nameCrud == 'analiseLeite') {
					crudAnaliseLeite.change(request.payload);
				} else if (nameCrud == 'financas') {
					crudFinancas.change(request.payload);
				} else if (nameCrud == 'insumos.html') {
					crudInsumo.change(request.payload);
				} else if (nameCrud == 'terreno.html') {
					crudTerreno.change(request.payload);
				}
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
				var nameCrud = request.payload.nameCrud;	

				if(nameCrud == 'analiseLeite') {
					crudAnaliseLeite.del(request.payload);
				} else if (nameCrud == 'financas') {
					crudFinancas.del(request.payload);
				} else if (nameCrud == 'insumos.html') {
					crudInsumo.del(request.payload);
				} else if (nameCrud == 'terreno.html') {
					crudTerreno.del(request.payload);
				}
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