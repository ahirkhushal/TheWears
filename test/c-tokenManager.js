let bearerToken;

const setBearerToken = (token) => (bearerToken = token);
const getBearerToken = () => bearerToken;

module.exports = { setBearerToken, getBearerToken };
