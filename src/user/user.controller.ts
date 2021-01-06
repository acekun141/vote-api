import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../_interface';
import UserService from './user.service';

class UserController {
  private userService = new UserService();
  public info = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user;
      const info = await this.userService.getUserInfo(id);
      res.json({ user: info });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;