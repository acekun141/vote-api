import { HttpException } from './HttpException';

class UserWithUsernameAlreadyExisted extends HttpException {
  constructor(username: string) {
    const status = 400;
    const message = `User ${username} already existed`;
    super(status, message);
  }
}

export {
  UserWithUsernameAlreadyExisted
}