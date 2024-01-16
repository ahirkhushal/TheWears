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

module.exports = {
  verificationEmailResponse,
  registrationResponseData,
  productPostResponse,
  updatedProductResponse,
};
