import { HttpException } from './HttpException';

class WrongCredential extends HttpException {
  constructor() {
    const status = 401;
    const message = 'Wrong credential provied';
    super(status, message);
  }
}

export {
  WrongCredential
}