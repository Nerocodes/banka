import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

// Test user create account
describe('Testing user creating an account', () => {
  const createAccUrl = '/api/v1/accounts';
  const signUpUrl = '/api/v1/auth/signup';
  const signInUrl = '/api/v1/auth/signin';
  it('should create an account for user if all parameters are given', (done) => {
    const user = {
      firstName: 'Oghenero',
      lastName: 'Paul-Ejukorlem',
      email: 'neropaulej@gmail.com',
      password: 'password',
    };
    const accType = {
      type: 'savings',
    };
    chai.request(app)
      .post(signUpUrl)
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        const { token } = res.body.data;
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
            done();
          });
      });
  });

  it('should not create an account if user is not a client', (done) => {
    const user = {
      firstName: 'Nero',
      lastName: 'Codes',
      email: 'nerocodes@gmail.com',
      password: 'password',
      type: 'staff',
      isAdmin: 'false',
    };
    const accType = {
      type: 'savings',
    };
    chai.request(app)
      .post(signUpUrl)
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        const { token } = res.body.data;
        chai.request(app)
          .post(createAccUrl)
          .set('x-access-token', token)
          .send(accType)
          .end((error, response) => {
            response.body.should.have.status(401);
            response.body.should.be.a('object');
            response.body.error.should.equal('An account cannot be created for this user');
            done();
          });
      });
  });

  it('should not create account if user already has account', (done) => {
    const user = {
      email: 'neropaulej@gmail.com',
      password: 'password',
    };
    const accType = {
      type: 'savings',
    };
    chai.request(app)
      .post(signInUrl)
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        const { token } = res.body.data;
        chai.request(app)
          .post(createAccUrl)
          .set('x-access-token', token)
          .send(accType)
          .end((error, response) => {
            response.body.should.have.status(400);
            response.body.should.be.a('object');
            response.body.error.should.equal('User already has an account');
            done();
          });
      });
  });
});

// Test Admin/Staff activate or deactivate account
describe('Testing admin or staff activating and deactivating account', () => {
  const createAccUrl = '/api/v1/accounts';
  const accStatusUrl = '/api/v1/accounts/';
  const signUpUrl = '/api/v1/auth/signup';
  const signInUrl = '/api/v1/auth/signin';
  it('should change account status if all parameters are provided', (done) => {
    const user = {
      firstName: 'Yoshi',
      lastName: 'Yama',
      email: 'yoshiyama@gmail.com',
      password: 'password',
    };
    const accType = {
      type: 'savings',
    };
    chai.request(app)
      .post(signUpUrl)
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        const { token } = res.body.data;
        chai.request(app)
          .post(createAccUrl)
          .set('x-access-token', token)
          .send(accType)
          .end((error, response) => {
            response.body.should.have.status(201);
            response.body.should.be.a('object');
            response.body.data.should.have.property('accountNumber');
            const { accountNumber } = response.body.data;
            const staff = {
              email: 'nerocodes@gmail.com',
              password: 'password',
            };
            const accStatus = {
              status: 'active',
            };
            chai.request(app)
              .post(signInUrl)
              .send(staff)
              .end((errStaff, resStaff) => {
                // console.log(res.body);
                resStaff.body.should.have.status(201);
                resStaff.body.should.be.a('object');
                resStaff.body.data.should.have.property('token');
                const tokenStaff = resStaff.body.data.token;
                chai.request(app)
                  .patch(`${accStatusUrl}${accountNumber}`)
                  .set('x-access-token', tokenStaff)
                  .send(accStatus)
                  .end((errorStaff, responseStaff) => {
                    responseStaff.body.should.have.status(200);
                    responseStaff.body.should.be.a('object');
                    responseStaff.body.data.should.have.property('accountNumber');
                    responseStaff.body.data.should.have.property('status');
                    done();
                  });
              });
          });
      });
  });

  it('should not change account status if user is not staff', (done) => {
    const user = {
      firstName: 'Yoshi',
      lastName: 'Yama',
      email: 'yoshiyama@gmail.com',
      password: 'password',
    };
    const accType = {
      type: 'savings',
    };
    chai.request(app)
      .post(signUpUrl)
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        const { token } = res.body.data;
        chai.request(app)
          .post(createAccUrl)
          .set('x-access-token', token)
          .send(accType)
          .end((error, response) => {
            response.body.should.have.status(201);
            response.body.should.be.a('object');
            response.body.data.should.have.property('accountNumber');
            const { accountNumber } = response.body.data;
            const staff = {
              email: 'yoshiyama@gmail.com',
              password: 'password',
            };
            const accStatus = {
              status: 'active',
            };
            chai.request(app)
              .post(signInUrl)
              .send(staff)
              .end((errStaff, resStaff) => {
                // console.log(res.body);
                resStaff.body.should.have.status(201);
                resStaff.body.should.be.a('object');
                resStaff.body.data.should.have.property('token');
                const tokenStaff = resStaff.body.data.token;
                chai.request(app)
                  .patch(`${accStatusUrl}${accountNumber}`)
                  .set('x-access-token', tokenStaff)
                  .send(accStatus)
                  .end((errorStaff, responseStaff) => {
                    responseStaff.body.should.have.status(401);
                    responseStaff.body.should.be.a('object');
                    responseStaff.body.error.should.equal('Unauthorized user');
                    done();
                  });
              });
          });
      });
  });

  it('should not change account status if account is not found', (done) => {
    const staff = {
      email: 'nerocodes@gmail.com',
      password: 'password',
    };
    const accStatus = {
      status: 'active',
    };
    chai.request(app)
      .post(signInUrl)
      .send(staff)
      .end((errStaff, resStaff) => {
        // console.log(res.body);
        resStaff.body.should.have.status(201);
        resStaff.body.should.be.a('object');
        resStaff.body.data.should.have.property('token');
        const tokenStaff = resStaff.body.data.token;
        chai.request(app)
          .patch(`${accStatusUrl}123456`)
          .set('x-access-token', tokenStaff)
          .send(accStatus)
          .end((errorStaff, responseStaff) => {
            responseStaff.body.should.have.status(404);
            responseStaff.body.should.be.a('object');
            responseStaff.body.error.should.equal('No account found');
            done();
          });
      });
  });
});

