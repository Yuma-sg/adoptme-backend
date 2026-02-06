import dotenv from 'dotenv';
dotenv.config({ override: true });

console.log('NODE_ENV REAL =>', process.env.NODE_ENV);

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

import { errorHandler } from './errors/errorHandler.js';
import { addLogger } from './middlewares/logger.middleware.js';
import logger from './logger/logger.js';
import loggerTestRouter from './routes/loggerTest.router.js';

const app = express();
const PORT = process.env.PORT || 8080;

/* MIDDLEWARES BASE */
app.use(express.json());
app.use(cookieParser());

/* LOGGER */
app.use(addLogger);

/* RUTAS */
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);
app.use('/', loggerTestRouter);

/* ERROR HANDLER */
app.use(errorHandler);

/* DB */
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
  .then(() => logger.info('MongoDB conectado'))
  .catch(err => logger.error(`Error MongoDB: ${err.message}`));

/* SERVER */
app.listen(PORT, () => {
  logger.info(`Listening on ${PORT}`);
});
