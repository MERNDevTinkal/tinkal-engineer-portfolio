
import fs from 'fs';
import path from 'path';

/**
 * serverLog - A utility to write logs to a file in the project directory.
 * This is primarily for debugging internal AI errors in the Firebase Studio environment.
 * The logs will be saved to src/ai/server-logs.txt.
 */
export function serverLog(context: string, data: any) {
  // Ensure the directory exists or just use a path that is known to be writable
  const logFilePath = path.join(process.cwd(), 'src/ai/server-logs.txt');
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${context}]\n${JSON.stringify(data, null, 2)}\n${'-'.repeat(50)}\n`;

  try {
    // Append the log entry to the file. Creates the file if it doesn't exist.
    fs.appendFileSync(logFilePath, logEntry, 'utf8');
    console.log(`[ServerLog] Recorded to ${logFilePath}: ${context}`);
  } catch (error) {
    console.error(`[ServerLog] Failed to write log:`, error);
  }
}
