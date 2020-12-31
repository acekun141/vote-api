import { Request } from 'express';
import { User } from '../../user/user.interface';

export interface RequestWithUser extends Request {
  user: User;
}

export interface TokenResult {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload {
  username: string;
  role: 'user' | 'admin';
}