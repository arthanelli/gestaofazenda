const pg = require('pg');
const path = require('path');
const acessos = require('../database/acessos.js')

const config = acessos.config;

module.exports = {
  insert: arrayData => {
    let results = [];

    pg.connect(config, (err, client, done) => {
      if(err) {
        done();
        console.log(err);
      }
      client.query('INSERT INTO ordenha(brinco, litrosleite, data) values($1, $2, $3)',
      [arrayData.brinco, arrayData.litrosleite, arrayData.data]);

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
        var query = client.query('Select ord.id, ord.brinco, gad.nome, ord.litrosleite, ord.data from ordenha ord join gado gad on ord.brinco = gad.brinco;');
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