import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../entities/User';
import { OmitedUser } from '../interfaces/OmitedUser';
import { UserService } from '../services/UserService';

export class UserController {
  private path: string = '/users';
  private router: Router = Router();
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public initializeRoutes(): UserController {
    this.router.get(`${this.path}/:id`, this.getUserById);
    return this;
  }

  public getRouter(): Router {
    return this.router;
  }

  private getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = req.params.id;
      const userDto: OmitedUser = await this.userService.findUserById(id);
      res.json(userDto);
    } catch (e) {
      next(e);
    }
  };
}
