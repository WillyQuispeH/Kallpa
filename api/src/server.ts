import app from "./app";

import config from "./utils/config";
import createLogger from "./utils/logger";

app.listen(config.apiPort || 4603);
createLogger.info(`API listening port ${config.apiPort}`);
