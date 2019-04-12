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
    if (!newUser.type && !newUser.isAdmin) {
      newUser.type = 'client';
      newUser.isAdmin = false;
    }
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

  signIn(req, res) {
    const oldUser = req.body;
    const foundUser = UserService.signIn(oldUser);
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
    const token = jwt.sign({ id: foundUser.id }, secret, {
      expiresIn: 86400, // expires in 24 hours
    });
    foundUser.token = token;
    return res.json({
      status: 201,
      data: foundUser,
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
