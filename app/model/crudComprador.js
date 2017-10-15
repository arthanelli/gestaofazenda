const pg = require('pg');
const path = require('path');
const acessos = require('../database/acessos.js');
const config = acessos.config;

module.exports = {
  insert: data => {
    pg.connect(config, (err, client, done) => {
      if(err) {
        done();
        console.log(err);
      }
      const query = client.query('INSERT INTO comprador(razaoSocial, nomeFantasia, tipo, cadastroNacional, endereco, responsavelLegal, telefone, email) values($1, $2, $3, $4, $5, $6, $7, $8)',      
      [data.razaoSocial, data.nomeFantasia, data.tipo, data.cadastroNacional, data.endereco, data.responsavelLegal, data.telefone, data.email]);
      query.on('end', () => {
          done();
      });
    });      
  },
  read: callback => {
    let results = [];
    pg.connect(config, (err, client, done) => {
        if(err) {
            done();
            console.log(err);
        }
        var query = client.query('SELECT * FROM comprador ORDER BY id ASC;');
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
            var query = client.query('SELECT * FROM comprador WHERE id = $1', [data.id]);
            
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
          razaoSocial: arrayData.razaoSocial, 
          nomeFantasia: arrayData.nomeFantasia, 
          tipo: arrayData.tipo, 
          cadastroNacional: arrayData.cadastroNacional, 
          endereco: arrayData.endereco,
          responsavelLegal: arrayData.responsavelLegal,
          telefone: arrayData.telefone,
          email: arrayData.email
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
            client.query('UPDATE comprador SET razaoSocial=($1), nomeFantasia=($2), tipo=($3), cadastroNacional=($4), endereco=($5), responsavelLegal=($6), telefone=($7), email=($8)  WHERE id=($9)',
            [data.razaoSocial, data.nomeFantasia, data.tipo, data.cadastroNacional, data.endereco, data.responsavelLegal, data.telefone, data.email, data.id]);
            // SQL Query > Select Data
            var query = client.query("SELECT * FROM comprador ORDER BY id ASC");
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
            client.query('DELETE FROM comprador WHERE id=($1)', [id]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM comprador ORDER BY id ASC');
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