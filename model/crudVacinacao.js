var pg = require('pg');
var path = require('path');
var acessos = require('../database/acessos.js')
var config = acessos.config;

module.exports = {
    insert : function(arrayData) {
        var results = [];
        // Grab data from http request
        var data = {
        	nomeVacina: arrayData.nomeVacina, 
            descricaoVacina: arrayData.descricaoVacinaa,
        	prescricaoVacinacao: arrayData.prescricaoVacinacao, 
        	periodicidade: arrayData.periodicidade, 
        	gadosVacinados: arrayData.gadosVacinados, 
        	gadosNaoVacinados: arrayData.gadosNaoVacinados 
        };
        // Get a Postgres client from the connection pool
        pg.connect(config, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                //return res.status(500).json({success: false, data: err});
            }
            // SQL Query > Insert Data
            client.query('INSERT INTO vacinacao(nomeVacina,  descricaoVacina, prescricaoVacinacao, periodicidade, gadosVacinados, gadosNaoVacinados) values($1, $2, $3, $4, $5, $6)',
            [data.nomeVacina, data.descricaoVacina, data.prescricaoVacinacao, data.periodicidade, data.gadosVacinados, data.gadosNaoVacinados]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM vacinacao ORDER BY id ASC');
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                //console.log(results);
                //return ;
                // if (callback != null) {
                //     callback(results);
                // }   
            });
        });
    },
    read : function(callback) {
        var results = [];
        // Get a Postgres client from the connection pool
        pg.connect(config, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                //return res.status(500).json({success: false, data: err});
            }
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM vacinacao ORDER BY id ASC;');
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
    change : function(id_change) {
        var results = [];
        // Grab data from the URL parameters
        var id = id_change;
        // Grab data from http request
        var data = {produto: arrayData.produto, endereco: arrayData.endereco, valor: arrayData.valor, troco: arrayData.troco, obs: arrayData.obs, data: arrayData.data};
        // Get a Postgres client from the connection pool
        pg.connect(config, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                //return res.status(500).json({success: false, data: err});
            }
            // SQL Query > Update Data
            client.query('UPDATE items SET produto=($1), endereco=($2), valor=($3), troco=($4), obs=($5), data=($6) WHERE id=($7)',
            [data.produto, data.endereco, data.valor, data.troco, data.obs, data.data, id]);
            // SQL Query > Select Data
            var query = client.query("SELECT * FROM items ORDER BY id ASC");
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', function() {
                done();
                //return res.json(results);
            });
        });
    },
    del : function(arrayData) {
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
            client.query('DELETE FROM vacinacao WHERE id=($1)', [arrayData.id]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM vacinacao ORDER BY id ASC');
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