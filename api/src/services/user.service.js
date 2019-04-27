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
        return {
          status: 409,
          error: 'An account with this email already exists',
        };
      }
      return {
        status: 400,
        error: err.detail,
      };
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
        return {
          status: 400,
          error: 'Wrong password',
        };
      }
      const token = jwt.sign({
        id, firstName, lastName, email: data.email, type: data.type, isAdmin,
      }, secret, {
        expiresIn: 86400, // expires in 24 hours
      });
      return {
        status: 200,
        message: 'Signin successful',
        data: {
          token,
          id,
          firstName,
          lastName,
          email: data.email,
          type: data.type,
          isAdmin,
        },
      };
    } catch (err) {
      return {
        status: 400,
        error: 'Request failed: Invalid Email or Password',
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

  async getUserAccounts({ email }) {
    const sql = `
        SELECT * FROM Users WHERE email='${email}';
      `;

    const client = await pool.connect();
    try {
      const res = await client.query(sql);
      if (res.rowCount < 1) {
        return {
          status: 400,
          error: 'No user with this email',
        };
      }
      const { id } = res.rows[0];
      const sql2 = `
        SELECT * FROM Accounts WHERE owner='${id}';
      `;
      const res2 = await client.query(sql2);
      if (res2.rowCount < 1) {
        return {
          status: 400,
          error: 'User does not have any account',
        };
      }
      const accounts = [];
      res2.rows.map((account) => {
        const {
          createdon: createdOn,
          accountnumber: accountNumber,
          type,
          status,
          balance,
        } = account;
        return accounts.push({
          createdOn,
          accountNumber,
          type,
          status,
          balance: balance.toFixed(2),
        });
      });
      return {
        status: 200,
        message: 'Request successful',
        data: accounts,
      };
    } finally {
      client.release();
    }
  },

};

export default UserService;
