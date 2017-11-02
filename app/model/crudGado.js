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
            sexo: arrayData.sexo,
            peso: arrayData.peso,
            dataNascimento: arrayData.dataNascimento,
            pai: arrayData.paiGado,
            mae: arrayData.maeGado,
            loteanimal: arrayData.loteAnimal,
        	status: arrayData.status, 
            observacoes: arrayData.observacoes
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
            client.query('INSERT INTO gado(brinco, nome, raca, sexo, dataNascimento, peso, pai, mae, loteanimal, status, observacoes) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
            [data.brinco, data.nome, data.raca, data.sexo, data.dataNascimento, data.peso, data.pai, data.mae, data.loteanimal, data.status, data.observacoes ]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM gado ORDER BY brinco ASC');
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
            var query = client.query('SELECT * FROM gado ORDER BY brinco ASC;');
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
    returnChange : function(brinco, callback) {
        var results = [];
        data = {
            brinco : brinco
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
            var query = client.query('SELECT * FROM gado WHERE brinco = $1', [data.brinco]);
            
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

        // Grab data from the URL parameters
        var brinco = arrayData.brinco;
        console.log(brinco);
        var erro = false;

        // Grab data from the URL parameters
        var data = {
            nome: arrayData.nome,
        	raca: arrayData.raca,
            sexo: arrayData.sexo,
            peso: arrayData.peso,
            dataNascimento: arrayData.dataNascimento,
            pai: arrayData.paiGado,
            mae: arrayData.maeGado,     
            loteanimal: arrayData.loteAnimal,
        	status: arrayData.status, 
            observacoes: arrayData.observacoes
        };
        // Get a Postgres client from the connection pool
        pg.connect(config, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                //return res.status(500).json({success: false, data: err});
                if(callback != null) {
                    callback(erro);
                }
            }
            // SQL Query > Update Data
            client.query('UPDATE gado SET nome=($1), raca=($2), sexo=($3), datanascimento=($4), peso=($5), pai=($6), mae=($7), loteanimal=($8), status=($9), observacoes=($10) WHERE brinco=($11)',
            [data.nome, data.raca, data.sexo, data.dataNascimento, data.peso, data.pai, data.mae, data.loteanimal, data.status, data.observacoes, brinco]);
            // SQL Query > Select Data
            var query = client.query("SELECT * FROM gado ORDER BY brinco ASC");
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
    del : function(brinco) {
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
            client.query('DELETE FROM gado WHERE brinco=($1)', [brinco]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM gado ORDER BY brinco ASC');
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
    },
}