import * as express from "express";
import { Service } from "typedi";
import { Logger, LoggerInterface } from "../decorators/Logger";
import { TokenInfoInterface } from "./TokenInfoInterface";
import * as jwt from "jsonwebtoken";
import { env } from "../env";

@Service()
export class AuthService {
  constructor(@Logger(__filename) private log: LoggerInterface) {}
  public parseTokenFromRequest(req: express.Request): string | undefined {
    const authorization = req.header("authorization");

    // Retrieve the token form the Authorization header
    if (authorization && authorization.split(" ")[0] === "Bearer") {
      this.log.info("Token provided by the client");
      return authorization.split(" ")[1];
    }

    this.log.info("No Token provided by the client");
    return undefined;
  }

  public getTokenInfo(token: string): TokenInfoInterface {
    return <TokenInfoInterface>jwt.verify(token, env.auth.secret);
  }
}
