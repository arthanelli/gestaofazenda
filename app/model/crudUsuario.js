var pg = require('pg');
var path = require('path');
const acessos = require('../database/acessos.js')
var config = acessos.config;

module.exports = {
    insert : function(arrayData) {
        var results = [];
        // Grab data from http request
        var data = {
        	idusuario: arrayData.idusuario,
            nome: arrayData.nome,
        	idade: arrayData.idade, 
            sexo: arrayData.sexo,
            dataNascimento: arrayData.dataNascimento,
            endereco: arrayData.endereco, 
            usuario: arrayData.usuario,
            senha: arrayData.senha,
            nivelPermissao: arrayData.nivelPermissao
        };
        pg.connect(config, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                //return res.status(500).json({success: false, data: err});
            }
            // SQL Query > Insert Data
            client.query('INSERT INTO usuarios(nome, idade, sexo, dataNascimento, endereco, usuario, senha, nivelPermissao) values($1, $2, $3, $4, $5, $6, $7, $8)',
            [data.nome, data.idade, data.sexo, data.dataNascimento, data.endereco, data.usuario, data.senha, data.nivelPermissao]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM usuarios ORDER BY id ASC');
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
            var query = client.query('SELECT * FROM usuarios;');
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
        // Get a Postgres client from the connecti
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
    returnChange : function(idusuario, callback) {
        var results = [];
        data = {
            idusuario : idusuario
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
            var query = client.query('SELECT * FROM usuarios WHERE id = $1', [data.idusuario]);
            
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
        var idusuario = arrayData.idusuario;
        var erro = false;

        // Grab data from the URL parameters
        var data = {
        	idusuario: arrayData.usuario,
            nome: arrayData.nome,
        	idade: arrayData.idade,
            sexo: arrayData.sexo,
            dataNascimento: arrayData.dataNascimento,
            endereco: arrayData.endereco,
            usuario: arrayData.usuario,
            senha: arrayData.senha, 
            nivelPermissao: arrayData.nivelPermissao
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
            client.query('UPDATE usuarios SET nome=($1), idade=($2), sexo=($3), datanascimento=($4), endereco=($5), usuario=($6), senha=($7), nivelPermissao=($8) WHERE id=($9)',
            [data.nome, data.idade, data.sexo, data.dataNascimento, data.endereco, data.usuario, data.senha, data.nivelPermissao, idusuario]);
            // SQL Query > Select Data
            var query = client.query("SELECT * FROM usuarios ORDER BY id ASC");
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
    del : function(idusuario) {
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
            client.query('DELETE FROM usuarios WHERE id=($1)', [idusuario]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM usuarios ORDER BY id ASC');
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
    validate: (dados, callback) => {
        // Get a Postgres client from the connection pool
        pg.connect(config, (err, client, done) => {
            const results = [];
            // Handle connection errors
            if(err) {
                done();
                console.log(err);
                //return res.status(500).json({success: false, data: err});
            }
            
            const query = client.query('SELECT * FROM "usuarios" WHERE "usuario" = $1', [dados.usuario]);        
            query.on('row', (row) => {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                let senha = '';
                
                console.log(results[0])
                
                if(results.length > 0) {
                    senha = results[0]['senha'];
                }
                //console.log(results);
                if(callback != null) {
                    if (senha === dados.senha) {
                        callback({id: results[0]['id'], password: results[0]['senha'], name: results[0]['nome'], nivel: results[0]['nivelpermissao'] });
                    } else {
                        callback(false);
                    }
                }
            });
        });
    }
}