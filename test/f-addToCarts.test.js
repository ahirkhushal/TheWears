const chai = require('chai');
const request = require('supertest');
const app = require('../app');
const chaiExclude = require('chai-exclude');
const { getProductId, getBearerToken } = require('./c-tokenManager');
const {
  addToCartPostResponse,
  getAddToCartResponse,
  updatedCartItem,
} = require('./z-data');
const { expect } = chai;
chai.use(chaiExclude);

describe('add to cart tests', () => {
  let response;
  let BearerToken;
  let productId;
  let cartItemId;

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

      cartItemId = response.body.data._id;

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

  describe('get the items from cart', () => {
    it('should get items data which added in cart', async () => {
      response = await request(app)
        .get('/api/v1/cart/getCartDetail')
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(200);

      expect(response.body)
        .excludingEvery(['user', 'product', '_id', '__v'])
        .to.deep.equal(getAddToCartResponse);
    });
  });

  describe('update the item', () => {
    it('should update the items which added in cart', async () => {
      const requestBody = { quantity: 5, selectSize: 'L' };

      response = await request(app)
        .patch(`/api/v1/cart/updateCartItems?id=${cartItemId}`)
        .send(requestBody)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(200);

      expect(response.body)
        .excludingEvery(['user', 'product', '_id', '__v'])
        .to.deep.equal(updatedCartItem);
    });

    it('should not update the items which added in cart', async () => {
      const cartItemId = '123412341234123412341234';
      const requestBody = { quantity: 5, selectSize: 'L' };

      response = await request(app)
        .patch(`/api/v1/cart/updateCartItems?id=${cartItemId}`)
        .send(requestBody)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(404);

      expect(response.body.message).to.be.equal('Product not found');
    });
  });

  describe('remove item from cart', () => {
    it('should not remove the item from cart', async () => {
      const cartItemId = '123412341234123412341234';

      response = await request(app)
        .delete(`/api/v1/cart/removeCartItem?id=${cartItemId}`)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(404);

      expect(response.body.message).to.be.equal('data not found');
    });

    it('should remove the item from cart', async () => {
      response = await request(app)
        .delete(`/api/v1/cart/removeCartItem?id=${cartItemId}`)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(200);

      expect(response.body.message).to.be.equal('product removed');
    });

    it('should not get the data which added in cart', async () => {
      response = await request(app)
        .get('/api/v1/cart/getCartDetail')
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(404);

      expect(response.body.message).to.be.equal(
        'Empty cart! Start shopping now'
      );
    });
  });
});
