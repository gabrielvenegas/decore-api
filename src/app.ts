import { bootstrapMicroframework } from "microframework-w3tec";
import "reflect-metadata";

import { banner } from "./lib/banner";
import { Logger } from "./lib/logger";
import { expressLoader } from "./loaders/expressLoader";
import { homeLoader } from "./loaders/homeLoader";
import { iocLoader } from "./loaders/iocLoader";
import { typeormLoader } from "./loaders/typeormLoader";
import { winstonLoader } from "./loaders/winstonLoader";
import { mercadopagoLoader } from "./loaders/mercadopagoLoader";

/**
 * EXPRESS TYPESCRIPT BOILERPLATE
 * ----------------------------------------
 *
 * This is a boilerplate for Node.js Application written in TypeScript.
 * The basic layer of this app is express. For further information visit
 * the 'README.md' file.
 */
const log = new Logger(__filename);

bootstrapMicroframework({
  /**
   * Loader is a place where you can configure all your modules during microframework
   * bootstrap process. All loaders are executed one by one in a sequential order.
   */
  loaders: [winstonLoader, iocLoader, typeormLoader, expressLoader, homeLoader]
})
  .then(() => banner(log))
  .catch(error => log.error(`Application has crashed: ${error}`));
