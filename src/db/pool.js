require('dotenv').config();
const { Pool } = require('pg');

module.exports = new Pool({
    connectionString: process.env.DATABASE_URL
});

/* Too load .env variables in shell session and run schema.sql, creating the db structure

export $(cat .env| xargs)
psql $DATABASE_URL -f src/db/schema.sql

*/
