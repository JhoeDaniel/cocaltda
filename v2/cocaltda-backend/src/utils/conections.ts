import dotenv from 'dotenv';
import path from 'path';
import { Client } from 'pg';

dotenv.config({
	path: path.join(path.resolve('./env'), process.env.NODE_ENV + '.env'),
});

const clientCOCALTDAPostgreSQL = new Client({
	user: process.env.BD_PG_USER,
	host: process.env.BD_PG_HOST,
	database: process.env.BD_PG_DATABASE,
	password: process.env.BD_PG_PASSWORD,
	port: parseInt(`${process.env.BD_PG_PORT}`),
});

// clientCOCALTDAPostgreSQL.connect();

export { clientCOCALTDAPostgreSQL };
