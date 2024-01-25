const chai = require('chai');
const request = require('supertest');
const app = require('../app');
const chaiExclude = require('chai-exclude');
const { getBearerToken } = require('./c-tokenManager');
const { addressPostResponse } = require('./z-data');
const { expect } = chai;
chai.use(chaiExclude);

describe('address entering', () => {
  let response;
  let BearerToken;

  describe('post address', () => {
    it('should post the address', async () => {
      BearerToken = getBearerToken();
      const requestBody = {
        fullName: 'khushal ahir dineshbhai',
        mobileNumber: '9979503660',
        pinCode: 395004,
        city: 'surat',
        state: 'gujarat',
        streetAddress: 'abc street',
        area: 'ram path',
        saveAs: 'home',
      };

      response = await request(app)
        .post('/api/v1/address/AddressPost')
        .send(requestBody)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(201);
      expect(response.body)
        .excludingEvery(['user', '_id', '__v'])
        .to.deep.equal(addressPostResponse);
    });
  });
});
