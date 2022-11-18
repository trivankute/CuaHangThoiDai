import { Pool } from "pg";
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    user :'postgres',
    password : 'postgres',
    host : 'localhost',
    port : 5432,
    database : 'hangdiathoidai'
});

export default pool;