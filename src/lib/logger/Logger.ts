import * as path from "path";
import * as winston from "winston";

/**
 * core.Log
 * ------------------------------------------------
 *
 * This is the main Logger Object. You can create a scope logger
 * or directly use the static log methods.
 *
 * By Default it uses the debug-adapter, but you are able to change
 * this in the start up process in the core/index.ts file.
 */

export class Logger {
  public static DEFAULT_SCOPE = "app";

  private static parsePathToScope(filepath: string): string {
    let truePath = filepath;
    if (truePath.indexOf(path.sep) >= 0) {
      truePath = truePath.replace(process.cwd(), "");
      truePath = truePath.replace(`${path.sep}src${path.sep}`, "");
      truePath = truePath.replace(`${path.sep}dist${path.sep}`, "");
      truePath = truePath.replace(".ts", "");
      truePath = truePath.replace(".js", "");
      truePath = truePath.replace(path.sep, ":");
    }
    return truePath;
  }

  private scope: string;

  constructor(scope?: string) {
    this.scope = Logger.parsePathToScope(scope ? scope : Logger.DEFAULT_SCOPE);
  }

  public debug(message: string, ...args: any[]): void {
    this.log("debug", message, args);
  }

  public info(message: string, ...args: any[]): void {
    this.log("info", message, args);
  }

  public warn(message: string, ...args: any[]): void {
    this.log("warn", message, args);
  }

  public error(message: string, ...args: any[]): void {
    this.log("error", message, args);
  }

  private log(level: string, message: string, args: any[]): void {
    if (winston) {
      winston[level](`${this.formatScope()} ${message}`, args);
    }
  }

  private formatScope(): string {
    return `[${this.scope}]`;
  }
}
