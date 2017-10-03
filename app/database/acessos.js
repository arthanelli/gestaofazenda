module.exports = {		
    config : {		
        user: 'postgres', //env var: PGUSER 		
        database: 'gestaofazenda', //env var: PGDATABASE 		
<<<<<<< HEAD
        password: '1mudar123', //env var: PGPASSWORD 		
=======
        password: 'araujo123',
>>>>>>> 9e247be676663861433609ff0268203738ab770f
        host: 'localhost', // Server hosting the postgres database 		
        port: 5432, //env var: PGPORT 		
        max: 10, // max number of clients in the pool 		
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed 		
    }		
}; 
