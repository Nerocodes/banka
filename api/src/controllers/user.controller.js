import bcrypt from 'bcryptjs';
import UserService from '../services/user.service';


const UserController = {
  // fetchAllUsers(req, res) {
  //   const allUsers = UserService.fetchAllUsers();
  //   // eslint-disable-next-line array-callback-return
  //   allUsers.map((userObj) => {
  //     Object.defineProperty(userObj, 'password', {
  //       enumerable: false,
  //       writable: true,
  //     });
  //   });
  //   return res.json({
  //     status: 200,
  //     data: allUsers,
  //   }).status(200);
  // },

  async addAUser(req, res) {
    const newUser = req.body;
    if (!newUser.type && !newUser.isAdmin) {
      newUser.type = 'client';
      newUser.isAdmin = false;
    }
    if (!newUser.firstName) {
      return res.json({
        status: 400,
        error: 'First Name field is required',
      });
    }
    if (!newUser.lastName) {
      return res.json({
        status: 400,
        error: 'Last Name field is required',
      });
    }
    if (!newUser.email) {
      return res.json({
        status: 400,
        error: 'Email field is required',
      });
    }
    if (!newUser.password) {
      return res.json({
        status: 400,
        error: 'Password field is required',
      });
    }
    const hashedPassword = bcrypt.hashSync(newUser.password, 8);
    newUser.password = hashedPassword;
    const createdUser = await UserService.addUser(newUser);
    Object.defineProperty(createdUser, 'password', {
      enumerable: false,
      writable: true,
    });
    return res.json({
      status: 201,
      data: createdUser,
    });
  },

  async signIn(req, res) {
    const oldUser = req.body;
    if (!oldUser.email) {
      return res.json({
        status: 400,
        error: 'Email field is required',
      });
    }
    if (!oldUser.password) {
      return res.json({
        status: 400,
        error: 'Password field is required',
      });
    }
    const foundUser = await UserService.signIn(oldUser);
    if (!foundUser.email) {
      return res.json({
        status: 404,
        error: 'no user with this email',
      }).status(404);
    }
    const validPassword = bcrypt.compareSync(oldUser.password, foundUser.password);
    if (!validPassword) {
      return res.json({
        status: 401,
        error: 'wrong password',
      }).status(401);
    }
    Object.defineProperty(foundUser, 'password', {
      enumerable: false,
      writable: true,
    });
    return res.json({
      status: 201,
      data: foundUser,
    }).status(201);
  },

  // getSingleUser(req, res) {
  //   const { id } = req.params;
  //   const foundUser = UserService.getAUser(id);
  //   return res.json({
  //     status: 201,
  //     data: foundUser,
  //   }).status(200);
  // },
};

export default UserController;
