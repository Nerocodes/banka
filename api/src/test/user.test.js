import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';
import UserService from '../services/user.service';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

const client = {
  email: 'neropaulej@gmail.com',
  password: 'password',
};

const getClientToken = async () => {
  const clientSignIn = await UserService.signIn(client);
  const clientToken = clientSignIn.token;
  return clientToken;
};

// Test user sign up
describe('Testing user signup', () => {
  const signUpUrl = '/api/v1/auth/signup';
  it('should register new user when all required fields are given', (done) => {
    const user = {
      firstName: 'Oghenero',
      lastName: 'Paul-Ejukorlem',
      email: 'paulej@gmail.com',
      password: 'password',
    };
    chai.request(app)
      .post(signUpUrl)
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('isAdmin');
        res.body.data.should.have.property('token');
        done();
      });
  });

  it('should register new user when all fields are given', (done) => {
    const user = {
      firstName: 'Oghenero',
      lastName: 'Paul-Ejukorlem',
      email: 'paule@gmail.com',
      password: 'password',
      type: 'staff',
      isAdmin: 'true',
    };
    chai.request(app)
      .post(signUpUrl)
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('isAdmin');
        res.body.data.should.have.property('token');
        done();
      });
  });

  it('should not register new user when first name field is missing', (done) => {
    const user = {
      lastName: 'Paul-Ejukorlem',
      email: 'neropaulej@gmail.com',
      password: 'password',
    };
    chai.request(app)
      .post(signUpUrl)
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.error.should.equal('First Name is required');
        done();
      });
  });

  it('should not register new user when last name field is missing', (done) => {
    const user = {
      firstName: 'Oghenero',
      email: 'neropaulej@gmail.com',
      password: 'password',
    };
    chai.request(app)
      .post(signUpUrl)
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.be.a('object');
        res.body.error.should.equal('Last Name is required');
        done();
      });
  });

  it('should not register new user when email field is missing', (done) => {
    const user = {
      firstName: 'Oghenero',
      lastName: 'Paul-Ejukorlem',
      password: 'password',
    };
    chai.request(app)
      .post(signUpUrl)
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.be.a('object');
        res.body.error.should.equal('A valid email address is required');
        done();
      });
  });

  it('should not register new user when password field is missing', (done) => {
    const user = {
      firstName: 'Oghenero',
      lastName: 'Paul-Ejukorlem',
      email: 'neropaulej@gmail.com',
    };
    chai.request(app)
      .post(signUpUrl)
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.be.a('object');
        res.body.error.should.equal('Password is required');
        done();
      });
  });
});

// Test for user sign in
describe('Testing user signin', () => {
  const signInUrl = '/api/v1/auth/signin';
  it('should sign in a user when all required fields are given', (done) => {
    const user = {
      email: 'paulej@gmail.com',
      password: 'password',
    };
    chai.request(app)
      .post(signInUrl)
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('type');
        res.body.data.should.have.property('isAdmin');
        res.body.data.should.have.property('token');
        done();
      });
  });

  it('should not sign in user when email field is missing', (done) => {
    const user = {
      password: 'password',
    };
    chai.request(app)
      .post(signInUrl)
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.be.a('object');
        res.body.error.should.equal('A valid email address is required');
        done();
      });
  });

  it('should not sign in user when password field is missing', (done) => {
    const user = {
      email: 'nerocodes@email.com',
    };
    chai.request(app)
      .post(signInUrl)
      .send(user)
      .end((err, res) => {
        // console.log(res.body);
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.be.a('object');
        res.body.error.should.equal('Password is required');
        done();
      });
  });
});

// Test for getting user accounts
describe('Testing get user accounts', () => {
  let userUrl = '/api/v1/user/neropaulej@gmail.com/accounts';

  it('should get all accounts belonging to user', async () => {
    const token = await getClientToken();
    chai.request(app)
      .get(userUrl)
      .set('x-access-token', token)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.be.a('object');
        res.body.data[0].should.have.property('createdOn');
        res.body.data[0].should.have.property('accountNumber');
        res.body.data[0].should.have.property('type');
        res.body.data[0].should.have.property('status');
        res.body.data[0].should.have.property('balance');
      });
  });

  it('should not get all accounts if email does not exist', async () => {
    userUrl = '/api/v1/user/neropaule@gmail.com/accounts';
    const token = await getClientToken();
    chai.request(app)
      .get(userUrl)
      .set('x-access-token', token)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.data.should.be.a('object');
        res.body.error.should.equal('No user with this email');
      });
  });

  it('should not get all accounts if user does not have accounts', async () => {
    userUrl = '/api/v1/user/yoshiyama@gmail.com/accounts';
    const token = await getClientToken();
    chai.request(app)
      .get(userUrl)
      .set('x-access-token', token)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.data.should.be.a('object');
        res.body.error.should.equal('User does not have any account');
      });
  });
});
