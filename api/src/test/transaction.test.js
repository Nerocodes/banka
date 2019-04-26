import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';
import UserService from '../services/user.service';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

// Set global variables
const client = {
  email: 'neropaulej@gmail.com',
  password: 'password',
};

const staff = {
  email: 'yetundegeorge@gmail.com',
  password: 'password',
};

const getClientToken = async () => {
  const clientSignIn = await UserService.signIn(client);
  const clientToken = clientSignIn.token;
  return clientToken;
};

const getStaffToken = async () => {
  const staffSignIn = await UserService.signIn(staff);
  const staffToken = staffSignIn.token;
  return staffToken;
};

const accountNumber = 23402001;

// Test for credit transactions
describe('Testing credit transaction', () => {
  const transactionUrl = '/api/v1/transactions/';
  it('should credit account if all parameters are given', async () => {
    const amount = {
      amount: 80000,
    };
    const token = await getStaffToken();
    chai.request(app)
      .post(`${transactionUrl}${accountNumber}/credit`)
      .set('x-access-token', token)
      .send(amount)
      .end((errorStaff, responseStaff) => {
        responseStaff.body.should.have.status(200);
        responseStaff.body.should.be.a('object');
        responseStaff.body.data.should.have.property('transactionId');
        responseStaff.body.data.should.have.property('accountNumber');
        responseStaff.body.data.should.have.property('amount');
        responseStaff.body.data.should.have.property('cashier');
        responseStaff.body.data.should.have.property('transactionType');
        responseStaff.body.data.should.have.property('accountBalance');
      });
  });

  it('should not credit account if amount is not a number', async () => {
    const amount = {
      amount: 'different',
    };
    const token = await getStaffToken();
    chai.request(app)
      .post(`${transactionUrl}${accountNumber}/credit`)
      .set('x-access-token', token)
      .send(amount)
      .end((errorStaff, responseStaff) => {
        responseStaff.body.should.have.status(400);
        responseStaff.body.should.be.a('object');
        responseStaff
          .body.error.should.equal('Amount must be a positive number and is required');
      });
  });

  it('should not credit account if user is not cashier', async () => {
    const amount = {
      amount: 80000,
    };
    const token = await getClientToken();
    chai.request(app)
      .post(`${transactionUrl}${accountNumber}/credit`)
      .set('x-access-token', token)
      .send(amount)
      .end((errorStaff, responseStaff) => {
        responseStaff.body.should.have.status(401);
        responseStaff.body.should.be.a('object');
        responseStaff.body.error.should.equal('Unauthorized user');
      });
  });

  it('should not credit account if account number does not exist', async () => {
    const amount = {
      amount: 80000,
    };
    const token = await getStaffToken();
    chai.request(app)
      .post(`${transactionUrl}123456/credit`)
      .set('x-access-token', token)
      .send(amount)
      .end((errorStaff, responseStaff) => {
        responseStaff.body.should.have.status(404);
        responseStaff.body.should.be.a('object');
        responseStaff.body.error.should.equal('Account number does not match our records');
      });
  });
});

