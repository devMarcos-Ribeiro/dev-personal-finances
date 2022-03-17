import 'dotenv/config';
import express, { Application } from 'express';
import logger from './logger/winston';

const PORT = process.env.PORT || 8080;
const app: Application = express();

app.listen(PORT, () => {
  logger.info(`🚀 - App is up and running on port ${PORT}`);
});
