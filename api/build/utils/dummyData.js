"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  users: [{
    id: 1,
    email: 'first@email.com',
    firstName: 'Yoshi',
    lastName: 'Yama',
    password: '$2y$12$n6jFL050ZsssDIGQpHeN2uWHRae.9TiSeUdf8RoTwSO1zBjhFry4C',
    type: 'client',
    isAdmin: false
  }, {
    id: 2,
    email: 'second@email.com',
    firstName: 'Yetunde',
    lastName: 'George',
    password: '$2y$12$n6jFL050ZsssDIGQpHeN2uWHRae.9TiSeUdf8RoTwSO1zBjhFry4C',
    type: 'staff',
    isAdmin: false
  }, {
    id: 3,
    email: 'third@email.com',
    firstName: 'Faith',
    lastName: 'Praise',
    password: '$2y$12$n6jFL050ZsssDIGQpHeN2uWHRae.9TiSeUdf8RoTwSO1zBjhFry4C',
    type: 'client',
    isAdmin: false
  }, {
    id: 4,
    email: 'fourth@email.com',
    firstName: 'Naruto',
    lastName: 'Uzumaki',
    password: '$2y$12$n6jFL050ZsssDIGQpHeN2uWHRae.9TiSeUdf8RoTwSO1zBjhFry4C',
    type: 'staff',
    isAdmin: true
  }],
  accounts: [{
    id: 1,
    accountNumber: 23402001,
    createdOn: '04/08/2019',
    owner: 1,
    type: 'savings',
    status: 'active',
    balance: 250000
  }, {
    id: 2,
    accountNumber: 23402002,
    createdOn: '04/08/2019',
    owner: 2,
    type: 'savings',
    status: 'active',
    balance: 50000
  }],
  transactions: [{
    id: 1,
    createdOn: '04/08/2019',
    type: 'debit',
    accountNumber: 23402001,
    cashier: 2,
    ammount: 30000,
    oldBalance: 250000,
    newBalance: 220000
  }, {
    id: 2,
    createdOn: '04/08/2019',
    type: 'debit',
    accountNumber: 23402001,
    cashier: 2,
    amount: 20000,
    oldBalance: 230000,
    newBalance: 200000
  }, {
    id: 3,
    createdOn: '04/08/2019',
    type: 'credit',
    accountNumber: 23402002,
    cashier: 2,
    amount: 20000,
    oldBalance: 50000,
    newBalance: 70000
  }]
};
exports["default"] = _default;
//# sourceMappingURL=dummyData.js.map