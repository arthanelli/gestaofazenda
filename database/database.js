const acessos = require('./acessos.js')
const pg = require('pg');

const dropTables = 'drop table terreno; drop table financas; drop table analiseLeite; drop table insumos; drop table vacinacao; drop table gado'


const createTables = 'CREATE TABLE terreno(id SERIAL PRIMARY KEY, latidude decimal, longitude decimal, nome VARCHAR(200), area decimal, perimetro decimal, tipo VARCHAR(100));' +  
                     'CREATE TABLE financas(id SERIAL PRIMARY KEY, valor decimal, tipo VARCHAR(50), descricao VARCHAR(200), dataConta VARCHAR(10));' +  
                     'CREATE TABLE analiseLeite(id SERIAL PRIMARY KEY, nome VARCHAR(100), dataTeste VARCHAR(10), responsavel VARCHAR(50), loteAmostra VARCHAR(200), especificacao VARCHAR(200), resultado VARCHAR(200));' +  
                     'CREATE TABLE insumos(id SERIAL PRIMARY KEY, nome VARCHAR(100), preco decimal, fornecedor VARCHAR(100), descricao VARCHAR(200), quantidade integer, dataDeValidade VARCHAR(10));' +
                     'CREATE TABLE vacinacao(id SERIAL PRIMARY KEY, codGado VARCHAR(100), nomeVacina VARCHAR(100),  descricaoVacina VARCHAR(200), prescricaoVacinacao VARCHAR(200), periodicidade VARCHAR(100), gadosVacinados VARCHAR(200), gadosNaoVacinados VARCHAR(120));' +
                     'CREATE TABLE gado(id SERIAL PRIMARY KEY, brinco int, nome VARCHAR(200), raca VARCHAR(100), idade int, status VARCHAR(200), cicloProdutivo VARCHAR(100), lactacao VARCHAR(200), vacinas VARCHAR(120), alimentacao VARCHAR(120));';
                   
const client = new pg.Client(acessos.config);

client.connect();

const query = client.query(createTables);

query.on('end', () => { client.end(); });