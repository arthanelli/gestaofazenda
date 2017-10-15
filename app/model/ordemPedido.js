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
  },
  returnChange : function(id, callback) {
        var results = [];
        data = {
            id : id
        }
        // Get a Postgres client from the connection pool
        pg.connect(config, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                //return res.status(500).json({success: false, data: err});
            }
            
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM pedido WHERE id = $1', [data.id]);
            
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                //console.log(results);
                if(callback != null) {
                    callback(results);
                }
            });
        });
    },
    change : function(arrayData, callback) {
        var results = [];
        var erro = false;
        // Grab data from http request
        var data = {
          id: arrayData.id, 
          responsavelLegal: arrayData.responsavelLegal, 
          quantidadeLitros: arrayData.quantidadeLitros, 
          data: arrayData.data, 
          valor: arrayData.valor, 
          dataVencimento: arrayData.dataVencimento,
          descricao: arrayData.descricao,
          parcelamento: arrayData.parcelamento,
          quantparcelamento: arrayData.quantparcelamento
        };        
        pg.connect(config, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);

                if(callback != null) {
                    callback(erro);
                }
                //return res.status(500).json({success: false, data: err});
            }
            // SQL Query > Update Data
            client.query('UPDATE pedido SET responsavelLegal=($1), quantidadeLitros=($2), data=($3), valor=($4), dataVencimento=($5), descricao=($6), parcelamento=($7), quantparcelamento=($8)  WHERE id=($9)',
            [data.responsavelLegal, data.quantidadeLitros, data.data, data.valor, data.dataVencimento, data.descricao, data.parcelamento, data.quantparcelamento, data.id]);
            // SQL Query > Select Data
            var query = client.query("SELECT * FROM pedido ORDER BY id ASC");
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();

                if(callback != null) {
                    callback(erro);
                }
                //return res.json(results);
            });
        });
    },
    del : function(id) {
        var results = [];
        // Grab data from the URL parameters
        // Get a Postgres client from the connection pool
        pg.connect(config, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
               // return res.status(500).json({success: false, data: err});
            }
            // SQL Query > Delete Data
            client.query('DELETE FROM pedido WHERE id=($1)', [id]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM pedido ORDER BY id ASC');
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                //return res.json(results);
            });
        });
    }
}