import UserModel from './user.model';

class UserService {
  public userModel = UserModel;

  public async getUserInfo(id: string) {
    const user = await this.userModel.findOne({ id });
    return { id: user.id, username: user.username };
  }
}

export default UserService;