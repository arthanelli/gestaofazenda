const vacinas = require('../model/vacinarGado');
const usuario = require('../model/crudUsuario');

function getDatas(data) {
  const obj = {};
  data.forEach(elem => {
    console.log(elem)
    elem[0].forEach(infos => {
      console.log(forEach)
    });
  });
}

module.exports = {
  method: 'GET',
  path: '/relatorio/{page}',
  handler: function(request, reply) {
    usuario.read(infos => {
      getDatas(infos)
      const data = {
        dados: infos
      }
      return reply.view('relatorio', data);      
    });
    // crudInsumoVacina.read(function(array){
    //   var data = {
    //     titlePage: 'Consultar estoque de vacinas',
    //     title: 'Vacinas',
    //     dados: array
    //   };
    //   return reply.view('consultarInsumoVacina', data);
    // });
  }
}