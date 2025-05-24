// Frontend logger implementation

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
}

class Logger {
  private readonly MAX_LOG_SIZE = 100;
  private logs: LogEntry[] = [];
  private initialized = false;

  init() {
    if (this.initialized) return;
    this.initialized = true;
    
    // Clear logs on init to prevent memory issues
    this.logs = [];
    
    // Log uncaught errors
    window.addEventListener('error', (event) => {
      this.error('Uncaught error', { 
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
    });

    // Log unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.error('Unhandled promise rejection', { 
        reason: event.reason 
      });
    });
    
    this.info('Logger initialized');
  }

  private addLog(level: LogLevel, message: string, data?: any) {
    const logEntry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString()
    };
    
    // Add to internal log array
    this.logs.unshift(logEntry);
    
    // Trim logs if they exceed max size
    if (this.logs.length > this.MAX_LOG_SIZE) {
      this.logs = this.logs.slice(0, this.MAX_LOG_SIZE);
    }
    
    // Log to console for debugging
    this.writeToConsole(logEntry);
    
    // In production, you might want to send critical logs to the server
    if (level === 'error' && import.meta.env.PROD) {
      this.sendToServer(logEntry);
    }
  }
  
  private writeToConsole(logEntry: LogEntry) {
    const { level, message, data, timestamp } = logEntry;
    const formattedMessage = `[${timestamp}] ${message}`;
    
    switch (level) {
      case 'info':
        console.info(formattedMessage, data || '');
        break;
      case 'warn':
        console.warn(formattedMessage, data || '');
        break;
      case 'error':
        console.error(formattedMessage, data || '');
        break;
      case 'debug':
        console.debug(formattedMessage, data || '');
        break;
    }
  }
  
  private async sendToServer(logEntry: LogEntry) {
    try {
      // In a real app, you would send this to your server
      // await fetch('/api/logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(logEntry)
      // });
    } catch (error) {
      // Avoid infinite loops by not logging this error
      console.error('Failed to send log to server', error);
    }
  }

  info(message: string, data?: any) {
    this.addLog('info', message, data);
  }

  warn(message: string, data?: any) {
    this.addLog('warn', message, data);
  }

  error(message: string, data?: any) {
    this.addLog('error', message, data);
  }

  debug(message: string, data?: any) {
    this.addLog('debug', message, data);
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }
}

// Export a singleton instance
export const logger = new Logger();