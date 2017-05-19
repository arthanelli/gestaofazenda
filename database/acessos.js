module.exports = {
    config : {
        user: 'postgres', //env var: PGUSER 
        database: 'gestaofazenda', //env var: PGDATABASE 
        password: 'bitnami', //env var: PGPASSWORD 
        host: '10.7.65.92', // Server hosting the postgres database 
        port: 5432, //env var: PGPORT 
        max: 10, // max number of clients in the pool 
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 
    }
};