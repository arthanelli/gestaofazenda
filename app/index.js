var Hapi = require('hapi');
var Path = require('path');
var Inert = require('inert');
const handlebars = require('handlebars');
var extend = require('handlebars-extend-block');
const helpers = require('./helpers')(handlebars);
const routes = require('./routes');

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

	server.route({  
		method: 'GET',
		path: '/fonts/{file*}',
		handler: {
			directory: { 
				path: './fonts/'
			}
		}
	});

	server.views({  
		engines: {
        html: extend(handlebars)
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
						script: '../js/main.js'
				};

				return reply.view('index', data);
			}
	});	

	server.route(routes);
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});