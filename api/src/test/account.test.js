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

// const admin = {
//   email: 'yoshiyama@gmail.com',
//   password: 'password',
// };

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

// const getAdminToken = async () => {
//   const adminSignIn = await UserService.signIn(admin);
//   const adminToken = adminSignIn.token;
//   return adminToken;
// };

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

  it('should not create an account if user is not a client', async () => {
    const accType = {
      type: 'savings',
    };
    const token = await getStaffToken();
    chai.request(app)
      .post(createAccUrl)
      .set('x-access-token', token)
      .send(accType)
      .end((error, response) => {
        response.body.should.have.status(401);
        response.body.should.be.a('object');
        response.body.error.should.equal('An account cannot be created for this user');
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
        responseStaff.body.should.have.status(401);
        responseStaff.body.should.be.a('object');
        responseStaff.body.error.should.equal('Unauthorized user');
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
        responseStaff.body.should.have.status(404);
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
        responseStaff.body.error.should.equal('Unauthorized user');
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

// Test for getting all bank accounts
// describe('Testing fetch all bank accounts', () => {
//   const signInUrl = '/api/v1/auth/signin';
//   const fetchAccUrl = '/api/v1/accounts';
//   it('should fetch all bank accounts', (done) => {
//     const user = {
//       email: 'nerocodes@gmail.com',
//       password: 'password',
//     };
//     chai.request(app)
//       .post(signInUrl)
//       .send(user)
//       .end((err, res) => {
//         res.body.should.have.status(201);
//         res.body.should.be.a('object');
//         res.body.data.should.have.property('token');
//         const { token } = res.body.data;
//         chai.request(app)
//           .get(fetchAccUrl)
//           .set('x-access-token', token)
//           .end((error, response) => {
//             response.body.should.have.status(200);
//             response.body.should.be.a('object');
//             response.body.should.have.property('data');
//             done();
//           });
//       });
//   });

//   it('should not fetch accounts if user is not staff', (done) => {
//     const user = {
//       email: 'yoshiyama@gmail.com',
//       password: 'password',
//     };
//     chai.request(app)
//       .post(signInUrl)
//       .send(user)
//       .end((err, res) => {
//         res.body.should.have.status(201);
//         res.body.should.be.a('object');
//         res.body.data.should.have.property('token');
//         const { token } = res.body.data;
//         chai.request(app)
//           .get(fetchAccUrl)
//           .set('x-access-token', token)
//           .end((error, response) => {
//             response.body.should.have.status(401);
//             response.body.should.be.a('object');
//             response.body.error.should.equal('Unauthorized user');
//             done();
//           });
//       });
//   });
// });
