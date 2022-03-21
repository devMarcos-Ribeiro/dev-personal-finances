import config from './config';

export = {
  type: 'mongodb',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: false,
  entities: ['src/modules/**/typeorm/entities/*.ts'],
  migrations: ['database/migrations/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  migrationsTableName: 'migrations',
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'database/migrations',
    subscribersDir: 'src/subscriber',
  },
};
