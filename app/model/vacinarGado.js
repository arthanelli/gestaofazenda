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
            datadevacina: arrayData.datadevacina
        };
    pg.connect(config, (err, client, done) => {
      if(err) {
        done();
        console.log(err);
      }
      client.query('INSERT INTO vacinasrealizadas(codgado, nomegado, codvacina, nomevacina, datadevacina) VALUES($1, $2, $3, $4, $5)',
      [data.codgado, data.nomegado, data.codvacina, data.nomevacina, data.datadevacina]);
     
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

        var query = client.query('Select gado.brinco, gado.nome, estoquevacinas.nome, vacinasrealizadas.datadevacina from vacinasrealizadas join gado on(vacinasrealizadas.codgado = gado.brinco) join estoquevacinas on(vacinasrealizadas.codVacina = estoquevacinas.id);');
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
  }
}