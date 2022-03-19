import 'dotenv/config';
import express from 'express';
import logger from './logger';
import { Server } from './server';

(async (port): Promise<void> => {
  logger.info('⌛ - Starting server...');
  await new Server(express(), port).start();
})(process.env.PORT);
