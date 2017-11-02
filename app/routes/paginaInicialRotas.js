let uuid = 1;       // Use seq instead of proper unique identifiers for demo only
const user = require('../model/crudUsuario.js');

module.exports = [
	{
    method: ['GET', 'POST'],
		path: '/login',
		config: {
      auth: {
        strategy: 'session',
        mode: 'try'
      },
      plugins: {
        'hapi-auth-cookie': { redirectTo: false }
      },
      handler: function(request, reply) {
				if ( request.method === 'get' ) {				
					return reply.view('login', null, { layout: 'sem_layout' });					
				}
				if (request.method === 'post') {
					user.validate(request.payload, account => {
						if(account) {
							const sid = String(++uuid);
							const account = {
								id: 'john',
								password: 'password',
								name: 'John Doe'
							}		
							request.server.app.cache.set(sid, { account: account}, 0, (err) => {
								if (err) {
										reply(err);
								}
								request.cookieAuth.set({ sid: sid });
								return reply.redirect('/');
							});
						} else {
							return reply.view('login', null, { layout: 'sem_layout' });					
						};
					});
				}
      }
    }
  },
	{
		method: 'GET',
		path: '/',
		config: {
			handler: function(request, reply) {
				reply.view('index')
			}
		}
	},
	{
		method: 'GET',
		path: '/logout',
		config: {
			handler: function(request, reply) {
				request.cookieAuth.clear();
				return reply.redirect('/login');
			}
		}
	}
]