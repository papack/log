import { describe, it, expect, mock, beforeEach } from "bun:test";
import { BrowserLogger } from "./browser-logger";

// helper to capture calls
function mockConsole() {
  return {
    log: mock((..._args: any[]) => {}),
    warn: mock((..._args: any[]) => {}),
    error: mock((..._args: any[]) => {}),
  };
}

describe("BrowserLogger", () => {
  let logger: BrowserLogger;
  let c: ReturnType<typeof mockConsole>;

  beforeEach(() => {
    c = mockConsole();
    global.console.log = c.log;
    global.console.warn = c.warn;
    global.console.error = c.error;
    logger = new BrowserLogger({ loglevel: "trace" });
  });

  it("prints formatted info messages via console.log", async () => {
    await logger.info("main.ts", "server started");

    expect(c.log).toHaveBeenCalledTimes(1);
    const [formatString] = c.log.mock.calls[0];

    expect(formatString).toContain("[INFO]");
    expect(formatString).toContain("main.ts");
    expect(formatString).toContain("server started");
  });

  it("prints warnings via console.warn", async () => {
    await logger.warn("api.ts", "latency high");

    expect(c.warn).toHaveBeenCalledTimes(1);
    const [formatString] = c.warn.mock.calls[0];

    expect(formatString).toContain("[WARN]");
    expect(formatString).toContain("api.ts");
    expect(formatString).toContain("latency high");
  });

  it("prints errors via console.error", async () => {
    await logger.err("db.ts", "connection lost");

    expect(c.error).toHaveBeenCalledTimes(1);
    const [formatString] = c.error.mock.calls[0];

    expect(formatString).toContain("[ERR]");
    expect(formatString).toContain("db.ts");
    expect(formatString).toContain("connection lost");
  });

  it("filters messages below loglevel: info should ignore trace", async () => {
    logger = new BrowserLogger({ loglevel: "info" });

    await logger.trace("x.ts", "not visible");

    expect(c.log).toHaveBeenCalledTimes(0);
    expect(c.warn).toHaveBeenCalledTimes(0);
    expect(c.error).toHaveBeenCalledTimes(0);
  });

  it("filters messages below loglevel: warn should ignore trace and info", async () => {
    logger = new BrowserLogger({ loglevel: "warn" });

    await logger.trace("x.ts", "no");
    await logger.info("x.ts", "no");

    expect(c.log).toHaveBeenCalledTimes(0);
    expect(c.warn).toHaveBeenCalledTimes(0);
    expect(c.error).toHaveBeenCalledTimes(0);
  });

  it("filters messages below loglevel: err should accept only err", async () => {
    logger = new BrowserLogger({ loglevel: "err" });

    await logger.warn("a.ts", "ignore");
    await logger.info("a.ts", "ignore");
    await logger.err("a.ts", "only visible");

    expect(c.log).toHaveBeenCalledTimes(0);
    expect(c.warn).toHaveBeenCalledTimes(0);
    expect(c.error).toHaveBeenCalledTimes(1);
  });
});
