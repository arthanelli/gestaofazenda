const acessos = require('./acessos.js')
const pg = require('pg');

const dropTables = 'drop table terreno; drop table financas; drop table analiseLeite; drop table usuarios; drop table insumos; drop table vacinacao; drop table gado; drop table ordenha; drop table comprador; drop table transacoes; drop table pedido'


const createTables = 'CREATE TABLE terreno(id SERIAL PRIMARY KEY, latidude decimal, longitude decimal, nome VARCHAR(200), area decimal, perimetro decimal, tipo VARCHAR(100));' +  
                     'CREATE TABLE financas(codLancamento SERIAL PRIMARY KEY, valor real, dataVencimento VARCHAR(10), tipo VARCHAR(200), descricao VARCHAR(300), categoria VARCHAR(100), parcelamento VARCHAR(100), quantParcelas integer);' +  
                     'CREATE TABLE analiseLeite(id SERIAL PRIMARY KEY, nome VARCHAR(100), dataTeste VARCHAR(10), responsavel VARCHAR(50), loteAmostra VARCHAR(200), especificacao VARCHAR(200), resultado VARCHAR(200));' +  
                     'CREATE TABLE insumos(id SERIAL PRIMARY KEY, nome VARCHAR(100), preco decimal, fornecedor VARCHAR(100), descricao VARCHAR(200), quantidade integer, dataDeValidade VARCHAR(10));' +
                     'CREATE TABLE estoqueVacinas(id SERIAL PRIMARY KEY, nome VARCHAR(100), preco decimal, fornecedor VARCHAR(100), descricao VARCHAR(200), quantidade integer, dataDeValidade VARCHAR(10), indicacao VARCHAR(200), prescricao VARCHAR(200), diasDeCarencia integer, unidadeMedida VARCHAR(200), modoDeUso VARCHAR(200));' +
                     'CREATE TABLE vacinacao(id SERIAL PRIMARY KEY, descricao VARCHAR(100), diaCarencia VARCHAR(100),  unidMedida VARCHAR(200), modoDeUso VARCHAR(200));' +
                     'CREATE TABLE usuarios(id SERIAL PRIMARY KEY, nome VARCHAR(200), idade int, sexo VARCHAR(100), dataNascimento VARCHAR(10), endereco  VARCHAR(200), usuario VARCHAR(200), senha VARCHAR(200), nivelPermissao VARCHAR(20));' +
                     'CREATE TABLE gado(brinco SERIAL PRIMARY KEY, nome VARCHAR(200), raca VARCHAR(100), idade int, sexo VARCHAR(100), dataNascimento VARCHAR(10), vacinas VARCHAR(200), peso real,  pai VARCHAR(200), mae VARCHAR(200), loteanimal VARCHAR(120), status VARCHAR(100), observacoes VARCHAR(500), dataciclo VARCHAR(20));' +
                     'CREATE TABLE ordenha(id SERIAL PRIMARY KEY, brinco integer REFERENCES gado (brinco), litrosLeite decimal, data VARCHAR(10));' + 
                     'CREATE TABLE comprador(id SERIAL PRIMARY KEY, razaoSocial VARCHAR(100), nomeFantasia VARCHAR(100), tipo VARCHAR(25), cadastroNacional VARCHAR(25), endereco VARCHAR(100), responsavelLegal VARCHAR(100), telefone VARCHAR(20), email VARCHAR(100));' +
                     'CREATE TABLE pedido(id SERIAL PRIMARY KEY, codigoComprador integer REFERENCES comprador (id), quantidadeLitros decimal, data VARCHAR(10), valor decimal, dataVencimento VARCHAR(10), descricao VARCHAR(200), parcelamento boolean, quantParcelamento integer);' +
                     'CREATE TABLE transacoes(id SERIAL PRIMARY KEY, valor decimal, tipo VARCHAR(10), descricao VARCHAR(100), data VARCHAR(25));' +
                     'CREATE TABLE vacinasrealizadas(id SERIAL PRIMARY KEY, codGado integer REFERENCES gado (brinco), codVacina integer REFERENCES estoqueVacinas (id), nomeGado VARCHAR(200), nomeVacina VARCHAR(200), dataDeVacina VARCHAR(10), nomeresponsavel VARCHAR(200), observacoes VARCHAR(400));' +
                     'CREATE TABLE alimentacao(id SERIAL PRIMARY KEY, codGado integer REFERENCES gado (brinco), codAlimento integer REFERENCES insumos (id), codSuplemento integer REFERENCES insumos (id), nomeGado VARCHAR(200), nomeAlimento VARCHAR(200), quantidadeAlimento VARCHAR(200), nomeSuplemento VARCHAR(200), quantidadeSuplemento VARCHAR(200));';

const client = new pg.Client(acessos.config);

client.connect();

const query = client.query(createTables);

query.on('end', () => { client.end(); });

//  Comando para colocar as datas no formato Dia, Mês e Ano no PostGreSQL.
//  ALTER DATABASE gestaofazenda set dateStyle TO ISO, DMY;