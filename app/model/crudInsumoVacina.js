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
        	preco: arrayData.preco, 
        	fornecedor: arrayData.fornecedor, 
        	descricao: arrayData.descricao, 
        	quantidade: arrayData.quantidade, 
            dataDeValidade: arrayData.dataDeValidade,
            indicacao: arrayData.indicacao,
            prescricao: arrayData.prescricao,
            diasDeCarencia: arrayData.diasDeCarencia,
            unidadeMedida: arrayData.unidadeMedida,
            modoDeUso: arrayData.modoDeUso
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
            client.query('INSERT INTO estoquevacinas(nome, preco, fornecedor, descricao, quantidade, dataDeValidade, indicacao, prescricao, diasDeCarencia, unidadeMedida, modoDeUso) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
            [data.nome, data.preco, data.fornecedor, data.descricao, data.quantidade, data.dataDeValidade, data.indicacao, data.prescricao, data.diasDeCarencia, data.unidadeMedida, data.modoDeUso]);

            const valorUnidade = data.preco;
            const quantidade = data.quantidade;
            let valorTotal = valorUnidade * quantidade;
            valorTotal = valorTotal.toFixed(2);

            let dateString = "";
            let dataLancamento = new Date();
            //Vamos pegar dia, mê e ano.
            dateString += dataLancamento.getDate() + "/";
            dateString += (dataLancamento.getMonth() + 1) + "/";
            dateString += dataLancamento.getFullYear();

            client.query('INSERT INTO transacoes(valor, tipo, descricao, data) values($1, $2, $3, $4)',
            [valorTotal, 'DESPESAS', 'Compra de Vacina - ' + data.nome, dateString])

            // SQL Query > Select Data
            var query = client.query('SELECT * FROM estoquevacinas ORDER BY id ASC');
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
            var query = client.query('SELECT * FROM estoquevacinas ORDER BY id ASC;');
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
        data = {
            id : id
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
            var query = client.query('SELECT * FROM estoquevacinas WHERE id = $1', [data.id]);
            
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
        // Grab data from http request
        var data = {
            id: arrayData.id,
        	nome: arrayData.nome, 
        	preco: arrayData.preco, 
        	fornecedor: arrayData.fornecedor, 
        	descricao: arrayData.descricao, 
        	quantidade: arrayData.quantidade, 
            dataDeValidade: arrayData.dataDeValidade,
            indicacao: arrayData.indicacao,
            prescricao: arrayData.prescricao,
            diasDeCarencia: arrayData.diasDeCarencia,
            unidadeMedida: arrayData.unidadeMedida,
            modoDeUso: arrayData.modoDeUso
        };        
        pg.connect(config, (err, client, done) => {
            // Handle connection errors
            if(err) {
                done();
                console.log(err);

                if(callback != null) {
                    callback(erro);
                }
                //return res.status(500).json({success: false, data: err});
            }
            // SQL Query > Update Data
            client.query('UPDATE estoquevacinas SET nome=($1), preco=($2), fornecedor=($3), descricao=($4), quantidade=($5), dataDeValidade=($6), indicacao=($7), prescricao=($8), diasDeCarencia=($9), unidadeMedida=($10), modoDeUso=($11) WHERE id=($12)',
            [data.nome, data.preco, data.fornecedor, data.descricao, data.quantidade, data.dataDeValidade, data.indicacao, data.prescricao, data.diasDeCarencia, data.unidadeMedida, data.modoDeUso, data.id]);
            // SQL Query > Select Data
            var query = client.query("SELECT * FROM estoquevacinas ORDER BY id ASC");
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
    del : function(id) {
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
            client.query('DELETE FROM estoquevacinas WHERE id=($1)', [id]);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM estoquevacinas ORDER BY id ASC');
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