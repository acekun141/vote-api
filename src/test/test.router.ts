import express from 'express';
import Controller from './test.controller';
import { Router } from '../_interface';
import passport from 'passport';

class TestRouter implements Router {
  public path = '/test';
  public router = express.Router();
  private controller = new Controller();

  constructor() {
    this.initializeController();
  }

  private initializeController(): void {
    this.router.get(`${this.path}/`, this.controller.test);
    this.router.get(`${this.path}/auth`, passport.authenticate('jwt'), (req, res) => {
      res.json({ user: req.user });
    })
  }
}

export default TestRouter;