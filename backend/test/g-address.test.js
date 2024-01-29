const chai = require('chai');
const request = require('supertest');
const app = require('../app');
const chaiExclude = require('chai-exclude');
const { getBearerToken } = require('./c-tokenManager');
const {
  addressPostResponse,
  getAddressesResponse,
  updatedAddressResponse,
} = require('./z-data');
const { expect } = chai;
chai.use(chaiExclude);

describe('address entering', () => {
  let response;
  let addressId;
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

      addressId = response.body.data._id;

      expect(response.body)
        .excludingEvery(['user', '_id', '__v'])
        .to.deep.equal(addressPostResponse);
    });
  });

  describe('get address', () => {
    it('should get the total addresses', async () => {
      response = await request(app)
        .get('/api/v1/address/getUserAddress')
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(200);

      expect(response.body)
        .excludingEvery(['user', '_id', '__v'])
        .to.deep.equal(getAddressesResponse);
    });

    it('should get one address', async () => {
      response = await request(app)
        .get(`/api/v1/address/getOneAddress?id=${addressId}`)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(200);

      expect(response.body)
        .excludingEvery(['user', '_id', '__v'])
        .to.deep.equal(addressPostResponse);
    });

    it('should not get one address', async () => {
      const addressId = '123412341234123412341234';

      response = await request(app)
        .get(`/api/v1/address/getOneAddress?id=${addressId}`)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(404);

      expect(response.body.message).to.be.equal('no address found!');
    });
  });

  describe('update address', () => {
    it('should update the address', async () => {
      const requestBody = {
        fullName: 'khushalkumar ahir is my name',
        area: 'ram sita',
        saveAs: 'office',
      };

      response = await request(app)
        .patch(`/api/v1/address/updateAddress?id=${addressId}`)
        .send(requestBody)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(200);

      expect(response.body)
        .excludingEvery(['user', '_id', '__v'])
        .to.deep.equal(updatedAddressResponse);
    });

    it('should not update the address', async () => {
      const addressId = '123412341234123412341234';
      const requestBody = {
        fullName: 'khushalkumar ahir is my name',
        area: 'ram sita',
        saveAs: 'office',
      };

      response = await request(app)
        .patch(`/api/v1/address/updateAddress?id=${addressId}`)
        .send(requestBody)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(404);

      expect(response.body.message).to.be.equal('no data found');
    });
  });

  describe('delete address', () => {
    it('should not delete the user', async () => {
      const addressId = '123412341234123412341234';

      response = await request(app)
        .delete(`/api/v1/address/deleteAddress?id=${addressId}`)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(404);

      expect(response.body.message).to.be.equal('address not found');
    });

    it('should delete the user', async () => {
      response = await request(app)
        .delete(`/api/v1/address/deleteAddress?id=${addressId}`)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(200);

      expect(response.body.message).to.be.equal('address deleted successfully');
    });

    it('should not get the total addresses', async () => {
      response = await request(app)
        .get('/api/v1/address/getUserAddress')
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(404);

      expect(response.body.message).to.be.equal(
        "Looks like you haven't provided any addresses. Add a new address to get started."
      );
    });
  });
});
