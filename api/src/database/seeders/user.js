import pool from '../database';


const insertUserTable = () => {
  const sql = `
  TRUNCATE Users;

  INSERT INTO Users(
    firstName,
    lastName,
    email,
    password,
    type,
    isAdmin
    ) 
    VALUES (
      'Nero',
      'Paul',
      'neropaulej@gmail.com',
      '$2y$12$n6jFL050ZsssDIGQpHeN2uWHRae.9TiSeUdf8RoTwSO1zBjhFry4C',
      'client',
      'false'
      ),
      (
        'Yetunde',
        'George',
        'yetundegeorge@gmail.com',
        '$2y$12$n6jFL050ZsssDIGQpHeN2uWHRae.9TiSeUdf8RoTwSO1zBjhFry4C',
        'staff',
        'false'
      ),
      (
        'Yoshi',
        'Yama',
        'yoshiyama@gmail.com',
        '$2y$12$n6jFL050ZsssDIGQpHeN2uWHRae.9TiSeUdf8RoTwSO1zBjhFry4C',
        'staff',
        'true'
      );
  `;
  pool.query(sql)
    .then(() => {
      pool.end();
    })
    .catch(() => {
      pool.end();
    });
};

module.exports = {
  insertUserTable,
};

// eslint-disable-next-line import/first
require('make-runnable');
