import winston from 'winston';

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal: 'red',
    error: 'yellow',
    warning: 'blue',
    info: 'green',
    http: 'magenta',
    debug: 'white'
  }
};

winston.addColors(customLevels.colors);

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

const devLogger = winston.createLogger({
  levels: customLevels.levels,
  format: logFormat,
  transports: [
    new winston.transports.Console({
      level: 'debug'
    })
  ]
});

const prodLogger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: logFormat
    }),
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error',
      format: logFormat
    })
  ]
});


export const logger =
  process.env.NODE_ENV === 'production'
    ? prodLogger
    : devLogger;
