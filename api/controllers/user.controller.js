import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserService from '../services/user.service';

const secret = process.env.SECRET || 'supersecret';

const UserController = {
  fetchAllUsers(req, res) {
    const allUsers = UserService.fetchAllUsers();
    // eslint-disable-next-line array-callback-return
    allUsers.map((userObj) => {
      Object.defineProperty(userObj, 'password', {
        enumerable: false,
        writable: true,
      });
    });
    return res.json({
      status: 200,
      data: allUsers,
    }).status(200);
  },

  addAUser(req, res) {
    const newUser = req.body;
    const hashedPassword = bcrypt.hashSync(newUser.password, 8);
    newUser.password = hashedPassword;
    const createdUser = UserService.addUser(newUser);
    const token = jwt.sign({ id: createdUser.id }, secret, {
      expiresIn: 86400,
    });
    createdUser.token = token;
    Object.defineProperty(createdUser, 'password', {
      enumerable: false,
      writable: true,
    });
    return res.json({
      status: 201,
      data: createdUser,
    }).status(201);
  },

  getSingleUser(req, res) {
    const { id } = req.params;
    const foundUser = UserService.getAUser(id);
    return res.json({
      status: 201,
      data: foundUser,
    }).status(200);
  },
};

export default UserController;
