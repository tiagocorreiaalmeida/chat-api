import path from 'path';
import { createConnection, Connection } from 'typeorm';

const createDbConnection = async (): Promise<Connection> => {
  try {
    const entitiesLocation = path.resolve(process.cwd(), 'src/modules/**/models/*.ts');

    return await createConnection({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [entitiesLocation],
      synchronize: true,
    });
  } catch (e) {
    console.log(`Unable to connect with the database, e: ${e.message}`);
  }
};

export default createDbConnection;
