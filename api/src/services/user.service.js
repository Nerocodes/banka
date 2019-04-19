import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import pool from '../database/database';

const secret = process.env.SECRET || 'supersecret';


const UserService = {
  async addUser(user) {
    let newUser = new User();
    newUser = { ...user };
    const hashedPassword = bcrypt.hashSync(newUser.password, 8);
    newUser.password = hashedPassword;
    const sql = `
    INSERT INTO Users(
      firstName,
      lastName,
      email,
      password,
      type,
      isAdmin
      ) 
      VALUES (
        '${newUser.firstName}',
        '${newUser.lastName}',
        '${newUser.email}',
        '${newUser.password}',
        '${newUser.type}',
        '${newUser.isAdmin}'
        );
    `;
    const client = await pool.connect();
    try {
      await client.query(sql);
      return this.signIn(user);
    } catch (err) {
      if (err.code === '23505') {
        return { error: 'An account with this email already exists' };
      }
      return { error: err.detail };
    } finally {
      client.release();
    }
  },

  async signIn(user) {
    const sql = `
        SELECT * FROM Users WHERE email='${user.email}';
      `;

    const client = await pool.connect();
    try {
      const res = await client.query(sql);
      const {
        id,
        firstname: firstName,
        lastname: lastName,
        isadmin: isAdmin,
        ...data
      } = res.rows[0];
      const validPassword = bcrypt.compareSync(user.password, data.password);
      if (!validPassword) {
        return { error: 'Wrong password' };
      }
      const token = jwt.sign({ id }, secret, {
        expiresIn: 86400, // expires in 24 hours
      });
      return {
        token,
        id,
        firstName,
        lastName,
        email: data.email,
        type: data.type,
        isAdmin,
      };
    } catch (err) {
      return { error: err };
    } finally {
      client.release();
    }
  },

  async getAUser(id) {
    const sql = `
        SELECT * FROM Users WHERE id='${id}';
      `;

    const client = await pool.connect();
    try {
      const res = await client.query(sql);
      return res.rows[0];
    } finally {
      client.release();
    }
  },

};

export default UserService;
