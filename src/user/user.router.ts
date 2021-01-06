import express from 'express';
import passport from 'passport';
import { Router } from '../_interface/index';
import UserController from './user.controller';

class UserRouter implements Router {
  public router = express.Router();
  public path = '/user';
  private controller = new UserController();
  
  constructor() {
    this.initializeController();
  }

  private initializeController() {
    this.router.get(`${this.path}/info`, passport.authenticate('jwt'), this.controller.info);
  }
}

export default UserRouter;