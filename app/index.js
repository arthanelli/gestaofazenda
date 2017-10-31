var Hapi = require('hapi');
var Path = require('path');
var Inert = require('inert');
const handlebars = require('handlebars');
var extend = require('handlebars-extend-block');
const helpers = require('./helpers')(handlebars);
const routes = require('./routes');
var BasicAuth = require('hapi-auth-basic');
var Bcrypt = require('bcrypt')
var AuthCookie = require('hapi-auth-cookie');

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
	port: 4000
});


server.register([require('vision'), Inert, {register: AuthCookie}], (err) => {

	if (err) {
			throw err;
	}

	const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
	server.app.cache = cache;
	
	// server.auth.strategy('basic', 'basic', { validateFunc: basicValidation })	
	server.auth.strategy('session', 'cookie', true, {
		password: 'password-should-be-32-characters',
		cookie: 'sid-example',
		redirectTo: '/login',
		isSecure: false,
		validateFunc: function (request, session, callback) {
			cache.get(session.sid, (err, cached) => {
					if (err) {
							return callback(err, false);
					}
					if (!cached) {
							return callback(null, false);
					}
					return callback(null, true, cached.account);
			});
		}
	});

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

	server.route({  
		method: 'GET',
		path: '/icons/{file*}',
		handler: {
			directory: { 
				path: './icons/'
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

	
	// server.route({
	// 	method: 'GET',
	// 		path: '/',
	// 		handler: function(request, reply) {

	// 			var data = {
	// 					title: 'Home',
	// 					script: '../js/main.js'
	// 			};

	// 			return reply.view('index', data);
	// 		}
	// });

	server.route(routes);
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});