// Test for Admin/Staff delete account
describe('Testing admin or staff deleting account', () => {
  const createAccUrl = '/api/v1/accounts';
  const delAccUrl = '/api/v1/accounts/';
  const signUpUrl = '/api/v1/auth/signup';
  const signInUrl = '/api/v1/auth/signin';
  it('should delete account if all parameters are given', (done) => {
    const user = {
      firstName: 'Yoshi',
      lastName: 'Yama',
      email: 'yoshiyama@gmail.com',
      password: 'password',
    };
    const accType = {
      type: 'savings',
    };
    chai.request(app)
      .post(signUpUrl)
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        const { token } = res.body.data;
        chai.request(app)
          .post(createAccUrl)
          .set('x-access-token', token)
          .send(accType)
          .end((error, response) => {
            response.body.should.have.status(201);
            response.body.should.be.a('object');
            response.body.data.should.have.property('accountNumber');
            const { accountNumber } = response.body.data;
            const staff = {
              email: 'nerocodes@gmail.com',
              password: 'password',
            };
            chai.request(app)
              .post(signInUrl)
              .send(staff)
              .end((errStaff, resStaff) => {
                // console.log(res.body);
                resStaff.body.should.have.status(201);
                resStaff.body.should.be.a('object');
                resStaff.body.data.should.have.property('token');
                const tokenStaff = resStaff.body.data.token;
                chai.request(app)
                  .delete(`${delAccUrl}${accountNumber}`)
                  .set('x-access-token', tokenStaff)
                  .end((errorStaff, responseStaff) => {
                    responseStaff.body.should.have.status(200);
                    responseStaff.body.should.be.a('object');
                    responseStaff.body.message.should.equal('Account successfully deleted');
                    done();
                  });
              });
          });
      });
  });

  it('should not delete account if user is not staff', (done) => {
    const user = {
      firstName: 'Yoshi',
      lastName: 'Yama',
      email: 'yoshiyama@gmail.com',
      password: 'password',
    };
    const accType = {
      type: 'savings',
    };
    chai.request(app)
      .post(signUpUrl)
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        const { token } = res.body.data;
        chai.request(app)
          .post(createAccUrl)
          .set('x-access-token', token)
          .send(accType)
          .end((error, response) => {
            response.body.should.have.status(201);
            response.body.should.be.a('object');
            response.body.data.should.have.property('accountNumber');
            const { accountNumber } = response.body.data;
            const staff = {
              email: 'yoshiyama@gmail.com',
              password: 'password',
            };
            chai.request(app)
              .post(signInUrl)
              .send(staff)
              .end((errStaff, resStaff) => {
                // console.log(res.body);
                resStaff.body.should.have.status(201);
                resStaff.body.should.be.a('object');
                resStaff.body.data.should.have.property('token');
                const tokenStaff = resStaff.body.data.token;
                chai.request(app)
                  .delete(`${delAccUrl}${accountNumber}`)
                  .set('x-access-token', tokenStaff)
                  .end((errorStaff, responseStaff) => {
                    responseStaff.body.should.have.status(401);
                    responseStaff.body.should.be.a('object');
                    responseStaff.body.error.should.equal('Unauthorized user');
                    done();
                  });
              });
          });
      });
  });

  it('should not delete account if account does not exist', (done) => {
    const staff = {
      email: 'nerocodes@gmail.com',
      password: 'password',
    };
    const accStatus = {
      status: 'active',
    };
    chai.request(app)
      .post(signInUrl)
      .send(staff)
      .end((errStaff, resStaff) => {
        // console.log(res.body);
        resStaff.body.should.have.status(201);
        resStaff.body.should.be.a('object');
        resStaff.body.data.should.have.property('token');
        const tokenStaff = resStaff.body.data.token;
        chai.request(app)
          .patch(`${delAccUrl}123456`)
          .set('x-access-token', tokenStaff)
          .send(accStatus)
          .end((errorStaff, responseStaff) => {
            responseStaff.body.should.have.status(404);
            responseStaff.body.should.be.a('object');
            responseStaff.body.error.should.equal('No account found');
            done();
          });
      });
  });
});

// Test for getting all bank accounts
describe('Testing fetch all bank accounts', () => {
  const signInUrl = '/api/v1/auth/signin';
  const fetchAccUrl = '/api/v1/accounts';
  it('should fetch all bank accounts', (done) => {
    const user = {
      email: 'nerocodes@gmail.com',
      password: 'password',
    };
    chai.request(app)
      .post(signInUrl)
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        const { token } = res.body.data;
        chai.request(app)
          .get(fetchAccUrl)
          .set('x-access-token', token)
          .end((error, response) => {
            response.body.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('data');
            done();
          });
      });
  });

  it('should not fetch accounts if user is not staff', (done) => {
    const user = {
      email: 'yoshiyama@gmail.com',
      password: 'password',
    };
    chai.request(app)
      .post(signInUrl)
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        const { token } = res.body.data;
        chai.request(app)
          .get(fetchAccUrl)
          .set('x-access-token', token)
          .end((error, response) => {
            response.body.should.have.status(401);
            response.body.should.be.a('object');
            response.body.error.should.equal('Unauthorized user');
            done();
          });
      });
  });
});
