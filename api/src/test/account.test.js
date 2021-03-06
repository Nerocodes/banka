import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';
import UserService from '../services/user.service';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

// Set token variables
const client = {
  email: 'neropaulej@gmail.com',
  password: 'password',
};

const staff = {
  email: 'yetundegeorge@gmail.com',
  password: 'password',
};

const admin = {
  email: 'yoshiyama@gmail.com',
  password: 'password',
};

const getClientToken = async () => {
  const clientSignIn = await UserService.signIn(client);
  const clientToken = clientSignIn.data.token;
  return clientToken;
};

const getStaffToken = async () => {
  const staffSignIn = await UserService.signIn(staff);
  const staffToken = staffSignIn.data.token;
  return staffToken;
};

const getAdminToken = async () => {
  const adminSignIn = await UserService.signIn(admin);
  const adminToken = adminSignIn.data.token;
  return adminToken;
};

const accountNumber = 23402001;

// Test user create account
describe('Testing user creating an account', () => {
  const createAccUrl = '/api/v1/accounts';
  it('should create an account for user if all parameters are given', async () => {
    const accType = {
      type: 'savings',
    };
    const token = await getClientToken();
    chai.request(app)
      .post(createAccUrl)
      .set('x-access-token', token)
      .send(accType)
      .end((error, response) => {
        response.body.should.have.status(201);
        response.body.should.be.a('object');
        response.body.data.should.have.property('accountNumber');
        response.body.data.should.have.property('firstName');
        response.body.data.should.have.property('lastName');
        response.body.data.should.have.property('email');
        response.body.data.should.have.property('type');
        response.body.data.should.have.property('openingBalance');
      });
  });

  it('should not create an account if account type is not savings or current', async () => {
    const accType = {
      type: 'different',
    };
    const token = await getClientToken();
    chai.request(app)
      .post(createAccUrl)
      .set('x-access-token', token)
      .send(accType)
      .end((error, response) => {
        response.body.should.have.status(400);
        response.body.should.be.a('object');
        response.body.error.should.equal('Account type must be savings or current and is required');
      });
  });
});

// Test Admin/Staff activate or deactivate account
describe('Testing admin or staff activating and deactivating account', () => {
  const accStatusUrl = '/api/v1/accounts/';
  it('should change account status if all parameters are provided', async () => {
    const accStatus = {
      status: 'active',
    };
    const tokenStaff = await getStaffToken();
    chai.request(app)
      .patch(`${accStatusUrl}${accountNumber}`)
      .set('x-access-token', tokenStaff)
      .send(accStatus)
      .end((errorStaff, responseStaff) => {
        responseStaff.body.should.have.status(200);
        responseStaff.body.should.be.a('object');
        responseStaff.body.data.should.have.property('accountNumber');
        responseStaff.body.data.should.have.property('status');
      });
  });

  it('should not change account status if status is not active or dormant', async () => {
    const accStatus = {
      status: 'different',
    };
    const token = await getStaffToken();
    chai.request(app)
      .patch(`${accStatusUrl}${accountNumber}`)
      .set('x-access-token', token)
      .send(accStatus)
      .end((errorStaff, responseStaff) => {
        responseStaff.body.should.have.status(400);
        responseStaff.body.should.be.a('object');
        responseStaff.body.error.should.equal('Status must be active or dormant and is required');
      });
  });

  it('should not change account status if user is not staff', async () => {
    const accStatus = {
      status: 'active',
    };
    const token = await getClientToken();
    chai.request(app)
      .patch(`${accStatusUrl}${accountNumber}`)
      .set('x-access-token', token)
      .send(accStatus)
      .end((errorStaff, responseStaff) => {
        responseStaff.body.should.have.status(403);
        responseStaff.body.should.be.a('object');
        responseStaff.body.error.should.equal('Unauthorized Access');
      });
  });

  it('should not change account status if account is not found', async () => {
    const accStatus = {
      status: 'active',
    };
    const token = await getStaffToken();
    chai.request(app)
      .patch(`${accStatusUrl}123456`)
      .set('x-access-token', token)
      .send(accStatus)
      .end((errorStaff, responseStaff) => {
        responseStaff.body.should.have.status(400);
        responseStaff.body.should.be.a('object');
        responseStaff.body.error.should.equal('No account found');
      });
  });
});

// Test for Admin/Staff delete account
describe('Testing admin or staff deleting account', () => {
  const delAccUrl = '/api/v1/accounts/';
  it('should delete account if all parameters are given', async () => {
    const token = await getStaffToken();
    chai.request(app)
      .delete(`${delAccUrl}${accountNumber + 1}`)
      .set('x-access-token', token)
      .end((errorStaff, responseStaff) => {
        responseStaff.body.should.have.status(200);
        responseStaff.body.should.be.a('object');
        responseStaff.body.message.should.equal('Account successfully deleted');
      });
  });

  it('should not delete account if user is not staff', async () => {
    const token = await getClientToken();
    chai.request(app)
      .delete(`${delAccUrl}${accountNumber + 2}`)
      .set('x-access-token', token)
      .end((errorStaff, responseStaff) => {
        responseStaff.body.should.have.status(403);
        responseStaff.body.should.be.a('object');
        responseStaff.body.error.should.equal('Unauthorized Access');
      });
  });

  it('should not delete account if account does not exist', async () => {
    const token = await getStaffToken();
    chai.request(app)
      .delete(`${delAccUrl}123456`)
      .set('x-access-token', token)
      .end((errorStaff, responseStaff) => {
        responseStaff.body.should.have.status(400);
        responseStaff.body.should.be.a('object');
        responseStaff.body.error.should.equal('No account found');
      });
  });
});

