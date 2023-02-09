import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pk;

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default connection;