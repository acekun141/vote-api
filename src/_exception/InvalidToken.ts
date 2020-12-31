import { HttpException } from './HttpException';

class InvalidToken extends HttpException {
  constructor() {
    super(404, 'Invalid Token');
  }
}

export { InvalidToken };