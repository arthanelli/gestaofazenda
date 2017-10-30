let uuid = 1;       // Use seq instead of proper unique identifiers for demo only


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
					return reply.view('login');					
				}
				if (request.method === 'post') {
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
			}
      }
    }
  },
	{
		method: 'GET',
		path: '/',
		config: {
			// validate: {
			// 	payload: {
			// 		email: Joi.string().email().required(),
			// 		password: Joi.string().min(2).max(200).required()
			// 	}
			// },
			handler: function(request, reply) {
				// getValidatedUser(request.payload.email, request.payload.password)
				// .then(function(user){
				reply.view('index')
				// })
				// .catch(function(err){
				// 	return reply(Boom.badImplementation());
				// });
			}
		}
  }
]