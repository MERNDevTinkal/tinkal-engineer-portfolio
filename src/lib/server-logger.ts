
import fs from 'fs';
import path from 'path';

/**
 * serverLog - A utility to write logs to a file in the project directory.
 * Includes logic to clear the file if it hasn't been modified for more than 5 hours.
 */
export function serverLog(context: string, data: any) {
  const logFilePath = path.join(process.cwd(), 'src/ai/server-logs.txt');
  const FIVE_HOURS_MS = 5 * 60 * 60 * 1000;
  const now = new Date();

  try {
    // Auto-clear logic: check if the file exists and its last modification time
    if (fs.existsSync(logFilePath)) {
      const stats = fs.statSync(logFilePath);
      const lastModified = stats.mtime.getTime();
      
      if (now.getTime() - lastModified > FIVE_HOURS_MS) {
        // Clear the file by writing an empty string
        fs.writeFileSync(logFilePath, `[${now.toISOString()}] [System] Log cleared (5-hour interval reached)\n${'-'.repeat(50)}\n`, 'utf8');
      }
    }

    const timestamp = now.toISOString();
    const logEntry = `[${timestamp}] [${context}]\n${JSON.stringify(data, null, 2)}\n${'-'.repeat(50)}\n`;

    // Append the log entry to the file. Creates the file if it doesn't exist.
    fs.appendFileSync(logFilePath, logEntry, 'utf8');
    console.log(`[ServerLog] Recorded to ${logFilePath}: ${context}`);
  } catch (error) {
    console.error(`[ServerLog] Failed to write log:`, error);
  }
}
