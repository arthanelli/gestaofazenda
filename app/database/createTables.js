const acessos = require('./acessos.js')
const pg = require('pg');

const dropTables = 'drop table terreno; drop table financas; drop table analiseLeite; drop table usuarios; drop table insumos; drop table vacinacao; drop table gado'


const createTables = 'CREATE TABLE transacoes(id SERIAL PRIMARY KEY, valor decimal, tipo VARCHAR(10), descricao VARCHAR(100), data VARCHAR(25));' +
					                     'CREATE TABLE ordenha(id SERIAL PRIMARY KEY, brinco integer REFERENCES gado (brinco), litrosLeite decimal, data VARCHAR(10));' ;
const client = new pg.Client(acessos.config);

client.connect();

const query = client.query(createTables);

query.on('end', () => { client.end(); });

//  Comando para colocar as datas no formato Dia, Mês e Ano no PostGreSQL.
//  ALTER DATABASE gestaofazenda set dateStyle TO ISO, DMY;
