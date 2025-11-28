/**
 * Supported log levels in ascending severity.
 * The configured minimum level controls which messages are emitted.
 */
export type LogLevelType = "trace" | "info" | "warn" | "err";

/**
 * Shared logger interface for all adapter implementations
 * (Console, File, Remote, Cluster, ...).
 *
 * All methods are asynchronous to support I/O operations such as
 * writing to files, terminals, or remote endpoints.
 */
export interface LogPortInterface {
  /** The active minimum log level, inherited from LoggerOptions. */
  readonly loglevel: LogLevelType;

  /**
   * Lowest level of logging, intended for detailed debugging.
   */
  trace(source: string, message: string): Promise<void>;

  /**
   * Standard informational messages, e.g. server startup logs.
   */
  info(source: string, message: string): Promise<void>;

  /**
   * Warnings indicating unusual or potentially problematic behavior.
   */
  warn(source: string, message: string): Promise<void>;

  /**
   * Errors that require attention or break functionality.
   */
  err(source: string, message: string): Promise<void>;
}
