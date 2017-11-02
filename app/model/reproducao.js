const pg = require('pg');
const path = require('path');
const acessos = require('../database/acessos.js')

const config = acessos.config;

module.exports = {
  insert: arrayData => {

    pg.connect(config, (err, client, done) => {
      if(err) {
        done();
        console.log(err);
      }
      const query = client.query('INSERT INTO reproducao(brinco, datacio, dataultimocio, tiporeproducao, brincoboi, numartificial, qtdtentativa, observacao) values($1, $2, $3, $4, $5, $6, $7, $8)',
      [arrayData.brinco, arrayData.datacio, arrayData.dataultimocio, arrayData.tiporeproducao, arrayData.brincoboi, arrayData.numartificial, arrayData.qtdtentativa, arrayData.observacao]);

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
        var query = client.query('Select rep.id, rep.brinco, gad.nome, rep.dataCio, rep.dataultimocio, rep.tipoReproducao, rep.brincoBoi, rep.numArtificial, rep.qtdTentativa, rep.observacao from reproducao rep join gado gad on rep.brinco = gad.brinco;');
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
            var query = client.query('SELECT * FROM reproducao WHERE id = $1', [data.id]);
            
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
          brinco: arrayData.brinco,
          datacio: arrayData.datacio, 
          dataultimocio: arrayData.dataultimocio,
          tiporeproducao: arrayData.tiporeproducao,
          brincoboi: arrayData.brincoboi,
          numartificial: arrayData.numartificial,
          qtdtentativa: arrayData.qtdtentativa, 
          observacao: arrayData.observacao
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
            client.query('UPDATE reproducao SET brinco=($1), datacio=($2),dataultimocio($3), tiporeproducao=($4), brincoboi=($5), numartificial=($6), qtdtentativa=($7), observacao=($8) WHERE id=($9)',
            [data.brinco, data.datacio, data.dataultimocio, data.tiporeproducao, data.brincoboi, data.numartificial, data.qtdtentativa, data.observacao, data.id]);
            // SQL Query > Select Data
            var query = client.query("SELECT * FROM reproducao ORDER BY id ASC");
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
            client.query('DELETE FROM reproducao WHERE id=($1)', [id]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM reproducao ORDER BY id ASC');
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
