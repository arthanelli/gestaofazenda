const i = require('../model/crudInsumo');
const t = require('../model/transacoes');
const o = require('../model/ordenha');
const v = require('../model/crudInsumoVacina');
const analise =  require('../model/crudAnaliseLeite');

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
    if (page === "transacoes") {
      t.read(infos => {
        const data = {
          titlePDF: 'Relatório do financeiro no sistema',
          header: ['Id', 'Valor', 'Tipo', 'Descrição', 'Data'],
          dados: getDatas(infos),
        }
        return reply.view('relatorio', data);      
      });
    } else if (page === "ordenha") {
      o.read(infos => {
        const data = {
          titlePDF: 'Relatório do ordenha no sistema',
          header: ['Id', 'Brinco', 'Nome', 'Litros de leite', 'Data'],
          dados: getDatas(infos),
        }
        return reply.view('relatorio', data);      
      });
    } else if (page === "estoque") {
      i.read(infos => {
        const data = {
          titlePDF: 'Relatório do estoque no sistema',
          header: ['Id', 'Nome', 'Preço', 'Fornecedor', 'Descrição', 'Quantidade', 'Data de validade', 'Tipo'],
          dados: getDatas(infos),
        }
        return reply.view('relatorio', data);      
      });
    } else if (page === "estoquedevacina") {
      v.read(infos => {
        const data = {
          titlePDF: 'Relatório do estoque de vacinas no sistema',
          header: ['Id', 'Nome', 'Preço', 'Fornecedor', 'Descrição', 'Quantidade', 'Data de validade', 'Indicação', 'Prescrição', 'Dias de Carência', 'Unidade de Medida', 'Modo de Uso'],
          dados: getDatas(infos),
        }
        return reply.view('relatorio', data);      
      });
    } else if (page === "analiseleite") {
      analise.read(infos => {
        const data = {
          titlePDF: 'Relatório de Análises de Leite no sistema',
          header: ['Id', 'Nome', 'Data de teste', 'Responsável', 'Lote de amostra', 'Especificação do teste', 'Resultado'],
          dados: getDatas(infos),
        }
        return reply.view('relatorio', data);      
      });
    }
  }
}