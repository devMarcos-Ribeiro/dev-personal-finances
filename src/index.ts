import 'dotenv/config';
import express, { Application, NextFunction, Request, Response } from 'express';
import './shared/typeorm';
import logger from './logger/winston';
import ApiError from './shared/errors/ApiError';

const PORT = process.env.PORT || 8080;
const app: Application = express();

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ApiError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal server Error',
    });
  },
);

app.listen(PORT, () => {
  logger.info(`🚀 - App is up and running on port ${PORT}`);
});
