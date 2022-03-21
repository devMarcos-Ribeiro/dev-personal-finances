import { NextFunction, Request, Response } from 'express';
import logger from '../logger';
import ApiError from '../errors/ApiError';

const apiErrorValidator = (
  error: Error,
  _: Request,
  response: Response,
  __: NextFunction,
) => {
  if (error instanceof ApiError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  logger.error(`❌ - Unexpected error: ${error.message}`);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server Error',
  });
};

export default apiErrorValidator;
