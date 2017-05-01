const pg = require('pg');

const config = {
  user: 'postgres', //env var: PGUSER 
  database: 'gestaofazenda', //env var: PGDATABASE 
  password: '020205', //env var: PGPASSWORD 
  host: 'localhost', // Server hosting the postgres database 
  port: 5432, //env var: PGPORT 
  max: 10, // max number of clients in the pool 
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
};

const client = new pg.Client(config);
client.connect();
const query = client.query(
  'CREATE TABLE terreno(id SERIAL PRIMARY KEY, latidude decimal, longitude decimal, nome VARCHAR(200), area decimal, perimetro decimal, tipo VARCHAR(100))');
query.on('end', () => { client.end(); });