var pg = require('pg');
var path = require('path');
const acessos = require('../database/acessos.js')
var config = acessos.config;

module.exports = {
    insert : function(arrayData) {
        var results = [];
        // Grab data from http request
        var data = {
        	nome: arrayData.nome, 
        	dataTeste: arrayData.dataTeste, 
        	responsavel: arrayData.responsavel, 
        	loteAmostra: arrayData.loteAmostra, 
        	especificacao: arrayData.especificacao, 
        	resultado: arrayData.resultado
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
            client.query('INSERT INTO analiseLeite(nome, dataTeste, responsavel, loteAmostra, especificacao, resultado) values($1, $2, $3, $4, $5, $6)',
            [data.nome, data.dataTeste, data.responsavel, data.loteAmostra, data.especificacao, data.resultado]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM analiseLeite ORDER BY id ASC');
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
            var query = client.query('SELECT * FROM analiseLeite ORDER BY id ASC;');
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
            var query = client.query('SELECT * FROM analiseLeite WHERE id = "$1"', [id]);
            
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
            id : arrayData.id,
            nome: arrayData.nome, 
            dataTeste: arrayData.dataTeste, 
            responsavel: arrayData.responsavel, 
            loteAmostra: arrayData.loteAmostra, 
            especificacao: arrayData.especificacao, 
            resultado: arrayData.resultado
        };        // Get a Postgres client from the connection pool
        pg.connect(config, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                //return res.status(500).json({success: false, data: err});
            }
            // SQL Query > Update Data
            client.query('UPDATE analiseLeite SET nome=($1), dataTeste=($2), responsavel=($3), loteAmostra=($4), especificacao=($5), resultado=($6) WHERE id=($7)',
            [data.nome, data.dataTeste, data.responsavel, data.loteAmostra, data.especificacao, data.resultado, data.id]);
            // SQL Query > Select Data
            var query = client.query("SELECT * FROM analiseLeite ORDER BY id ASC");
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
            client.query('DELETE FROM analiseLeite WHERE id=($1)', [arrayData.id]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM analiseLeite ORDER BY id ASC');
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