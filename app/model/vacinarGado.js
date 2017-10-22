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
            codvacina: arrayData.codvacina,
            nomevacina: arrayData.nomevacina,
            datadevacina: arrayData.datadevacina,
            nomeresponsavel: arrayData.nomeresponsavel,
            observacoes: arrayData.observacoes
        };
    pg.connect(config, (err, client, done) => {
      if(err) {
        done();
        console.log(err);
      }
      var query = client.query('INSERT INTO vacinasrealizadas(codgado, nomegado, codvacina, nomevacina, datadevacina, nomeresponsavel, observacoes) VALUES($1, $2, $3, $4, $5, $6, $7)',
      [data.codgado, data.nomegado, data.codvacina, data.nomevacina, data.datadevacina, data.nomeresponsavel, data.observacoes]);
     
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

        var query = client.query('Select * from vacinasrealizadas ORDER BY id ASC;');
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
        var query = client.query('SELECT * FROM vacinasrealizadas WHERE id = $1', [data.id]);
        
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
            brinco: arrayData.codgado,
            nomegado: arrayData.nomegado,
            codvacina: arrayData.codvacina,
            nomevacina: arrayData.nomevacina,
            datadevacina: arrayData.datadevacina,
            nomeresponsavel: arrayData.nomeresponsavel,
            observacoes: arrayData.observacoes
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
            client.query('UPDATE vacinasrealizadas SET codvacina=($1), nomevacina=($2), datadevacina=($3), nomeresponsavel=($4), observacoes=($5) WHERE id=($6)',
            [data.codvacina, data.nomevacina, data.datadevacina, data.nomeresponsavel, data.observacoes, data.id]);
            // SQL Query > Select Data
            var query = client.query("SELECT * FROM vacinasrealizadas ORDER BY id ASC");
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
            client.query('DELETE FROM vacinasrealizadas WHERE id=($1)', [id]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM vacinasrealizadas ORDER BY id ASC');
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