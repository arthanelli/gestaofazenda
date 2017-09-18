const acessos = require('./acessos.js')
const pg = require('pg');

const dropTables = 'drop table terreno; drop table financas; drop table analiseLeite; drop table usuarios; drop table insumos; drop table vacinacao; drop table gado'


const createTables = 'CREATE TABLE terreno(id SERIAL PRIMARY KEY, latidude decimal, longitude decimal, nome VARCHAR(200), area decimal, perimetro decimal, tipo VARCHAR(100));' +  
                     'CREATE TABLE financas(codLancamento SERIAL PRIMARY KEY, valor real, dataVencimento VARCHAR(10), tipo VARCHAR(200), descricao VARCHAR(300), categoria VARCHAR(100), parcelamento VARCHAR(100), quantParcelas integer);' +  
                     'CREATE TABLE analiseLeite(id SERIAL PRIMARY KEY, nome VARCHAR(100), dataTeste VARCHAR(10), responsavel VARCHAR(50), loteAmostra VARCHAR(200), especificacao VARCHAR(200), resultado VARCHAR(200));' +  
                     'CREATE TABLE insumos(id SERIAL PRIMARY KEY, nome VARCHAR(100), preco decimal, fornecedor VARCHAR(100), descricao VARCHAR(200), quantidade integer, dataDeValidade VARCHAR(10));' +
                     'CREATE TABLE vacinacao(id SERIAL PRIMARY KEY, descricao VARCHAR(100), diaCarencia VARCHAR(100),  unidMedida VARCHAR(200), modoDeUso VARCHAR(200));' +
                     'CREATE TABLE usuarios(codUsuario SERIAL PRIMARY KEY, nome VARCHAR(200), idade int, sexo VARCHAR(100), dataNascimento VARCHAR(10), endereco  VARCHAR(200), usuario VARCHAR(200), senha VARCHAR(200), nivelPermissao VARCHAR(20));' +
                     'CREATE TABLE gado(brinco SERIAL PRIMARY KEY, nome VARCHAR(200), raca VARCHAR(100), idade int, sexo VARCHAR(100), dataNascimento VARCHAR(10), vacinas VARCHAR(200), peso real,  pai VARCHAR(200), mae VARCHAR(200), loteanimal VARCHAR(120), status VARCHAR(100), observacoes VARCHAR(500));';                   
const client = new pg.Client(acessos.config);

client.connect();

const query = client.query(createTables);

query.on('end', () => { client.end(); });

//  Comando para colocar as datas no formato Dia, Mês e Ano no PostGreSQL.
//  ALTER DATABASE gestaofazenda set dateStyle TO ISO, DMY;