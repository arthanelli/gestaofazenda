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
      client.query('INSERT INTO vacinasrealizadas(brinco, nomegado, nomevacina, datadevacinacao,) values($1, $2, $3, $4)',
      [arrayData.brinco, arrayData.nomegado, arrayData.vacina, arrayData.datadevacinacao]);

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