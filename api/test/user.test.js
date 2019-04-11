import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

// Test user sign up
describe('Testing user signup', () => {
  const signUpUrl = '/api/v1/auth/signup';
  it('it should register new user when all required fields are given', (done) => {
    const user = {
      firstName: 'Oghenero',
      lastName: 'Paul-Ejukorlem',
      email: 'neropaulej@gmail.com',
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

  it('it should not register new user when first name field is missing', (done) => {
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
        res.body.error.name.should.equal('ValidationError');
        res.body.error.should.have.property('details');
        done();
      });
  });

  it('it should not register new user when last name field is missing', (done) => {
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
        res.body.error.name.should.equal('ValidationError');
        res.body.error.should.have.property('details');
        done();
      });
  });

  it('it should not register new user when email field is missing', (done) => {
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
        res.body.error.name.should.equal('ValidationError');
        res.body.error.should.have.property('details');
        done();
      });
  });

  it('it should not register new user when password field is missing', (done) => {
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
        res.body.error.name.should.equal('ValidationError');
        res.body.error.should.have.property('details');
        done();
      });
  });
});
