var pg = require('pg');
var path = require('path');
const acessos = require('../database/acessos.js')
var config = acessos.config;

module.exports = {
    insert : function(arrayData) {
        var results = [];
        // Grab data from http request
        var data = {
        	valor: arrayData.valor,
        	dataVencimento: arrayData.dataVencimento, 
        	tipo: arrayData.tipo, 
        	descricao: arrayData.descricao,
            categoria: arrayData.categoria,
            parcelamento: arrayData.parcelamento,
            quantParcelas: arrayData.quantParcelas 
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
            client.query('INSERT INTO financas(valor, dataVencimento, tipo, descricao, categoria, parcelamento, quantParcelas) values($1, $2, $3, $4, $5, $6, $7)',
            [data.valor, data.dataVencimento, data.tipo, data.descricao, data.categoria, data.parcelamento, data.quantParcelas]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM financas ORDER BY codlancamento ASC');
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
            var query = client.query('SELECT * FROM financas ORDER BY codlancamento ASC;');
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
    returnChange : function(codlancamento, callback) {
        var results = [];
        data = {
            codlancamento : codlancamento
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
            var query = client.query('SELECT * FROM financas WHERE codlancamento = $1', [data.codlancamento]);
            
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
        var erro = false;
        // Grab data from the URL parameters

        var data = {
            codlancamento: arrayData.codlancamento,
            valor: arrayData.valor,
        	dataVencimento: arrayData.dataVencimento, 
        	tipo: arrayData.tipo, 
        	descricao: arrayData.descricao,
            categoria: arrayData.categoria,
            parcelamento: arrayData.parcelamento,
            quantParcelas: arrayData.quantParcelas
        };
        // Get a Postgres client from the connection pool
        pg.connect(config, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                //return res.status(500).json({success: false, data: err});
            }
            // SQL Query > Update Data
            client.query('UPDATE financas SET valor=($1), dataVencimento=($2), tipo=($3), descricao=($4), categoria=($5), parcelamento=($6), quantParcelamento=($7) WHERE codlancamento=($8)',
            [data.valor, data.dataVencimento, data.tipo, data.descricao, data.categoria, data.parcelamento, data.quantParcelas, data.codLancamento]);
            // SQL Query > Select Data
            var query = client.query("SELECT * FROM financas ORDER BY codlancamento ASC");
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
    del : function(codlancamento) {
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
            client.query('DELETE FROM financas WHERE codlancamento=($1)', [arrayData.codLancamento]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM financas ORDER BY codlancamente ASC');
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