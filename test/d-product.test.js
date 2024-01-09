const chai = require('chai');
const request = require('supertest');
const app = require('../app');
const User = require('../model/userModel');

const chaiExclude = require('chai-exclude');
const { productPostResponse, updatedProductResponse } = require('./data');
const { getBearerToken } = require('./c-tokenManager');

const { expect } = chai;

chai.use(chaiExclude);

describe('products tests', async () => {
  let response;
  let BearerToken;
  let id;

  describe('product post and review', () => {
    it('should post the product', async () => {
      BearerToken = getBearerToken();

      const requestBody = {
        category: 'western',
        name: 'loose slives',
        description: 'a very comfertable loose slives western cloth',
        price: 4000,
        discountPrice: 200,
        size: ['M', 'XL', 'L'],
        stock: '100',
        ratingsAverage: '4.8',
        ratingsQuantity: '10',
        hashtags: ['#women', '#skirt'],
      };

      response = await request(app)
        .post('/api/v1/products/productPost')
        .send(requestBody)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(200);

      id = response.body.data._id;

      expect(response.body)
        .excludingEvery(['createdAt', '_id', '__v'])
        .to.deep.equal(productPostResponse);
    });

    it('should review the product', async () => {
      response = await request(app)
        .get('/api/v1/products/productReview')
        .expect(200);

      expect(response.body.data[0])
        .excludingEvery(['createdAt', '_id', '__v'])
        .to.deep.equal(productPostResponse.data);
    });
  });

  describe('product update', () => {
    it('should update the product', async () => {
      const requestBody = {
        category: 'western',
        name: 'loose',
        description: 'okk',
        price: '2000',
        discountPrice: '200',
        size: ['M', 'XL', 'L'],
        stock: '40',
        hashtags: ['#women'],
      };

      response = await request(app)
        .patch(`/api/v1/products/productUpdate?id=${id}`)
        .set('Authorization', `Bearer ${BearerToken}`)
        .send(requestBody);

      expect(response.body)
        .excludingEvery(['createdAt', '_id', '__v'])
        .to.deep.equal(updatedProductResponse);
    });
  });
});
