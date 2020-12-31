import express from 'express';
import { Router } from '../_interface';
import { validation } from '../_middleware';
import { LoginDto, RegisterDto, RejectTokenDto, RefreshTokenDto } from './auth.dto';
import Controller from './auth.controller';
import passport from 'passport';

class AuthRouter implements Router {
  public router = express.Router();
  public path = '/auth';
  private controller = new Controller();

  constructor() {
    this.initializeController();
  }

  private initializeController(): void {
    this.router.post(`${this.path}/login`, validation(LoginDto), this.controller.login);
    this.router.post(`${this.path}/register`, validation(RegisterDto), this.controller.register);
    this.router.post(`${this.path}/token`, validation(RefreshTokenDto), this.controller.token);
    this.router.post(
      `${this.path}/reject`,
      validation(RejectTokenDto),
      passport.authenticate('jwt'),
      this.controller.rejectToken);
  }
}

export default AuthRouter;