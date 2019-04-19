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
