# @papack/log

A simple async logger with **typed log levels**, **timestamped output**, and a clean **port-and-adapter architecture** for interchangeable implementations.
Built with TypeScript and **0 dependencies**.

## Features

- Structured logging via `trace()`, `info()`, `warn()`, and `err()`
- Configurable log level on instantiation: `"trace" | "info" | "warn" | "err"`
- Messages below the configured level are automatically filtered out
- Zero dependencies — portable, embeddable, and safe for small runtimes
- Implementation-agnostic design: adapters (`CliLogger`, `BrowserLogger`, `NullLogger`, File, Remote, …)
- Implementation can be swapped without code changes

## Examples

### CLI / Terminal

To produce this log:

```
2025-02-14T22:24:03.447Z [INFO] prod-node2(5193): main.ts: server started
```

use this code:

```ts
import { CliLogger } from "@papack/log";

const log = new CliLogger({ loglevel: "info" }); // minimum level is "info"

log.info("main.ts", "server started");
```

### Browser Example

```ts
import { BrowserLogger } from "@papack/log";

const log = new BrowserLogger({ loglevel: "info" });

log.warn("app.ts", "API latency high");
```

The browser prints the same timestamped format, but using CSS instead of ANSI Color and do not include proccess id or hostname.

### Silent Mode

If you want to disable logging without changing your application logic:

```ts
import { NullLogger } from "@papack/log";

const log = new NullLogger();
```

All log calls are discarded with near-zero overhead.

## Roadmap

### v1.1.0 — FileLogger

- Write logs to the filesystem
- Automatic logfile rotation

### v1.2.0 — Remote Log

- Each log entry receives a UUID and is exposed via HTTP
- JSON data structure instead of human-readable format ([{uuid,time,host,pid,msg}])
- Dedicated listening port
- API-key authentication
- A included `RemoteLogCollector` function can be used on a remote host
  - acknowledges collected entries by returning the UUID
- Exposes metrics: number of trace, info, warn, and err entries

### v1.3.0 — Remote Cluster Log

- Same as Remote Log, but compatible with Node.js Cluster mode
- Full multi-adapter compatibility
