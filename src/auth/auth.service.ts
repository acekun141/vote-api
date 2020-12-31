import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserWithUsernameAlreadyExisted, WrongCredential } from '../_exception';
import { User } from '../user/user.interface';
import UserModel from '../user/user.model';
import TokenModel from '../token/token.model';
import { TokenPayload, TokenResult } from '../_interface';
import TokenService from '../token/token.service';

class AuthService {
  public user = UserModel;
  public token = TokenModel;
  private tokenService = new TokenService();

  public async createUser(payload: User) { 
    const userWithUsername = await this.user.findOne({ username: payload.username });
    if (userWithUsername) {
      throw new UserWithUsernameAlreadyExisted(payload.username);
    }
    const password = await bcrypt.hash(payload.password, 10);
    await this.user.create({ ...payload, password })
    return true;
  }

  public async login(payload: User): Promise<TokenResult> {
    const user = await this.user.findOne({ username: payload.username });
    const comparePassword = await bcrypt.compare(payload.password, user.password);
    if (comparePassword) {
      const tokenPayload: TokenPayload = { username: payload.username, role: 'user' };
      const refreshToken = await this.tokenService.createToken(payload.username);
      const accessToken = jwt.sign(
        tokenPayload,
        process.env.SECRET || 'SECRET',
        { expiresIn: 300 });
      return { accessToken, refreshToken };
    }
    throw new WrongCredential();
  }

  public async refreshToken(payload: { username: string, refreshToken: string }): Promise<string | boolean> {
    const token = await this.token.findOne({ token: payload.refreshToken, username: payload.username });
    if (token && token.username === payload.username) {
      const tokenPayload: TokenPayload = { username: payload.username, role: 'user' };
      const accessToken = jwt.sign(
        tokenPayload,
        process.env.SECRET || 'SECRET',
        { expiresIn: 300 });
        return accessToken;
    }
    return false;
  };
}

export default AuthService;