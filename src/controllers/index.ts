import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
import { UserController } from './UserController';

const getControllers = () => {
  return [
    new UserController(new UserService(getCustomRepository(UserRepository))),
  ];
};

export default getControllers;
