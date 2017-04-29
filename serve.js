var Hapi = require('hapi');
var Path = require('path');
var crudEnsumo = require('./crudEnsumo.js')  

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
    			crudEnsumo.insert(request.payload);
    		}
    	}
	});

    server.route({
    	method: 'GET',
    	path: '/read',
    	config: {
    		handler: function(request, reply){
    			var resultados = [];
    			crudEnsumo.read(function(vetor){
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
    			crudEnsumo.del(request.payload);
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