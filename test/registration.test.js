const chai = require('chai');
const request = require('supertest');
const app = require('../app');
const User = require('../model/userModel');
const { setUpDb } = require('./fixtures/db');
const chaiExclude = require('chai-exclude');
const {
  registrationResponseData,
  verificationEmailResponse,
} = require('./data');

const { expect } = chai;

chai.use(chaiExclude);

describe('Authentication', () => {
  let bearerToken;
  let verificationToken;
  let userId;
  let response;

  before(async () => await setUpDb());

  describe('User Registration And Verification', () => {
    it('should validate email and send verification email', async () => {
      const requestBody = { email: 'test@gmail.com' };

      response = await request(app)
        .post('/api/v1/users/signup')
        .send(requestBody)
        .expect(200);

      verificationToken = response.body.link.split('=').pop();
      expect(response.body)
        .excluding('link')
        .to.deep.equal(verificationEmailResponse);
    });

    it('should verify email successfully', async () => {
      response = await request(app)
        .post(`/api/v1/users/verificationEmail?token=${verificationToken}`)
        .expect(200);

      userId = response.body.userData._id;
      expect(response.body.data).to.equal('verification complete');
    });

    it('should verify email failed', async () => {
      const invalidToken = '123';

      response = await request(app)
        .post(`/api/v1/users/verificationEmail?token=${invalidToken}`)
        .expect(400);

      expect(response.body.message).to.equal(
        'user is not exist or token has expired'
      );
      expect(response.body.status).to.equal('fail');
    });

    it('should not create a user', async () => {
      const requestBody = {
        username: 'khushal',
        password: '123456456',
        confirmPassword: '123456',
      };

      response = await request(app)
        .post(`/api/v1/users/signupdetails/${userId}`)
        .send(requestBody)
        .expect(500);

      expect(response.body.message).to.equal(
        'User validation failed: confirmPassword: confirm password is not same as password'
      );
      expect(response.body.status).to.equal('error');
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
        .expect(201);

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

      bearerToken = response.body.token;
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
      expect(response.body.message).to.equal('email or password is wrong');
      expect(response.body.status).to.equal('fail');
    });
  });

  describe('forgot and reset Passwrod', () => {
    let response;
    let verifyToken;
    const requestBody = {
      password: '123123123',
      confirmPassword: '123123123',
    };

    it('should send a resetPassword link', async () => {
      const requestBody = { email: 'test@gmail.com' };

      response = await request(app)
        .post('/api/v1/users/forgotPassword')
        .send(requestBody)
        .expect(200);

      verifyToken = response.body.resetToken;

      expect(response.body.message).to.equal(
        'forgotPassword mail send to you email address'
      );
    });

    it('should fail to send resetPassword link', async () => {
      const requestBody = { email: 'khushal@gmail.com' };

      response = await request(app)
        .post('/api/v1/users/forgotPassword')
        .send(requestBody)
        .expect(400);

      expect(response.body.message).to.equal('this email does not exist');
      expect(response.body.status).to.equal('fail');
    });

    it('should not reset the password', async () => {
      let verifyToken = 123;

      response = await request(app)
        .patch(`/api/v1/users/resetPassword?token=${verifyToken}`)
        .send(requestBody)
        .expect(400);

      expect(response.body.message).to.equal(
        'user is not exist or token has expired'
      );
      expect(response.body.status).to.equal('fail');
    });

    it('should reset the password', async () => {
      response = await request(app)
        .patch(`/api/v1/users/resetPassword?token=${verifyToken}`)
        .send(requestBody)
        .expect(200);

      expect(response.body)
        .excludingEvery(['_id', 'password', 'createdAt', 'token'])
        .to.deep.equal(registrationResponseData);
    });

    it('should update the password', async () => {
      const requestBody = {
        currentPassword: '123123123',
        newPassword: '1231454545',
        confirmPassword: '1231454545',
      };

      response = await request(app)
        .patch('/api/v1/users/updatePassword')
        .set('Authorization', `Bearer ${bearerToken}`)
        .send(requestBody)
        .expect(200);

      expect(response.body)
        .excludingEvery(['_id', 'password', 'createdAt', 'token'])
        .to.deep.equal(registrationResponseData);
    });

    it('should not update the password', async () => {
      const requestBody = {
        currentPassword: '123123111',
        newPassword: '1231454545',
        confirmPassword: '1231454545',
      };

      response = await request(app)
        .patch('/api/v1/users/updatePassword')
        .set('Authorization', `Bearer ${bearerToken}`)
        .send(requestBody)
        .expect(400);

      expect(response.body.message).to.equal(
        'current password is incorreect! please try again'
      );
    });

    it('should give validation error while update password', async () => {
      const requestBody = {
        currentPassword: '1231454545',
        newPassword: '123145',
        confirmPassword: '1231454545',
      };

      response = await request(app)
        .patch('/api/v1/users/updatePassword')
        .set('Authorization', `Bearer ${bearerToken}`)
        .send(requestBody)
        .expect(500);

      expect(response.body.message).to.equal(
        'User validation failed: password: password should contain minimum 8 characters, confirmPassword: confirm password is not same as password'
      );
    });
  });

  after(async () => {
    await User.deleteMany();
    process.exit(0);
  });
});
