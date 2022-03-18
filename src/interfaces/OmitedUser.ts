import { User } from '../entities/User';

export interface OmitedUser extends Omit<User, 'isActive' | 'updatedAt'> {}
