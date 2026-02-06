import { logger } from '../logger/logger.js';

export const addLogger = (req, res, next) => {
  req.logger = logger;

  req.logger.debug('Middleware addLogger ejecutado');
  req.logger.http(`${req.method} ${req.url}`);

  next();
};
