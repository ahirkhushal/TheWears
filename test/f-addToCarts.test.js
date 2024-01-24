const chai = require('chai');
const request = require('supertest');
const app = require('../app');
const chaiExclude = require('chai-exclude');
const { getProductId, getBearerToken } = require('./c-tokenManager');
const { addToCartPostResponse, getAddToCartResponse } = require('./z-data');
const { expect } = chai;
chai.use(chaiExclude);

describe('add to cart tests', () => {
  let response;
  let BearerToken;
  let productId;

  describe('add items to the cart', () => {
    it('should add the item to the cart', async () => {
      productId = getProductId();
      BearerToken = getBearerToken();
      let requestBody = { selectSize: 'X' };

      response = await request(app)
        .post(`/api/v1/cart/addToCart?productId=${productId}`)
        .send(requestBody)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(200);

      expect(response.body)
        .excludingEvery(['user', 'product', '_id', '__v'])
        .to.deep.equal(addToCartPostResponse);
    });

    it('should not add the item to the cart', async () => {
      let productId = '123412341234123412341234';

      BearerToken = getBearerToken();
      let requestBody = { selectSize: 'L' };

      response = await request(app)
        .post(`/api/v1/cart/addToCart?productId=${productId}`)
        .send(requestBody)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(400);

      expect(response.body.message).to.be.equal('invalid productId');
    });
  });

  describe('get the items which added in cart', () => {
    it('should get items data which added in cart', async () => {
      response = await request(app)
        .get('/api/v1/cart/getCartDetail')
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(200);

      expect(response.body)
        .excludingEvery(['user', 'product', '_id', '__v'])
        .to.deep.equal(getAddToCartResponse);
    });

    // it('should not get items data which added in cart', async () => {
    //   response = await request(app)
    //     .get('/api/v1/cart/getCartDetail')
    //     .set('Authorization', `Bearer ${BearerToken}`)
    //     .expect(200);

    //   expect(response.body)
    //     .excludingEvery(['user', 'product', '_id', '__v'])
    //     .to.deep.equal(getAddToCartResponse);
    // });
  });
});
