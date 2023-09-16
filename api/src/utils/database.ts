import pg from "pg";

import config from "./config";
import createLogger from "../utils/logger";

const { Pool } = pg;

// const pool = new Pool({
//   user: config.db_user,
//   host: config.db_host,
//   database: config.db_database,
//   password: config.db_password,
//   port: 5432,
//   keepAlive: true,
// });
const pool = new pg.Pool({
  connectionString: config.database_connection,
});

pool.connect(function (err) {
  if (err) {
    createLogger.error(`ERROR connecting to Database: ${err}`);
  } else {
    createLogger.info(`Connected to Database`);
  }
});

export default pool;
