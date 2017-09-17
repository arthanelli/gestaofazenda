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
  }
}