import { Application } from 'express';
import { json } from 'express';
import cors from 'cors';
import logger from './logger';
import apiErrorValidator from './middlewares/api-error-validator';
import { connectToDatabase } from './shared/typeorm';
import getControllers from './controllers';

export class Server {
  private app: Application;
  private port: string | number;

  constructor(app: Application, port: string | number = 8080) {
    this.app = app;
    this.port = port;
  }

  public async start(): Promise<void> {
    await this.init();
    this.app.listen(this.port, () => {
      logger.info(`🚀 - App is up and running on port: ${this.port}`);
    });
  }

  private async init(): Promise<void> {
    this.setUpExpress();
    await this.setUpDataBase();
    this.setUpControllers();
    this.setupErrorHandlers();
  }

  private async setUpDataBase(): Promise<void> {
    logger.info('⌛ - Connecting to database...');
    await connectToDatabase();
    logger.info('📦 - Database successfully connected!');
  }

  private setUpExpress() {
    this.app.use(json());
    this.app.use(
      cors({
        origin: '*',
      }),
    );
  }

  private setupErrorHandlers() {
    this.app.use(apiErrorValidator);
  }

  private setUpControllers() {
    logger.info(`⌛ - Initializing controllers...`);
    getControllers().forEach(controller => {
      this.app.use('/', controller.initializeRoutes().getRouter());
    });
    logger.info(`✨ - Controllers have initialized successfully!`);
  }
}
