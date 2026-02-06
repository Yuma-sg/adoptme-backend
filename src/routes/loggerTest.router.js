import { Router } from 'express';
const router = Router();

router.get('/loggerTest', (req, res) => {
  req.logger.debug('Log DEBUG');
  req.logger.http('Log HTTP');
  req.logger.info('Log INFO');
  req.logger.warning('Log WARNING');
  req.logger.error('Log ERROR');
  req.logger.fatal('Log FATAL');

  res.send('Logs generados');
});

export default router;