// Test for account transaction history
describe('Testing get transaction history', () => {
  const historyUrl = `/api/v1/accounts/${accountNumber}/transactions`;
  it('should get all transaction history belonging to specified account number', async () => {
    const token = await getAdminToken();
    chai.request(app)
      .get(historyUrl)
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
});

// Test for get account details
describe('Testing get account details', () => {
  let getAccUrl = '/api/v1/accounts/23402004';
  it('should get account details', async () => {
    const token = await getClientToken();
    chai.request(app)
      .get(getAccUrl)
      .set('x-access-token', token)
      .end((error, response) => {
        response.body.should.have.status(200);
        response.body.should.be.a('object');
        response.body.data.should.have.property('createdOn');
        response.body.data.should.have.property('accountNumber');
        response.body.data.should.have.property('ownerEmail');
        response.body.data.should.have.property('type');
        response.body.data.should.have.property('status');
        response.body.data.should.have.property('balance');
      });
  });

  it('should not get account details if account number is wrong', async () => {
    getAccUrl = '/api/v1/accounts/2340200';
    const token = await getClientToken();
    chai.request(app)
      .get(getAccUrl)
      .set('x-access-token', token)
      .end((error, response) => {
        response.body.should.have.status(404);
        response.body.should.be.a('object');
        response.body.error.should.equal('No account with this account number');
      });
  });

  it('should not get account details if no token', async () => {
    getAccUrl = '/api/v1/accounts/2340200';
    chai.request(app)
      .get(getAccUrl)
      .end((error, response) => {
        response.body.should.have.status(403);
        response.body.should.be.a('object');
        response.body.error.should.equal('No token provided.');
      });
  });
});

// Test for get all accounts
describe('Testing get all accounts', () => {
  const getAccUrl = '/api/v1/accounts';
  it('should get all accounts', async () => {
    const token = await getStaffToken();
    chai.request(app)
      .get(getAccUrl)
      .set('x-access-token', token)
      .end((error, response) => {
        response.body.should.have.status(200);
        response.body.should.be.a('object');
        response.body.data.should.be.a('array');
        response.body.data[0].should.have.property('createdOn');
        response.body.data[0].should.have.property('accountNumber');
        response.body.data[0].should.have.property('ownerEmail');
        response.body.data[0].should.have.property('type');
        response.body.data[0].should.have.property('status');
        response.body.data[0].should.have.property('balance');
      });
  });

  it('should get all active accounts', async () => {
    const getActiveAccUrl = '/api/v1/accounts?status=active';
    const token = await getStaffToken();
    chai.request(app)
      .get(getActiveAccUrl)
      .set('x-access-token', token)
      .end((error, response) => {
        response.body.should.have.status(200);
        response.body.should.be.a('object');
        response.body.data.should.be.a('array');
        response.body.data[0].should.have.property('createdOn');
        response.body.data[0].should.have.property('accountNumber');
        response.body.data[0].should.have.property('ownerEmail');
        response.body.data[0].should.have.property('type');
        response.body.data[0].should.have.property('status');
        response.body.data[0].should.have.property('balance');
      });
  });

  it('should get all dormant accounts', async () => {
    const getDormantAccUrl = '/api/v1/accounts?status=dormant';
    const token = await getStaffToken();
    chai.request(app)
      .get(getDormantAccUrl)
      .set('x-access-token', token)
      .end((error, response) => {
        response.body.should.have.status(200);
        response.body.should.be.a('object');
        response.body.data.should.be.a('array');
        response.body.data[0].should.have.property('createdOn');
        response.body.data[0].should.have.property('accountNumber');
        response.body.data[0].should.have.property('ownerEmail');
        response.body.data[0].should.have.property('type');
        response.body.data[0].should.have.property('status');
        response.body.data[0].should.have.property('balance');
      });
  });

  it('should not get all active/dormant accounts if status is wrong', async () => {
    const getDormantAccUrl = '/api/v1/accounts?status=mant';
    const token = await getStaffToken();
    chai.request(app)
      .get(getDormantAccUrl)
      .set('x-access-token', token)
      .end((error, response) => {
        response.body.should.have.status(400);
        response.body.should.be.a('object');
        response.body.error.should.equal('Status must be active or dormant');
      });
  });

  it('should not get accounts if user is not a staff', async () => {
    const token = await getClientToken();
    chai.request(app)
      .get(getAccUrl)
      .set('x-access-token', token)
      .end((error, response) => {
        response.body.should.have.status(403);
        response.body.should.be.a('object');
        response.body.error.should.equal('Unauthorized Access');
      });
  });
});
