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
    			crudFinancas.insert(request.payload);
    		}
    	}
	});

    server.route({
    	method: 'GET',
    	path: '/read',
    	config: {
    		handler: function(request, reply){
    			var resultados = [];
    			crudInsumo.read(function(vetor){
    				resultados = vetor;
    			});
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
    			crudInsumo.del(request.payload);
    			reply("ooooo");
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