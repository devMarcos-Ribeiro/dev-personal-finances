import { getCustomRepository, getMongoRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../../repositories/UsersRepository';

interface IUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
}

class CreateUserService {
  public async execute({
    firstName,
    lastName,
    email,
    isActive,
  }: IUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = usersRepository.create({
      firstName,
      lastName,
      email,
      isActive,
    });

    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