// Test for debit transactions
describe('Testing debit transaction', () => {
  const transactionUrl = '/api/v1/transactions/';
  it('should debit account if all parameters are given', async () => {
    const debitAmount = {
      amount: 40000,
    };
    const token = await getStaffToken();
    chai.request(app)
      .post(`${transactionUrl}${accountNumber}/debit`)
      .set('x-access-token', token)
      .send(debitAmount)
      .end((debitErr, debitRes) => {
        debitRes.body.should.have.status(200);
        debitRes.body.should.be.a('object');
        debitRes.body.data.should.have.property('transactionId');
        debitRes.body.data.should.have.property('accountNumber');
        debitRes.body.data.should.have.property('amount');
        debitRes.body.data.should.have.property('cashier');
        debitRes.body.data.should.have.property('transactionType');
        debitRes.body.data.should.have.property('accountBalance');
      });
  });

  it('should not debit account if amount is not a number', async () => {
    const amount = {
      amount: 'different',
    };
    const token = await getStaffToken();
    chai.request(app)
      .post(`${transactionUrl}${accountNumber}/debit`)
      .set('x-access-token', token)
      .send(amount)
      .end((errorStaff, responseStaff) => {
        responseStaff.body.should.have.status(400);
        responseStaff.body.should.be.a('object');
        responseStaff
          .body.error.should.equal('Amount must be a positive number and is required');
      });
  });

  it('should not debit account if user is not cashier', async () => {
    const amount = {
      amount: 80000,
    };
    const token = await getClientToken();
    chai.request(app)
      .post(`${transactionUrl}${accountNumber}/debit`)
      .set('x-access-token', token)
      .send(amount)
      .end((errorStaff, responseStaff) => {
        responseStaff.body.should.have.status(401);
        responseStaff.body.should.be.a('object');
        responseStaff.body.error.should.equal('Unauthorized user');
      });
  });

  it('should not debit account if account number does not exist', async () => {
    const amount = {
      amount: 80000,
    };
    const token = await getStaffToken();
    chai.request(app)
      .post(`${transactionUrl}123456/debit`)
      .set('x-access-token', token)
      .send(amount)
      .end((errorStaff, responseStaff) => {
        responseStaff.body.should.have.status(404);
        responseStaff.body.should.be.a('object');
        responseStaff.body.error.should.equal('Account number does not match our records');
      });
  });

  it('should not debit account if account number is not an integer', async () => {
    const amount = {
      amount: 80000,
    };
    const token = await getStaffToken();
    chai.request(app)
      .post(`${transactionUrl}123456.4/debit`)
      .set('x-access-token', token)
      .send(amount)
      .end((errorStaff, responseStaff) => {
        responseStaff.body.should.have.status(400);
        responseStaff.body.should.be.a('object');
        responseStaff.body.error.should.equal('Account number must be an integer');
      });
  });

  it('should not debit account if account balance is not enough', async () => {
    const amount = {
      amount: 800000,
    };
    const token = await getStaffToken();
    chai.request(app)
      .post(`${transactionUrl}${accountNumber}/debit`)
      .set('x-access-token', token)
      .send(amount)
      .end((errorStaff, responseStaff) => {
        responseStaff.body.should.have.status(400);
        responseStaff.body.should.be.a('object');
        responseStaff
          .body.error.should.equal('Transaction declined: Insufficient funds');
      });
  });
});

// Testing for get single transaction
describe('Testing get single transaction', () => {
  const singleAccUrl = '/api/v1/transactions/';
  it('should get single account', async () => {
    const token = await getClientToken();
    chai.request(app)
      .get(`${singleAccUrl}2`)
      .set('x-access-token', token)
      .end((error, response) => {
        response.body.should.have.status(200);
        response.body.data.should.be.a('array');
        response.body.data[0].should.be.a('object');
        response.body.data[0].should.have.property('transactionId');
        response.body.data[0].should.have.property('createdOn');
        response.body.data[0].should.have.property('type');
        response.body.data[0].should.have.property('accountNumber');
        response.body.data[0].should.have.property('amount');
        response.body.data[0].should.have.property('oldBalance');
        response.body.data[0].should.have.property('newBalance');
      });
  });

  it('should not get single account if transaction does not exist', async () => {
    const token = await getClientToken();
    chai.request(app)
      .get(`${singleAccUrl}9`)
      .set('x-access-token', token)
      .end((error, response) => {
        response.body.should.have.status(400);
        response.body.should.be.a('object');
        response.body.error.should.equal('No transaction with this id');
      });
  });

  it('should not get single account if transaction id is not an integer', async () => {
    const token = await getClientToken();
    chai.request(app)
      .get(`${singleAccUrl}2.2`)
      .set('x-access-token', token)
      .end((error, response) => {
        response.body.should.have.status(400);
        response.body.should.be.a('object');
        response.body.error.should.equal('Transaction ID must be an integer');
      });
  });

  it('should not get single account if token is wrong', async () => {
    chai.request(app)
      .get(`${singleAccUrl}2.2`)
      .set('x-access-token', 'nksfnjnsdbjhbecsk')
      .end((error, response) => {
        response.body.should.have.status(500);
        response.body.should.be.a('object');
        response.body.error.should.equal('Failed to authenticate token.');
      });
  });
});
