import { createConnection } from 'typeorm';
import logger from '../../logger/winston';

createConnection().then(() =>
  logger.info('📦 Successfully connected with database'),
);
