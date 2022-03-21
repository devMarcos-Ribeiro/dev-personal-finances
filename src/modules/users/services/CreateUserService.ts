import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import ApiError from '../../../shared/errors/ApiError';
import { hash } from 'bcryptjs';
interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  isActive?: boolean;
  password: string;
}
class CreateUserService {
  public async execute({
    firstName,
    lastName,
    email,
    isActive,
    password,
  }: IUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userAlreadyExists = await usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new ApiError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      firstName,
      lastName,
      email,
      isActive,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
