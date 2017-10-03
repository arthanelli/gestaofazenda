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
  }
}