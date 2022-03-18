import { UserRepository } from '../repositories/UserRepository';

import ApiError from '../shared/errors/ApiError';
import logger from '../logger';
import { BSONTypeError } from 'bson';
import omit from 'object.omit';
import { OmitedUser } from '../interfaces/OmitedUser';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async findUserById(id: string): Promise<OmitedUser> {
    try {
      const user = await this.userRepository.findOne(id);
      if (user) {
        logger.info(`✨ - Returning found user with id: '${id}'.`);
        return omit({ ...user }, ['isActive', 'updatedAt']);
      }
      throw new ApiError(`User with id '${id}' doesn't exists.`, 404);
    } catch (e) {
      if (e instanceof BSONTypeError) {
        logger.error(
          `❌ - Error parsing id: '${id}' when fetching user by id.`,
        );
        throw new ApiError(`User with id '${id}' doesn't exists.`, 404);
      }
      throw e;
    }
  }
}
