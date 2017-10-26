const vacinas = require('../model/vacinarGado');
const usuario = require('../model/crudUsuario');

function getDatas(data) {
  const obj = {};
  data.forEach((elem, index) => {
    obj[index] = Object.values(elem);
  });
  return obj;
}

module.exports = {
  method: 'GET',
  path: '/relatorio/{page}',
  handler: function(request, reply) {
    const page = request.params.page;
    usuario.read(infos => {
      const data = {
        titlePDF: 'Relatório de Usuários do sistema',
        header: ['ID', 'Nome', 'Idade', 'Sexo', 'Data de nascimento', 'Endereço', 'Usuário', 'Senha', 'Nível de permissão'],
        dados: getDatas(infos),
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