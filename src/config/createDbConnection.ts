import path from 'path';
import { createConnection, Connection } from 'typeorm';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const port = DB_PORT ? +DB_PORT : 5432;

const createDbConnection = async (): Promise<Connection> => {
  try {
    const entitiesPath = path.resolve(process.cwd(), 'src/modules/**/models/*{.ts,.js}');

    return await createConnection({
      type: 'postgres',
      host: DB_HOST,
      port,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [entitiesPath],
      synchronize: true,
    });
  } catch (e) {
    throw new Error(`Unable to connect with the database, e: ${e.message}`);
  }
};

export default createDbConnection;
