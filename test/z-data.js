const verificationEmailResponse = {
  status: 'success',
  data: 'varification email send to your email',
  link: 'http://localhost:2405/api/v1/users/verificationEmail/verificationToken',
};

const registrationResponseData = {
  status: 'success',
  data: {
    _id: '6575938680c8ac40d7a09223',
    email: 'test@gmail.com',
    role: 'admin',
    photo: 'default.jpg',
    isVarified: true,
    EmailisVarified: true,
    __v: 0,
    username: 'khushal',
    password: '$2b$12$CALHQOukDpKh9JqXiVPfMOk3xJFkzJPtGlYThh9kcWoOSw9/cH2PW',
    createdAt: 'December 10th 2023, 4:01:34 pm',
  },
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzU5Mzg2ODBjOGFjNDBkN2EwOTIyMyIsImlhdCI6MTcwMjIwNDI5NSwiZXhwIjoxNzA5OTgwMjk1fQ.KABAVOmKVdgmWZbo2VilN-ElWOHBA9aMLMfr9kZMHdA',
};

const productPostResponse = {
  status: 'success',
  data: {
    category: 'western',
    name: 'loose slives',
    description: 'a very comfertable loose slives western cloth',
    price: 4000,
    discountPrice: 200,
    size: ['M', 'XL', 'L'],
    stock: 100,
    ratingsAverage: 4.8,
    ratingsQuantity: 10,
    images: [
      'mock-image-1.jpg',
      'mock-image-2.jpg',
      'mock-image-3.jpg',
      'mock-image-4.jpg',
      'mock-image-5.jpg',
      'mock-image-6.jpg',
    ],
    hashtags: ['#women', '#skirt'],
    createdAt: 'January 7th 2024, 6:29:49 pm',
    _id: '659aa0451a18a9b85fa99661',
    slug: 'loose-slives',
    __v: 0,
    id: '659aa0451a18a9b85fa99661',
  },
};

const updatedProductResponse = {
  status: 'success',
  data: {
    _id: '659c444591ea18e17a2a8f49',
    category: 'western',
    name: 'loose',
    description: 'okk',
    price: 2000,
    discountPrice: 200,
    size: ['M', 'XL', 'L'],
    stock: 40,
    ratingsAverage: 4.8,
    ratingsQuantity: 10,
    images: [
      'mock-image-1.jpg',
      'mock-image-2.jpg',
      'mock-image-3.jpg',
      'mock-image-4.jpg',
      'mock-image-5.jpg',
      'mock-image-6.jpg',
    ],
    hashtags: ['#women'],
    createdAt: 'January 9th 2024, 12:21:49 am',
    slug: 'loose',
    __v: 1,
    id: '659c444591ea18e17a2a8f49',
  },
};

const addToCartPostResponse = {
  status: 'success',
  data: {
    user: '6599db2d3299b5840c4f3fa2',
    product: {
      _id: '65b11f0ce3a2ee1044542445',
      price: 20000,
      id: '65b11f0ce3a2ee1044542445',
    },
    selectSize: 'X',
    quantity: 1,
    price: 20000,
    _id: '65b153dbbb6f061cc847066d',
    __v: 0,
  },
  message: 'item successfully added to cart',
};

const getAddToCartResponse = {
  status: 'success',
  data: [
    {
      _id: '65b153dbbb6f061cc847066d',
      user: {
        _id: '6599db2d3299b5840c4f3fa2',
        username: 'khushal',
      },
      product: {
        _id: '65b11f0ce3a2ee1044542445',
        category: 'SKIRT',
        name: 'top skirt',
        description: 'this is skirt',
        price: 20000,
        discountPrice: 10,
        size: ["['M', 'XL', 'L']"],
        stock: 100,
        ratingsAverage: 4.8,
        ratingsQuantity: 10,
        images: [
          'product-WhatsApp Image 2023-05-15 at 20-1706106636840.jpeg',
          'product-WhatsApp Image 2023-12-26 at 23-1706106636847.jpeg',
        ],
        hashtags: ["['#women' , '#skirt']"],
        createdAt: 'January 24th 2024, 8:00:36 pm',
        slug: 'top-skirt',
        __v: 0,
        id: '65b11f0ce3a2ee1044542445',
      },
      selectSize: 'X',
      quantity: 1,
      price: 20000,
      __v: 0,
    },
  ],
};

const updatedCartItem = {
  status: 'success',
  data: {
    _id: '65b2a460ea58a1db2065d55e',
    user: { _id: '65b2a45cea58a1db2065d51d', username: 'khushal' },
    product: {
      _id: '65b2a45bea58a1db2065d519',
      price: 20000,
      id: '65b2a45bea58a1db2065d519',
    },
    selectSize: 'L',
    quantity: 5,
    price: 100000,
    __v: 0,
  },
};

const addressPostResponse = {
  status: 'success',
  data: {
    user: '65b2ac2184815993d7dbaa04',
    fullName: 'khushal ahir dineshbhai',
    mobileNumber: '9979503660',
    pinCode: 395004,
    city: 'surat',
    state: 'gujarat',
    streetAddress: 'abc street',
    area: 'ram path',
    saveAs: 'HOME',
    _id: '65b2ac2984815993d7dbaa5f',
    __v: 0,
  },
};

module.exports = {
  verificationEmailResponse,
  registrationResponseData,
  productPostResponse,
  updatedProductResponse,
  addToCartPostResponse,
  getAddToCartResponse,
  updatedCartItem,
  addressPostResponse,
};
