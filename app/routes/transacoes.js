const transacoes = require('../model/transacoes.js');

module.exports = [
	{
		method: 'GET',
			path: '/transacoes',
			handler: function(request, reply) {
        return reply.view('transacoes');
			}
	},
	{
		method: 'GET',
		path: '/transactions',		
		handler: function(request, reply) {
			transacoes.read(function(array){
				return reply(array);
			});
		}
	},
];