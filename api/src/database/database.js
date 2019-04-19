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

if (!process.env.NODE_ENV) {
  DATABASE_URL = 'postgres://ysfjltsj:nOu1tZuIJf0D5K6oehu26V44fYTZmEqu@isilo.db.elephantsql.com:5432/ysfjltsj';
}


const pool = new Pool({
  connectionString: DATABASE_URL,
});

pool.on('connect', () => {
});

export default pool;
