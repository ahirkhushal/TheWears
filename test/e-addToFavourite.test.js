const chai = require('chai');
const request = require('supertest');
const app = require('../app');
const chaiExclude = require('chai-exclude');
const { getProductId, getBearerToken } = require('./c-tokenManager');
const { expect } = chai;
chai.use(chaiExclude);

describe('add to favourites tests', () => {
  let BearerToken;
  let productId;
  let response;

  describe('add to favourites', () => {
    it('should add the items to the favourites', async () => {
      productId = getProductId();
      BearerToken = getBearerToken();
      let requestBody = { productId };

      response = await request(app)
        .post('/api/v1/favourites/addtofavourite')
        .send(requestBody)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(200);

      expect(response.body.message).to.be.equal(
        'product successfully added to favourite list'
      );
    });

    it('should not add the items to the favourites', async () => {
      BearerToken = getBearerToken();
      let requestBody = {
        productId: '585123787878787544957488',
      };

      response = await request(app)
        .post('/api/v1/favourites/addtofavourite')
        .send(requestBody)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(400);

      expect(response.body.message).to.be.equal('invalid productId');
    });
  });

  describe('get favourited items', () => {
    it('should get all favourited item', async () => {
      response = await request(app)
        .get('/api/v1/favourites/getFavouriteItems')
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(200);

      expect(response.body.status).to.be.equal('success');
    });
  });

  describe('remove the item from favourite list', () => {
    it('should not remove the items from favourites', async () => {
      let requestBody = { productId: '123123123123123123124514' };

      response = await request(app)
        .delete('/api/v1/favourites/removeFavourites')
        .send(requestBody)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(404);

      expect(response.body.message).to.be.equal('No favourite item found');
    });

    it('should remove the items from favourites', async () => {
      let requestBody = { productId };

      response = await request(app)
        .delete('/api/v1/favourites/removeFavourites')
        .send(requestBody)
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(200);

      expect(response.body.message).to.be.equal(
        'item successfully removed from your Favourite List'
      );
    });

    it('should not get all favourited item and try to get items', async () => {
      response = await request(app)
        .get('/api/v1/favourites/getFavouriteItems')
        .set('Authorization', `Bearer ${BearerToken}`)
        .expect(404);

      expect(response.body.message).to.be.equal(
        "Zero favorites? Let's change that!"
      );
    });
  });
});
