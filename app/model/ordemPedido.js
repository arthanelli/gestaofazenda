const pg = require('pg');
const path = require('path');
const acessos = require('../database/acessos.js')
const config = acessos.config;

module.exports = {
  insert: data => {
    pg.connect(config, (err, client, done) => {
      if(err) {
        done();
        console.log(err);
      }
      const query = client.query('INSERT INTO pedido(codigoComprador, quantidadeLitros, data, valor, dataVencimento, descricao, parcelamento, quantparcelamento) values($1, $2, $3, $4, $5, $6, $7, $8)',
      [data.codigoComprador, data.quantidadeLitros, data.data, data.valor, data.dataVencimento, data.descricao, data.parcelamento, data.quantparcelamento]);
    
      client.query('INSERT INTO transacoes(valor, tipo, descricao, data) values($1, $2, $3, $4)',
      [data.valor, 'RECEITA', 'Venda Leite', data.data])

      query.on('end', () => {
          done();
      });
    });      
  },
  read: (callback) =>  {
    pg.connect(config, (err, client, done) => {
        if(err) {
            done();
            console.log(err);
        }
        const query = client.query('SELECT ped.id, comp.responsavellegal, ped.quantidadeLitros, ped.data, ped.valor from pedido ped join comprador comp on ped.codigoComprador = comp.id;');
        const results = [];
        query.on('row', (row) => {
            results.push(row);
        });
        query.on('end', () => {
            done();
            if(callback != null) {
                callback(results);
            }
        });
    });
  }
}