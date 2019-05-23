import { Container } from "typedi";

import { Logger as WinstonLogger } from "../lib/logger";

// tslint:disable-next-line:function-name
export function Logger(scope: string): any {
  return (object: any, propertyName: string, index?: number): any => {
    const logger = new WinstonLogger(scope);
    Container.registerHandler({
      object,
      propertyName,
      index,
      value: () => logger
    });
  };
}

export { LoggerInterface } from "../lib/logger";
