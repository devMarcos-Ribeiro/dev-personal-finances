export = {
  type: 'mongodb',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '27017',
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dev_finances',
  synchronize: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['database/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'database/migrations',
    subscribersDir: 'src/subscriber',
  },
};
