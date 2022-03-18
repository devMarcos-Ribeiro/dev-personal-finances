import { createConnection } from 'typeorm';

export const connectToDatabase = async (): Promise<void> => {
  await createConnection();
};
