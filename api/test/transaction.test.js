import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

// Test for credit transactions
describe('Testing credit transaction', () => {
  const signUpUrl = '/api/v1/auth/signup';
  const signInUrl = '/api/v1/auth/signin';
  const createAccUrl = '/api/v1/accounts';
  const transactionUrl = '/api/v1/transactions/';
  it('should credit account if all parameters are given', (done) => {
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
            const amount = {
              amount: 80000,
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
                  .post(`${transactionUrl}${accountNumber}/credit`)
                  .set('x-access-token', tokenStaff)
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
                    done();
                  });
              });
          });
      });
  });

  it('should not credit account if user is not cashier', (done) => {
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
            const amount = {
              amount: 80000,
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
                  .post(`${transactionUrl}${accountNumber}/credit`)
                  .set('x-access-token', tokenStaff)
                  .send(amount)
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

  it('should not credit account if account number does not exist', (done) => {
    const staff = {
      email: 'nerocodes@gmail.com',
      password: 'password',
    };
    const amount = {
      amount: 80000,
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
          .post(`${transactionUrl}123456/credit`)
          .set('x-access-token', tokenStaff)
          .send(amount)
          .end((errorStaff, responseStaff) => {
            responseStaff.body.should.have.status(404);
            responseStaff.body.should.be.a('object');
            responseStaff.body.error.should.equal('Account number does not match our records');
            done();
          });
      });
  });
});

// Test for debit transactions
describe('Testing debit transaction', () => {
  const signUpUrl = '/api/v1/auth/signup';
  const signInUrl = '/api/v1/auth/signin';
  const createAccUrl = '/api/v1/accounts';
  const transactionUrl = '/api/v1/transactions/';
  it('should debit account if all parameters are given', (done) => {
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
            const amount = {
              amount: 120000,
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
                  .post(`${transactionUrl}${accountNumber}/credit`)
                  .set('x-access-token', tokenStaff)
                  .send(amount)
                  .end((errorStaff, responseStaff) => {
                    responseStaff.body.should.have.status(200);
                    const debitAmount = {
                      amount: 40000,
                    };
                    chai.request(app)
                      .post(`${transactionUrl}${accountNumber}/debit`)
                      .set('x-access-token', tokenStaff)
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
                        done();
                      });
                  });
              });
          });
      });
  });

  it('should not debit account if user is not cashier', (done) => {
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
            const amount = {
              amount: 80000,
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
                  .post(`${transactionUrl}${accountNumber}/debit`)
                  .set('x-access-token', tokenStaff)
                  .send(amount)
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

  it('should not debit account if account number does not exist', (done) => {
    const staff = {
      email: 'nerocodes@gmail.com',
      password: 'password',
    };
    const amount = {
      amount: 80000,
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
          .post(`${transactionUrl}123456/debit`)
          .set('x-access-token', tokenStaff)
          .send(amount)
          .end((errorStaff, responseStaff) => {
            console.log(responseStaff.body);
            responseStaff.body.should.have.status(404);
            responseStaff.body.should.be.a('object');
            responseStaff.body.error.should.equal('Account number does not match our records');
            done();
          });
      });
  });

  it('should not debit account if account balance is not enough', (done) => {
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
            const amount = {
              amount: 80000,
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
                  .post(`${transactionUrl}${accountNumber}/debit`)
                  .set('x-access-token', tokenStaff)
                  .send(amount)
                  .end((errorStaff, responseStaff) => {
                    responseStaff.body.should.have.status(400);
                    responseStaff.body.should.be.a('object');
                    responseStaff.body.error.should.equal('Transaction declined: Insufficient funds');
                    done();
                  });
              });
          });
      });
  });
});
