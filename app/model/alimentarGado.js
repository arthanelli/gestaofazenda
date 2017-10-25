const pg = require('pg');
const path = require('path');
const acessos = require('../database/acessos.js')

const config = acessos.config;

module.exports = {
    insert : function(arrayData) {
        var results = [];
        // Grab data from http request
        var data = {
            codgado: arrayData.codgado,
            nomegado: arrayData.nomegado,
            codalimento: arrayData.codalimento,
            nomealimento: arrayData.nomealimento,
            quantidadealimento: arrayData.quantidadealimento,
            codsuplemento: arrayData.codsuplemento,
            nomesuplemento: arrayData.nomesuplemento,
            quantidadesuplemento: arrayData.quantidadesuplemento
        };
    pg.connect(config, (err, client, done) => {
      if(err) {
        done();
        console.log(err);
      }
      var query = client.query('INSERT INTO alimentacao(codgado, nomegado, codalimento, nomealimento, quantidadealimento, codsuplemento, nomesuplemento, quantidadesuplemento) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
      [data.codgado, data.nomegado, data.codalimento, data.nomealimento, data.quantidadealimento, data.codsuplemento, data.nomesuplemento, data.quantidadesuplemento]);
     
      query.on('end', () => {
          done();
      });
    });      
  },
  read: (callback) =>  {
    let results = [];
    pg.connect(config, (err, client, done) => {
        if(err) {
            done();
            console.log(err);
        }

        var query = client.query('Select * from alimentacao ORDER BY id ASC;');
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
        var query = client.query('SELECT * FROM alimentacao WHERE id = $1', [data.id]);
        
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
            codgado: arrayData.codgado,
            nomegado: arrayData.nomegado,
            codalimento: arrayData.codalimento,
            nomealimento: arrayData.nomealimento,
            quantidadealimento: arrayData.quantidadealimento,
            codsuplemento: arrayData.codsuplemento,
            nomesuplemento: arrayData.nomesuplemento,
            quantidadesuplemento: arrayData.quantidadesuplemento
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
            client.query('UPDATE alimentacao SET codalimento=($1), nomealimento=($2), quantidadealimento=($3), codsuplemento=($4), nomesuplemento=($5), quantidadesuplemento=($6) WHERE id=($7)',
            [data.codalimento, data.nomealimento, data.quantidadealimento, data.codsuplemento, data.nomesuplemento, data.quantidadesuplemento, data.id]);
            // SQL Query > Select Data
            var query = client.query("SELECT * FROM alimentacao ORDER BY id ASC");
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
            client.query('DELETE FROM alimentacao WHERE id=($1)', [id]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM alimentacao ORDER BY id ASC');
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
    },
    consultarHistoricoAlimentacao: function(brinco, callback) {
        var results = [];
        data = {
            id : brinco
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
            var query = client.query('SELECT * FROM alimentacao WHERE codgado = $1', [data.id]);
            
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
}