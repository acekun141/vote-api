import TokenModel from './token.model';
import { uid } from 'rand-token';
import { InvalidToken } from '../_exception';

class TokenService {
  public token = TokenModel;

  public async createToken(username: string): Promise<string> {
    const refreshToken = uid(256);
    await this.token.create({ token: refreshToken, username });
    return refreshToken;
  }

  public async rejectToken(token: string, username: string): Promise<boolean> {
    const refreshToken = await this.token.findOne({ token });
    if (refreshToken?.username === username) {
      await this.token.deleteOne({ token });
      return true;
    } else {
      throw new InvalidToken();
    }
  }
}

export default TokenService;