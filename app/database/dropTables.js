const acessos = require('./acessos.js')
const pg = require('pg');

const dropTables = 'DROP SCHEMA gestaofazenda CASCADE; CREATE SCHEMA gestaofazenda;'

const client = new pg.Client(acessos.config);

client.connect();

const query = client.query(dropTables);

query.on('end', () => { client.end(); });

//  Comando para colocar as datas no formato Dia, Mês e Ano no PostGreSQL.
//  ALTER DATABASE gestaofazenda set dateStyle TO ISO, DMY;