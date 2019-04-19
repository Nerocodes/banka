import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import pool from '../database/database';

const secret = process.env.SECRET || 'supersecret';


const UserService = {
  async addUser(user) {
    let newUser = new User();
    newUser = { ...user };
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
      return this.signIn(newUser);
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
      const token = jwt.sign({ id }, secret, {
        expiresIn: 86400, // expires in 24 hours
      });
      return {
        token,
        id,
        firstName,
        lastName,
        email: data.email,
        password: data.password,
        type: data.type,
        isAdmin,
      };
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
