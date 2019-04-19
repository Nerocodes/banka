import UserService from '../services/user.service';


const UserController = {

  async addAUser(req, res) {
    const newUser = req.body;
    if (!newUser.type && !newUser.isAdmin) {
      newUser.type = 'client';
      newUser.isAdmin = false;
    }
    const createdUser = await UserService.addUser(newUser);
    if (createdUser.error) {
      return res.json({
        status: 400,
        data: createdUser.error,
      });
    }
    return res.json({
      status: 201,
      data: createdUser,
    });
  },

  async signIn(req, res) {
    const oldUser = req.body;
    const foundUser = await UserService.signIn(oldUser);
    if (!foundUser.email) {
      return res.json({
        status: 404,
        error: 'no user with this email',
      });
    }
    if (foundUser.error) {
      res.json({
        status: 400,
        error: 'wrong password',
      });
    }
    return res.json({
      status: 201,
      data: foundUser,
    });
  },
};

export default UserController;
