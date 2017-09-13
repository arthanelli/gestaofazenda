module.exports = [
	{
		method: 'GET',
		path: '/home',
    handler: function(request, reply){
      return reply.view('index');
		}
	}
]