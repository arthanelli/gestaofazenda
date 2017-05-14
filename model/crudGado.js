var pg = require('pg');
var path = require('path');
const acessos = require('../database/acessos.js')
var config = acessos.config;

module.exports = {
    insert : function(arrayData) {
        var results = [];
        // Grab data from http request
        var data = {
        	brinco: arrayData.brinco,
            nome: arrayData.nome,
        	raca: arrayData.raca, 
        	idade: arrayData.idade, 
        	status: arrayData.status, 
        	cicloProdutivo: arrayData.cicloProdutivo,
            lactacao: arrayData.lactacao,
            vacinas: arrayData.vacinas,
            alimentacao: arrayData.alimentacao
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
            client.query('INSERT INTO gado(brinco, nome, raca, idade, status, cicloProdutivo, lactacao, vacinas, alimentacao) values($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [data.brinco, data.nome, data.raca, data.idade, data.status, data.cicloProdutivo, data.lactacao, data.vacinas, data.alimentacao ]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM insumos ORDER BY id ASC');
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
            var query = client.query('SELECT * FROM gado ORDER BY id ASC;');
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
    returnChange : function(id, callback) {
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
            var query = client.query('SELECT * FROM gado WHERE id = "$1"', [id]);
            
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
    change : function(arrayData) {
        var results = [];
        // Grab data from the URL parameters
        var data = {
        	brinco: arrayData.brinco,
            nome: arrayData.nome,
        	raca: arrayData.raca, 
        	idade: arrayData.idade, 
        	status: arrayData.status, 
        	cicloProdutivo: arrayData.cicloProdutivo,
            lactacao: arrayData.lactacao,
            vacinas: arrayData.vacinas,
            alimentacao: arrayData.alimentacao
        };        // Get a Postgres client from the connection pool
        pg.connect(config, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                //return res.status(500).json({success: false, data: err});
            }
            // SQL Query > Update Data
            client.query('UPDATE gado SET brinco=($1), nome=($2), raca=($3), idade=($4), status=($5), cicloProdutivo=($6), lactacao=($7), vacinas=($8), alimentacao=($9) WHERE id=($10)',
            [data.brinco, data.nome, data.raca, data.idade, data.status, data.cicloProduivo, data.lactacao, data.vacinas, data.alimentacao, data.id]);
            // SQL Query > Select Data
            var query = client.query("SELECT * FROM gado ORDER BY id ASC");
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
            client.query('DELETE FROM gado WHERE id=($1)', [arrayData.id]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM gado ORDER BY id ASC');
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