const chai = require('chai');
const request = require('supertest');
const app = require('../app');
const User = require('../model/userModel');
const { setUpDb } = require('./fixtures/db');
const chaiExclude = require('chai-exclude');
const {
  registrationResponseData,
  verificationEmailResponse,
  loginErrorResponse,
} = require('./data');

const { expect } = chai;

chai.use(chaiExclude);

describe('Authentication', () => {
  let verificationToken;
  let userId;
  let response;

  before(async () => {
    await setUpDb();
  });

  describe('User Registration And Verification', () => {
    it('should validate email and send verification email', async () => {
      const requestBody = { email: 'test@gmail.com' };

      response = await request(app)
        .post('/api/v1/users/signup')
        .send(requestBody)
        .expect(200);

      verificationToken = response.body.link.split('/').pop();

      expect(response.body)
        .excluding('link')
        .to.deep.equal(verificationEmailResponse);
    });

    it('should verify email successfully', async () => {
      response = await request(app)
        .post(`/api/v1/users/verificationEmail/${verificationToken}`)
        .expect(200);

      userId = response.body.userData._id;
      expect(response.body.data).to.equal('verification complete');
    });

    it('should verify email failed', async () => {
      const invalidToken = '123';
      response = await request(app)
        .post(`/api/v1/users/verificationEmail/${invalidToken}`)
        .expect(400);

      expect(response.body.message).to.equal(
        'user is not exist or token has expired'
      );
    });

    it('should create a user', async () => {
      const requestBody = {
        username: 'khushal',
        password: '123456456',
        confirmPassword: '123456456',
      };

      response = await request(app)
        .post(`/api/v1/users/signupdetails/${userId}`)
        .send(requestBody)
        .expect(200);

      expect(response.body)
        .excludingEvery(['_id', 'password', 'createdAt', 'token'])
        .to.deep.equal(registrationResponseData);
    });
  });

  describe('User Login', () => {
    it('should login the user', async () => {
      const requestBody = { email: 'test@gmail.com', password: '123456456' };
      response = await request(app)
        .post('/api/v1/users/login')
        .send(requestBody)
        .expect(200);
      expect(response.body)
        .excludingEvery(['_id', 'password', 'createdAt', 'token'])
        .to.deep.equal(registrationResponseData);
    });
    it('should not login the user', async () => {
      const requestBody = { email: 'test1@gmail.com', password: '1234564562' };
      response = await request(app)
        .post('/api/v1/users/login')
        .send(requestBody)
        .expect(400);
      expect(response.body)
        .excluding('stack')
        .to.deep.equal(loginErrorResponse);
    });
  });

  after(async () => {
    await User.deleteMany();
    process.exit(0);
  });
});