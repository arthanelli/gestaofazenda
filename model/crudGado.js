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
        	idade: arrayData.idade, 
        	raca: arrayData.raca,
            sexo: arrayData.sexo,
            peso: arrayData.peso,
            dataNascimento: arrayData.dataNascimento,
            vacinas: arrayData.vacinas,
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
            client.query('INSERT INTO gado(brinco, nome, raca, idade, sexo, dataNascimento, vacinas, peso, pai, mae, loteanimal, status, observacoes) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
            [data.brinco, data.nome, data.raca, data.idade, data.sexo, data.dataNascimento, data.vacinas, data.peso, data.pai, data.mae, data.loteanimal, data.status, data.observacoes ]);
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
    change : function(brinco_change) {
        var results = [];

        // Grab data from the URL parameters
        var brinco = brinco_change;
        var erro = false;

        // Grab data from the URL parameters
        var data = {
            nome: arrayData.nome,
        	idade: arrayData.idade, 
        	raca: arrayData.raca,
            sexo: arrayData.sexo,
            peso: arrayData.peso,
            dataNascimento: arrayData.dataNascimento,
            vacinas: arrayData.vacinas,
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
            client.query('UPDATE gado SET nome=($1), raca=($2), idade=($3), sexo=($4), datanascimento=($5), vacinas=($6), peso=($7), pai=($8), mae=($9), loteanimal=($10), status=($11), observacoes=($12) WHERE brinco=($13)',
            [data.nome, data.idade, data.raca, data.sexo, data.peso, data.dataNascimento, data.vacinas, data.paiGado, data.maeGado, data.loteAnimal, data.status, data.observacoes, data.brinco]);
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
            client.query('DELETE FROM gado WHERE brinco=($1)', [arrayData.id]);
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
    }
}