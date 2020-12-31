import { Request, Response, NextFunction } from 'express';
import AuthService from './auth.service';
import TokenService from '../token/token.service';
import { RequestWithUser, TokenResult } from '../_interface';

class AuthController {
  public authService = new AuthService();
  public tokenService = new TokenService();

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password } = req.body;
      const tokenResult: TokenResult = await this.authService.login({ username, password });
      res.json({
        access_token: tokenResult.accessToken,
        refresh_token: tokenResult.refreshToken });
    } catch (error) {
      next(error);
    }
  }

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password } = req.body;
      const result = await this.authService.createUser({ username, password });
      if (result) {
        res.sendStatus(201);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }

  public token = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, refreshToken } = req.body;
    const accessToken = await this.authService.refreshToken({ username, refreshToken });
    if (accessToken) {
      res.json({ accessToken });
    } else {
      res.sendStatus(401);
    }
  }
  
  public rejectToken = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username } = req.user;
      const { refreshToken } = req.body;
      const success = await this.tokenService.rejectToken(refreshToken, username);
      if (success) {
        res.sendStatus(201);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;