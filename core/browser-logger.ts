import { LogLevelType, LogPortInterface } from "./types";

export interface BrowserLoggerOptionsInterface {
  loglevel: LogLevelType;
}

const resolvedPromise = Promise.resolve();

export class BrowserLogger implements LogPortInterface {
  public readonly loglevel: LogLevelType;

  constructor(args: BrowserLoggerOptionsInterface) {
    this.loglevel = args.loglevel;
  }

  private write(
    level: LogLevelType,
    source: string,
    message: string,
    css: string
  ): void {
    if (
      (this.loglevel === "info" && level === "trace") ||
      (this.loglevel === "warn" && (level === "trace" || level === "info")) ||
      (this.loglevel === "err" && level !== "err")
    )
      return;

    const ts = new Date().toISOString();
    const formatted = `${ts} [${level.toUpperCase()}] ${source}: ${message}`;

    if (level === "warn") console.warn(`%c${formatted}`, css);
    else if (level === "err") console.error(`%c${formatted}`, css);
    else console.log(`%c${formatted}`, css);
  }

  trace(s: string, m: string) {
    this.write("trace", s, m, "color: gray;");
    return resolvedPromise;
  }
  info(s: string, m: string) {
    this.write("info", s, m, "color: black;");
    return resolvedPromise;
  }
  warn(s: string, m: string) {
    this.write("warn", s, m, "color: red;");
    return resolvedPromise;
  }
  err(s: string, m: string) {
    this.write("err", s, m, "color: red;");
    return resolvedPromise;
  }
}
