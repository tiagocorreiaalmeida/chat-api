import { createConnection, Connection } from 'typeorm';

// read connection options from ormconfig file (or ENV variables)
const createDatabaseConnection = async (): Promise<Connection> => {
  try {
    return await createConnection();
  } catch (e) {
    console.log(`Unable to connect with the database, e: ${e.message}`);
  }
};

export default createDatabaseConnection;
