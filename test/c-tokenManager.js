let bearerToken;
let productId;

const setBearerToken = (token) => (bearerToken = token);
const getBearerToken = () => bearerToken;

const setProductId = (id) => (productId = id);
const getProductId = () => productId;

module.exports = { setBearerToken, getBearerToken, setProductId, getProductId };
