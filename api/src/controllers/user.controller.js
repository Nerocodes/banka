import UserService from '../services/user.service';
import responseHelper from '../helpers/response.helper';


const UserController = {

  async addAUser(req, res) {
    const newUser = req.body;
    if (!newUser.type && !newUser.isAdmin) {
      newUser.type = 'client';
      newUser.isAdmin = false;
    }
    const createdUser = await UserService.addUser(newUser);
    responseHelper(res, createdUser);
  },

  async signIn(req, res) {
    const oldUser = req.body;
    const foundUser = await UserService.signIn(oldUser);
    responseHelper(res, foundUser);
  },

  async getUserAccounts(req, res) {
    const accounts = await UserService.getUserAccounts(req.params);
    responseHelper(res, accounts);
  },
};

export default UserController;
