import * as express from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import * as helmet from 'helmet';
// import helmet = require('helmet');

@Middleware({ type: "before" })
export class SecurityHstsMiddleware implements ExpressMiddlewareInterface {
  public use(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): any {
    return helmet.hsts({
      maxAge: 31536000,
      includeSubdomains: true
    })(req, res, next);
  }
}
