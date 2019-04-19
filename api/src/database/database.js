/* eslint-disable no-console */
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let DATABASE_URL;

if (process.env.NODE_ENV === 'DEV') {
  DATABASE_URL = process.env.DEVPG;
} else if (process.env.NODE_ENV === 'PROD') {
  DATABASE_URL = process.env.MAINPG;
} else {
  DATABASE_URL = process.env.TESTPG;
}

console.log(`connected to the db: ${DATABASE_URL} , ${process.env.NODE_ENV}`);

const pool = new Pool({
  connectionString: DATABASE_URL,
});

pool.on('connect', () => {
  console.log(`connected to the db: ${DATABASE_URL} , ${process.env.NODE_ENV}`);
});

export default pool;
